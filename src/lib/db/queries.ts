import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { user, studentProgress, mathProblems } from '@/lib/db/schema';
import type { MathTopic, Question } from '@/types/math';
import { MATH_TOPICS } from '@/types/math';
import { StudentProgress } from '@/types/progress';
import { User } from '@/types';
import { selectNextQuestion } from '@/lib/math';

export async function getUser(email: string): Promise<User[]> {
  return db.select().from(user).where(eq(user.email, email));
}

export async function createUser(
  email: string,
  password: string,
  specificId?: string
): Promise<User> {
  const [newUser] = await db
    .insert(user)
    .values({
      id: specificId,
      email,
      password,
      isStudent: true,
    })
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
): Promise<Question> {
  if (!topics || topics.length === 0) {
    throw new Error('No topics provided');
  }

  // Find the topic the student needs most practice with
  const topicStats = progress?.subStrandProgress || [];

  // Calculate success rates for each enabled topic
  const topicSuccessRates = topics.map((subStrand) => {
    const stats = topicStats.find((p) => p.subStrand === subStrand);
    if (!stats) {
      return {
        subStrand,
        successRate: 0, // New topics should be prioritized
        totalAttempts: 0,
      };
    }

    return {
      subStrand,
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
  const question = selectNextQuestion(progress, topic.subStrand);

  // Create the problem object
  const problem = {
    id: crypto.randomUUID(),
    type: question.type,
    question: question.question,
    answer:
      typeof question.answer === 'string'
        ? parseInt(question.answer, 10)
        : Number(question.answer),
    strand: topic.strand,
    subStrand: topic.subStrand,
    explanation: question.explanation,
    difficulty: question.difficulty || 1,
  };

  // Store the problem in the database
  await db.insert(mathProblems).values({
    id: problem.id,
    type: problem.type,
    question: problem.question,
    answer: problem.answer,
    strand: problem.strand,
    subStrand: problem.subStrand,
    difficulty: problem.difficulty,
  });

  return problem;
}
