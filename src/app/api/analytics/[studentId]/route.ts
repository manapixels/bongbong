import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { practiceSession, mathProblems, students } from '@/lib/db/schema';
import { eq, and, gte } from 'drizzle-orm';

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

  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, params.studentId));

  const sessions = await db
    .select()
    .from(practiceSession)
    .where(
      and(
        eq(practiceSession.studentId, params.studentId),
        gte(practiceSession.startedAt, startDate)
      )
    );

  const problems = await db
    .select()
    .from(mathProblems)
    .where(
      and(
        eq(mathProblems.studentId, params.studentId),
        gte(mathProblems.attemptedAt, startDate)
      )
    );

  // Calculate performance metrics
  const performanceData = calculatePerformanceData(sessions);
  const categoryData = calculateCategoryData(problems);
  const weakAreas = findWeakAreas(problems);
  const recommendations = generateRecommendations(weakAreas);

  return NextResponse.json({
    level: student.level,
    xp: student.xp,
    xpProgress: (student.xp % 1000) / 10, // Level progress percentage
    xpNeeded: 1000 - (student.xp % 1000),
    performanceData,
    categoryData,
    weakAreas,
    recommendations
  });
}

function calculatePerformanceData(sessions: any[]) {
  // Group sessions by date and calculate average performance
  const grouped = sessions.reduce((acc, session) => {
    const date = new Date(session.startedAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        accuracy: 0,
        speed: 0,
        count: 0
      };
    }
    acc[date].accuracy += session.correctAnswers / session.totalQuestions;
    acc[date].speed += session.averageResponseTime;
    acc[date].count++;
    return acc;
  }, {});

  return Object.entries(grouped).map(([date, data]: [string, any]) => ({
    date,
    accuracy: (data.accuracy / data.count) * 100,
    speed: data.speed / data.count
  }));
} 