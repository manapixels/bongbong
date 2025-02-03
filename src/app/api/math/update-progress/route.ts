import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { mathProblems } from '@/lib/db';
import { updateStudentProgress } from '@/lib/db/queries';
import { checkAndUnlockAchievements } from '@/lib/services/achievements';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const {
      studentId,
      topicId,
      questionId,
      isCorrect,
      timeSpent
    } = await request.json();

    // Update the problem record
    await db
      .update(mathProblems)
      .set({
        isCorrect,
        timeSpent
      })
      .where(eq(mathProblems.id, questionId));

    // Update student progress
    const updatedProgress = await updateStudentProgress({
      userId: studentId,
      isCorrect,
      topicId,
      timeSpent
    });

    // Check for achievements
    const newAchievements = await checkAndUnlockAchievements(
      studentId,
      updatedProgress
    );

    return Response.json({
      success: true,
      progress: updatedProgress,
      newAchievements
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 