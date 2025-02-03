import { db } from '@/lib/db';
import { 
  user,
  students, 
  studentProgress, 
  mathProblems,
  type User,
  type Student,
  type StudentProgress 
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getUser(email: string): Promise<User[]> {
  return db
    .select()
    .from(user)
    .where(eq(user.email, email));
}

export async function createUser(email: string, password: string): Promise<User> {
  const [newUser] = await db
    .insert(user)
    .values({ email, password })
    .returning();
  return newUser;
}

export async function getStudentProfile({ userId }: { userId: string }): Promise<Student | undefined> {
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.userId, userId));
  
  return student;
}

export async function getStudentProgress({ userId }: { userId: string }): Promise<StudentProgress | undefined> {
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
}): Promise<StudentProgress> {
  const [progress] = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.studentId, userId));

  if (!progress) {
    throw new Error('Student progress not found');
  }

  const updatedProgress = {
    ...progress,
    totalProblems: progress.totalProblems + 1,
    correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
    updatedAt: new Date()
  };

  const [result] = await db
    .update(studentProgress)
    .set({
      totalProblems: updatedProgress.totalProblems,
      correctAnswers: updatedProgress.correctAnswers,
      updatedAt: updatedProgress.updatedAt
    })
    .where(eq(studentProgress.studentId, userId))
    .returning();

  return result;
} 