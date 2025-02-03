import { db } from '@/lib/db';
import { students, studentProgress, mathProblems } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getStudentProfile({ userId }: { userId: string }) {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId));
  
  return student;
}

export async function getStudentProgress({ userId }: { userId: string }) {
  const [progress] = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.studentId, userId));

  return progress;
}

export async function updateStudentProgress({
  userId,
  isCorrect,
  topicId,
  timeSpent
}: {
  userId: string;
  isCorrect: boolean;
  topicId: string;
  timeSpent: number;
}) {
  const [progress] = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.studentId, userId));

  // Update progress logic here
  const updatedProgress = {
    ...progress,
    questionsAttempted: progress.totalProblems + 1,
    correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
    categoryProgress: {
      ...progress.categoryProgress,
      [topicId]: {
        attempts: (progress.categoryProgress[topicId]?.attempts || 0) + 1,
        success: (progress.categoryProgress[topicId]?.success || 0) + (isCorrect ? 1 : 0)
      }
    }
  };

  await db
    .update(studentProgress)
    .set(updatedProgress)
    .where(eq(studentProgress.studentId, userId));

  return updatedProgress;
} 