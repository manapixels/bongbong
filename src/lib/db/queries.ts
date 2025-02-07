import { eq, and, desc } from 'drizzle-orm';
import { db } from '@/lib/db';
import {
  user,
  studentProgress,
  mathProblems,
  studentSkillProgress,
  studentProblemHistory,
  problemTemplates,
} from '@/lib/db/schema';
import type { MathTopic, Question, MathSubStrand } from '@/types/math';
import { MATH_TOPICS } from '@/types/math';
import { StudentProgress } from '@/types/progress';
import { User } from '@/types';
import {
  generateProblemFromTemplate,
  findNextTemplate,
  isSimilarProblem,
} from '@/lib/math/problem-generator';
import type { SkillProgress, ProblemTemplate } from '@/types/problem-template';
import { sql } from 'drizzle-orm';

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

export async function getStudentSkillProgress(
  userId: string
): Promise<SkillProgress[]> {
  try {
    const progress = await db
      .select()
      .from(studentSkillProgress)
      .where(eq(studentSkillProgress.userId, userId));

    return progress.map((p) => ({
      skillId: p.skillId,
      proficiency: p.proficiency / 100, // Convert from integer (0-100) to float (0-1)
      lastPracticed: p.lastPracticed,
      totalAttempts: p.totalAttempts,
      successRate: p.successRate / 100, // Convert from integer (0-100) to float (0-1)
      needsReview: p.needsReview,
    }));
  } catch (error) {
    // If table doesn't exist or other error, return empty progress
    console.warn('Could not fetch skill progress, using default:', error);
    return [];
  }
}

interface MasteryCheck {
  isMastered: boolean;
  canProgress: boolean;
  nextDifficulty?: number;
  nextLevel?: number;
}

export async function checkMastery(
  userId: string,
  strand: string,
  subStrand: MathSubStrand,
  currentDifficulty: number,
  currentLevel: number
): Promise<MasteryCheck> {
  // Get recent progress for this subStrand
  const recentProgress = await db
    .select()
    .from(studentProgress)
    .where(
      and(
        eq(studentProgress.userId, userId),
        sql`${studentProgress.subStrandProgress}->>'subStrand' = ${subStrand}`
      )
    )
    .orderBy(desc(studentProgress.createdAt))
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
  topics: string[],
  progress: StudentProgress
): Promise<Question> {
  if (!topics || topics.length === 0) {
    throw new Error('No topics provided');
  }

  if (!progress.userId) {
    throw new Error('User ID is required');
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

  // Check mastery and adjust difficulty if needed
  const masteryCheck = await checkMastery(
    progress.userId,
    topic.strand,
    topicSuccessRates[0].subStrand as MathSubStrand,
    difficulty,
    topic.level
  );

  if (masteryCheck.canProgress) {
    difficulty = masteryCheck.nextDifficulty || difficulty;
    // Update user's current level/difficulty in their progress
    await db
      .update(studentProgress)
      .set({
        subStrandProgress: sql`jsonb_set(
          ${studentProgress.subStrandProgress},
          '{${topicSuccessRates[0].subStrand}}',
          jsonb_build_object(
            'level', ${masteryCheck.nextLevel},
            'difficulty', ${masteryCheck.nextDifficulty}
          )
        )`,
      })
      .where(eq(studentProgress.userId, progress.userId));
  }

  try {
    // Get student's skill progress
    const skillProgress = await getStudentSkillProgress(progress.userId);

    // Find the next best template based on student's progress
    const template = await findNextTemplate(progress.userId, skillProgress);
    if (!template) {
      // If no template found, get a random one
      const [randomTemplate] = await db
        .select()
        .from(problemTemplates)
        .orderBy(sql`RANDOM()`)
        .limit(1);

      if (!randomTemplate) {
        throw new Error('No problem templates available');
      }

      // Convert database result to ProblemTemplate
      const template = {
        ...randomTemplate,
        context: randomTemplate.context || undefined,
        subStrand: randomTemplate.subStrand as MathSubStrand,
        validationRules:
          randomTemplate.validationRules as ProblemTemplate['validationRules'],
      };

      // Generate a problem from the random template
      const problem = await generateProblemFromTemplate(
        template,
        progress.userId
      );

      // Store the generated problem
      await db.insert(mathProblems).values({
        id: problem.id,
        templateId: template.id,
        type: problem.type,
        question: problem.question,
        variables: problem.variables,
        answer: problem.answer,
        strand: problem.strand as string,
        subStrand: problem.subStrand,
        difficulty: problem.difficulty,
        context: problem.context,
      });

      return {
        id: problem.id,
        type: problem.type,
        question: problem.question,
        answer: problem.answer,
        explanation: problem.explanation,
        difficulty: problem.difficulty,
        strand: problem.strand as Question['strand'],
        subStrand: problem.subStrand,
      };
    }

    // Generate a problem from the template
    const historyResult = await db.query.studentProblemHistory.findFirst({
      where: and(
        eq(studentProblemHistory.userId, progress.userId),
        eq(studentProblemHistory.templateId, template.id)
      ),
    });

    // Transform database result to match StudentProblemHistory type
    const history = historyResult
      ? {
          templateId: historyResult.templateId!,
          attempts: historyResult.attempts,
          correctAttempts: historyResult.correctAttempts,
          lastAttempted: historyResult.lastAttempted,
          averageResponseTime: historyResult.averageResponseTime,
          commonMistakes: historyResult.commonMistakes,
          variationsUsed: historyResult.variationsUsed,
        }
      : undefined;

    const problem = await generateProblemFromTemplate(
      template,
      progress.userId,
      history
    );

    // Store the generated problem
    await db.insert(mathProblems).values({
      id: problem.id,
      templateId: template.id,
      type: problem.type,
      question: problem.question,
      variables: problem.variables,
      answer: problem.answer,
      strand: problem.strand as string,
      subStrand: problem.subStrand,
      difficulty: problem.difficulty,
      context: problem.context,
    });

    return {
      id: problem.id,
      type: problem.type,
      question: problem.question,
      answer: problem.answer,
      explanation: problem.explanation,
      difficulty: problem.difficulty,
      strand: problem.strand as Question['strand'],
      subStrand: problem.subStrand,
    };
  } catch (error) {
    console.error('Error generating problem with template:', error);
    throw error;
  }
}
