import { eq, and, desc } from 'drizzle-orm';
import {
  db,
  user as userTable,
  progress as progressTable,
  mathQuestions as mathQuestionsTable,
} from '@/lib/db';
import type {
  MathTopic,
  MathSubStrand,
  MathQuestion,
  MathStrand,
} from '@/types/math';
import { MATH_TOPICS } from '@/types/math';
import { Progress, User } from '@/types';
import { sql } from 'drizzle-orm';

export async function getUser(email: string): Promise<User[]> {
  return db.select().from(userTable).where(eq(userTable.email, email));
}

export async function createUser(
  email: string,
  password: string,
  specificId?: string
): Promise<User> {
  const [newUser] = await db
    .insert(userTable)
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
    where: eq(userTable.id, studentId),
  });
  return student;
}

export async function getStudentProgress({
  userId,
}: {
  userId: string;
}): Promise<Progress | undefined> {
  const [firstProgress] = await db
    .select()
    .from(progressTable)
    .where(eq(progressTable.userId, userId));

  return firstProgress;
}

export async function getStudentSubStrandProgress({
  userId,
  subStrand,
}: {
  userId: string;
  subStrand: MathSubStrand;
}): Promise<Progress | undefined> {
  const [firstProgress] = await db
    .select()
    .from(progressTable)
    .where(
      and(
        eq(progressTable.userId, userId),
        sql`${progressTable.subStrandProgress}->>'subStrand' = ${subStrand}`
      )
    );

  return firstProgress;
}

export async function updateStudentProgress({
  userId,
  questionId,
  isCorrect,
  timeSpent,
}: {
  userId: string;
  questionId: string;
  isCorrect: boolean;
  timeSpent: number;
}) {
  return await db.insert(progressTable).values({
    userId,
    questionId,
    isCorrect,
    timeSpent,
  });
}

interface MasteryCheck {
  isMastered: boolean;
  canProgress: boolean;
  nextDifficulty?: number;
  nextLevel?: number;
}

export async function getSubStrandSuccessRate(
  userId: string,
  strand: string,
  subStrand: MathSubStrand,
  currentDifficulty: number,
  currentLevel: number
): Promise<MasteryCheck> {
  // Get recent progress for this subStrand
  const recentProgress = await db
    .select()
    .from(progressTable)
    .where(
      and(
        eq(progressTable.userId, userId),
        sql`${progressTable.subStrandProgress}->>'subStrand' = ${subStrand}`
      )
    )
    .orderBy(desc(progressTable.createdAt))
    .limit(10);

  if (recentProgress.length < 10) {
    return { isMastered: false, canProgress: false };
  }

  // Calculate accuracy over last 10 attempts
  const correctCount = recentProgress.filter((p) => p.isCorrect).length;
  const accuracy = correctCount / recentProgress.length;

  // Check for 3 consecutive correct answers
  const lastThree = recentProgress.slice(0, 3);
  const hasConsecutiveCorrect =
    lastThree.length === 3 && lastThree.every((p) => p.isCorrect);

  const isMastered = accuracy >= 0.8 && hasConsecutiveCorrect;

  if (!isMastered) {
    return { isMastered, canProgress: false };
  }

  // Determine next progression
  let nextDifficulty = currentDifficulty;
  let nextLevel = currentLevel;

  if (currentDifficulty < 5) {
    nextDifficulty = currentDifficulty + 1;
  } else if (currentLevel < 6) {
    nextLevel = currentLevel + 1;
    nextDifficulty = 1;
  }

  const canProgress =
    nextDifficulty !== currentDifficulty || nextLevel !== currentLevel;

  return {
    isMastered,
    canProgress,
    nextDifficulty: canProgress ? nextDifficulty : undefined,
    nextLevel: canProgress ? nextLevel : undefined,
  };
}

export async function generateProblem(
  difficulty: number,
  subStrand: MathSubStrand,
  progress: Progress
): Promise<MathQuestion> {
  if (!subStrand) {
    throw new Error('No subStrand provided');
  }

  if (!progress.userId) {
    throw new Error('User ID is required');
  }

  // Find progress for this subStrand
  const subStrandProgress = progress?.subStrandProgress?.find(
    (p) => p.subStrand === subStrand
  );
  const topicSuccessRates = [
    {
      subStrand,
      successRate: subStrandProgress
        ? subStrandProgress.questionsAttempted > 0
          ? subStrandProgress.correctAnswers /
            subStrandProgress.questionsAttempted
          : 0
        : 0,
      totalAttempts: subStrandProgress?.questionsAttempted ?? 0,
    },
  ];

  const topic: MathTopic =
    MATH_TOPICS.find((t) => t.subStrand === subStrand) || MATH_TOPICS[0];

  // Check mastery and adjust difficulty if needed
  const subStrandsToPractice = await getSubStrandSuccessRate(
    progress.userId,
    topic.strand,
    topicSuccessRates[0].subStrand as MathSubStrand,
    difficulty,
    topic.level
  );

  if (subStrandsToPractice.canProgress) {
    difficulty = subStrandsToPractice.nextDifficulty || difficulty;
    // Update user's current level/difficulty in their progress
    await db
      .update(progressTable)
      .set({
        subStrandProgress: sql`jsonb_set(
          ${progress.subStrandProgress},
          '{${topicSuccessRates[0].subStrand}}',
          jsonb_build_object(
            'level', ${subStrandsToPractice.nextLevel},
            'difficulty', ${subStrandsToPractice.nextDifficulty}
          )
        )`,
      })
      .where(eq(progressTable.userId, progress.userId));
  }

  try {
    // Get sample problem from the subStrand
    const problem = await db.query.mathQuestions.findFirst({
      where: eq(mathQuestionsTable.subStrand, subStrand),
    });
    if (!problem) {
      // If no template found, get a random one
      const [question] = await db
        .select()
        .from(mathQuestionsTable)
        .orderBy(sql`RANDOM()`)
        .limit(1);

      if (!question) {
        throw new Error('No problem templates available');
      }

      return {
        id: question.id,
        type: question.type,
        question: question.question,
        answer: question.answer,
        explanation: question.explanation,
        difficulty: question.difficulty,
        strand: question.strand as MathStrand,
        subStrand: question.subStrand,
        subject: 'mathematics',
        answerFormula: question.answerFormula ?? '',
        variables: question.variables ?? {},
        createdAt: question.createdAt ?? null,
      };
    }

    return {
      id: problem.id,
      type: problem.type,
      question: problem.question,
      answer: problem.answer,
      explanation: problem.explanation,
      difficulty: problem.difficulty,
      strand: problem.strand as MathStrand,
      subStrand: problem.subStrand,
      subject: 'mathematics',
      answerFormula: problem.answerFormula ?? '',
      variables: problem.variables ?? {},
      createdAt: problem.createdAt ?? null,
    };
  } catch (error) {
    console.error('Error generating problem with template:', error);
    throw error;
  }
}
