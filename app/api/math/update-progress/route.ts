import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { students, studentProgress, achievements, studentAchievements } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

const ACHIEVEMENT_CONDITIONS = {
  SPEED_DEMON: (timeSpent: number) => timeSpent < 5,
  STREAK_MASTER: (streak: number) => streak >= 10,
  MATH_WIZARD: (correctAnswers: number) => correctAnswers >= 100,
  // Add more achievement conditions
};

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const {
    studentId,
    problemId,
    isCorrect,
    timeSpent,
    category,
    isTestMode
  } = await req.json();

  // Update student progress
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, studentId));

  const [progress] = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.studentId, studentId));

  // Calculate XP and coins
  const xpGained = calculateXP(timeSpent, isCorrect);
  const coinsGained = calculateCoins(progress.streaks);

  // Update student stats
  await db
    .update(students)
    .set({
      xp: student.xp + xpGained,
      coins: student.coins + coinsGained,
      level: Math.floor((student.xp + xpGained) / 1000) + 1
    })
    .where(eq(students.id, studentId));

  // Update progress
  const newProgress = {
    totalProblems: progress.totalProblems + 1,
    correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
    streaks: isCorrect ? progress.streaks + 1 : 0,
    categoryProgress: {
      ...progress.categoryProgress,
      [category]: {
        attempts: progress.categoryProgress[category].attempts + 1,
        success: progress.categoryProgress[category].success + (isCorrect ? 1 : 0)
      }
    }
  };

  await db
    .update(studentProgress)
    .set(newProgress)
    .where(eq(studentProgress.studentId, studentId));

  // Check for new achievements
  const newAchievements = await checkAchievements(studentId, newProgress);

  return NextResponse.json({
    success: true,
    xpGained,
    coinsGained,
    newProgress,
    newAchievements,
    testResults: isTestMode ? calculateTestResults(newProgress) : null
  });
}

async function checkAchievements(studentId: string, progress: any) {
  const unlockedAchievements = [];
  const allAchievements = await db.select().from(achievements);

  for (const achievement of allAchievements) {
    const hasAchievement = await db
      .select()
      .from(studentAchievements)
      .where(
        and(
          eq(studentAchievements.studentId, studentId),
          eq(studentAchievements.achievementId, achievement.id)
        )
      );

    if (!hasAchievement.length) {
      const condition = ACHIEVEMENT_CONDITIONS[achievement.type];
      if (condition && condition(progress[achievement.type])) {
        await db.insert(studentAchievements).values({
          studentId,
          achievementId: achievement.id,
          unlockedAt: new Date()
        });
        unlockedAchievements.push(achievement);
      }
    }
  }

  return unlockedAchievements;
} 