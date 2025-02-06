import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { user, studentProgress } from '@/lib/db/schema';
import type { MathTopic, Problem } from '@/types/math';
import { MATH_TOPICS } from '@/types/math';
import { StudentProgress } from '@/types/progress';
import { User } from '@/types';
import { selectNextQuestion } from '@/lib/math/questionGenerators';

export async function getUser(email: string): Promise<User[]> {
  return db.select().from(user).where(eq(user.email, email));
}

export async function createUser(
  email: string,
  password: string
): Promise<User> {
  const [newUser] = await db
    .insert(user)
    .values({ email, password })
    .returning();
  return newUser;
}

export async function getStudentProfile(
  studentId: string
): Promise<User | undefined> {
  const student = await db.query.user.findFirst({
    where: eq(user.id, studentId),
  });
  return student;
}

export async function getStudentProgress({
  userId,
}: {
  userId: string;
}): Promise<StudentProgress | undefined> {
  const [progress] = await db
    .select()
    .from(studentProgress)
    .where(eq(studentProgress.userId, userId));

  return progress;
}

export async function updateStudentProgress({
  userId,
  problemId,
  isCorrect,
  timeSpent,
}: {
  userId: string;
  problemId: string;
  isCorrect: boolean;
  timeSpent: number;
}) {
  return await db.insert(studentProgress).values({
    userId,
    problemId,
    isCorrect,
    timeSpent,
  });
}

export async function generateProblem(
  difficulty: number,
  topics: string[],
  progress: StudentProgress
): Promise<Problem> {
  if (!topics || topics.length === 0) {
    throw new Error('No topics provided');
  }

  // Find the topic the student needs most practice with
  const topicStats = progress?.topicProgress || [];

  // Calculate success rates for each enabled topic
  const topicSuccessRates = topics.map((topicId) => {
    const stats = topicStats.find((p) => p.topicId === topicId);
    if (!stats) {
      return {
        topicId,
        successRate: 0, // New topics should be prioritized
        totalAttempts: 0,
      };
    }

    return {
      topicId,
      successRate:
        stats.questionsAttempted > 0
          ? stats.correctAnswers / stats.questionsAttempted
          : 0,
      totalAttempts: stats.questionsAttempted,
    };
  });

  // Sort by success rate and prioritize less attempted topics
  topicSuccessRates.sort((a, b) => {
    // If success rates are significantly different, use that
    if (Math.abs(a.successRate - b.successRate) > 0.2) {
      return a.successRate - b.successRate;
    }
    // Otherwise, prefer topics with fewer attempts
    return a.totalAttempts - b.totalAttempts;
  });

  const topic: MathTopic =
    MATH_TOPICS.find((t) => topics.includes(t.id)) || MATH_TOPICS[0];

  // Generate the question using selectNextQuestion
  const question = selectNextQuestion(progress, topic);

  // Ensure all fields are properly typed and handle potential undefined values
  return {
    id: question.id ?? crypto.randomUUID(),
    question: question.text,
    answer:
      typeof question.correctAnswer === 'string'
        ? parseInt(question.correctAnswer, 10)
        : Number(question.correctAnswer),
    category: question.category || topic.id,
    difficulty: question.difficulty || 1,
  };
}
