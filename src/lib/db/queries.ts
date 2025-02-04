import { eq, and, sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { 
  user,
  students, 
  studentProgress, 
  mathProblems,
} from '@/lib/db/schema';
import type { Problem } from '@/types/math';
import { StudentProgress } from '@/types/progress';
import { Student, User } from '@/types';

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

export async function getStudentProfile(studentId: string): Promise<Student | undefined> {
  const student = await db.query.students.findFirst({
    where: eq(students.id, studentId),
  });
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
  studentId,
  problemId,
  isCorrect,
  timeSpent,
}: {
  studentId: string;
  problemId: string;
  isCorrect: boolean;
  timeSpent: number;

}) {
  return await db.insert(studentProgress).values({
    studentId,
    problemId,
    isCorrect,
    timeSpent,

  });
}

export async function generateProblem(difficulty: string, topics: string[]): Promise<Problem> {
  // Get a random problem matching the difficulty and topics
  const problem = await db
    .select()
    .from(mathProblems)
    .where(
      and(
        eq(mathProblems.difficulty, difficulty),
        sql`${mathProblems.category} = ANY(${topics})`
      )
    )
    .limit(1);

  return problem[0];
} 