import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import {
  practiceSessions,
  user,
  progress as progressTable,
  achievements,
} from '@/lib/db/schema';
import { eq, and, gte, sum } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range') || 'week';

  const startDate = new Date();
  switch (range) {
    case 'week':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'year':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
  }

  // Get student data
  const [student] = await db
    .select()
    .from(user)
    .where(eq(user.id, params.studentId));

  if (!student) {
    return new Response('Student not found', { status: 404 });
  }

  // Get practice sessions
  const sessions = await db
    .select()
    .from(practiceSessions)
    .where(
      and(
        eq(practiceSessions.userId, params.studentId),
        gte(practiceSessions.startedAt, startDate)
      )
    );

  // Get progress data
  const progress = await db
    .select()
    .from(progressTable)
    .where(
      and(
        eq(progressTable.userId, params.studentId),
        gte(progressTable.createdAt, startDate)
      )
    );

  // Calculate performance metrics
  const performanceData = calculatePerformanceData(sessions);
  const categoryData = calculateCategoryData(progress);
  const weakAreas = findWeakAreas(progress);
  const recommendations = generateRecommendations(weakAreas);

  // Calculate XP and level from achievements
  const achievementsWithRewards = await db
    .select({
      userId: achievements.userId,
      achievementId: achievements.id,
      unlockedAt: achievements.createdAt,
      rewardXP: achievements.rewardXP,
    })
    .from(achievements)
    .innerJoin(achievements, eq(achievements.userId, achievements.id))
    .where(eq(achievements.userId, params.studentId));

  const totalXP = achievementsWithRewards.reduce(
    (total, achievement) => total + (achievement.rewardXP || 0),
    0
  );
  const level = Math.floor(totalXP / 1000) + 1;
  const xpProgress = totalXP % 1000;

  return NextResponse.json({
    level,
    xp: totalXP,
    xpProgress: (xpProgress / 1000) * 100, // Level progress percentage
    xpNeeded: 1000 - xpProgress,
    performanceData,
    categoryData,
    weakAreas,
    recommendations,
  });
}

function calculatePerformanceData(
  sessions: (typeof practiceSessions.$inferSelect)[]
) {
  // Group sessions by date and calculate average performance
  const grouped = sessions.reduce(
    (acc, session) => {
      const date = new Date(session.startedAt).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          accuracy: 0,
          speed: 0,
          count: 0,
        };
      }
      acc[date].accuracy += session.correctAnswers / session.totalQuestions;
      acc[date].speed += session.averageResponseTime || 0;
      acc[date].count++;
      return acc;
    },
    {} as Record<string, { accuracy: number; speed: number; count: number }>
  );

  return Object.entries(grouped).map(([date, data]) => ({
    date,
    accuracy: (data.accuracy / data.count) * 100,
    speed: data.speed / data.count,
  }));
}

function calculateCategoryData(
  progress: (typeof progressTable.$inferSelect)[]
) {
  const categoryStats = progress.reduce(
    (acc, entry) => {
      if (!entry.subStrandProgress) return acc;

      entry.subStrandProgress.forEach((subStrand) => {
        if (!acc[subStrand.subStrand]) {
          acc[subStrand.subStrand] = {
            questionsAttempted: 0,
            correctAnswers: 0,
          };
        }
        acc[subStrand.subStrand].questionsAttempted +=
          subStrand.questionsAttempted;
        acc[subStrand.subStrand].correctAnswers += subStrand.correctAnswers;
      });
      return acc;
    },
    {} as Record<string, { questionsAttempted: number; correctAnswers: number }>
  );

  return Object.entries(categoryStats).map(([category, stats]) => ({
    category,
    accuracy: (stats.correctAnswers / stats.questionsAttempted) * 100,
    total: stats.questionsAttempted,
  }));
}

function findWeakAreas(progress: (typeof progressTable.$inferSelect)[]) {
  const categoryStats = calculateCategoryData(progress);
  return categoryStats
    .filter((stat) => stat.accuracy < 70)
    .map((stat) => stat.category);
}

function generateRecommendations(weakAreas: string[]) {
  return weakAreas.map((area) => {
    const topic = area.toLowerCase().replace(/-/g, ' ');
    return `Focus on improving your ${topic} skills with more practice questions.`;
  });
}
