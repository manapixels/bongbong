import type { Progress } from '@/types/progress';
import type { MathSubStrand } from '@/types/math';
import {
  getOrCreateUser,
  updateStudentProgress,
  getStudentProgress,
} from '@/lib/db/queries';

export interface LocalUser {
  id: string;
  preferences: {
    difficulty: string;
    topicsEnabled: string[];
  };
  progress: {
    topics: Record<string, Progress>;
    userProgress: UserProgress[];
  };
}

export interface UserProgress {
  userId: string;
  category: MathSubStrand;
  difficulty: number;
  correctAnswers: number;
  totalAttempts: number;
  lastAttemptAt: Date;
  mistakes: string[];
}

export async function syncUserProgress(localUser: LocalUser): Promise<void> {
  try {
    // Ensure user exists in database
    await getOrCreateUser(localUser.id);

    // Get existing database progress
    const dbProgress = await getStudentProgress({ userId: localUser.id });

    // For each topic's progress in local storage
    for (const [topicId, progress] of Object.entries(
      localUser.progress.topics
    )) {
      // For each substrand in the topic
      for (const subStrandProgress of progress.subStrandProgress || []) {
        // Create or update progress in database
        await updateStudentProgress({
          userId: localUser.id,
          questionId: progress.questionId || crypto.randomUUID(),
          isCorrect: progress.isCorrect,
          timeSpent: progress.timeSpent || 0,
        });

        // Update the progress table directly for subStrand progress
        await updateSubStrandProgress(localUser.id, subStrandProgress);
      }
    }

    // Sync user progress array
    for (const progress of localUser.progress.userProgress) {
      await updateStudentProgress({
        userId: localUser.id,
        questionId: crypto.randomUUID(),
        isCorrect: progress.correctAnswers > 0,
        timeSpent: 0,
      });

      // Update the progress table directly for category progress
      await updateSubStrandProgress(localUser.id, {
        subStrand: progress.category,
        level: progress.difficulty,
        questionsAttempted: progress.totalAttempts,
        correctAnswers: progress.correctAnswers,
        lastAttempted: progress.lastAttemptAt,
        mistakes: progress.mistakes,
      });
    }
  } catch (error) {
    console.error('Error syncing user progress:', error);
    throw error;
  }
}

async function updateSubStrandProgress(
  userId: string,
  subStrandProgress: {
    subStrand: string;
    level: number;
    questionsAttempted: number;
    correctAnswers: number;
    lastAttempted: Date;
    mistakes: string[];
  }
): Promise<void> {
  // Get current progress
  const currentProgress = await getStudentProgress({ userId });
  if (!currentProgress) return;

  // Update or add the subStrand progress
  const existingProgress = currentProgress.subStrandProgress || [];
  const existingIndex = existingProgress.findIndex(
    (p) => p.subStrand === subStrandProgress.subStrand
  );

  if (existingIndex >= 0) {
    existingProgress[existingIndex] = {
      ...existingProgress[existingIndex],
      ...subStrandProgress,
      questionsAttempted: Math.max(
        existingProgress[existingIndex].questionsAttempted,
        subStrandProgress.questionsAttempted
      ),
      correctAnswers: Math.max(
        existingProgress[existingIndex].correctAnswers,
        subStrandProgress.correctAnswers
      ),
      lastAttempted: new Date(
        Math.max(
          new Date(existingProgress[existingIndex].lastAttempted).getTime(),
          new Date(subStrandProgress.lastAttempted).getTime()
        )
      ),
      mistakes: Array.from(
        new Set([
          ...existingProgress[existingIndex].mistakes,
          ...subStrandProgress.mistakes,
        ])
      ),
    };
  } else {
    existingProgress.push(subStrandProgress);
  }

  // Update the progress in the database
  await updateStudentProgress({
    userId,
    questionId: crypto.randomUUID(),
    isCorrect: true,
    timeSpent: 0,
  });
}

export function mergeProgress(
  localProgress: Progress,
  dbProgress: Progress
): Progress {
  // Merge strategy: Take the higher values between local and DB progress
  const mergedSubStrandProgress = Array.from(
    new Set(
      [
        ...(localProgress.subStrandProgress || []),
        ...(dbProgress.subStrandProgress || []),
      ].map((p) => p.subStrand)
    )
  ).map((subStrand) => {
    const localEntry = localProgress.subStrandProgress?.find(
      (p) => p.subStrand === subStrand
    );
    const dbEntry = dbProgress.subStrandProgress?.find(
      (p) => p.subStrand === subStrand
    );

    if (!localEntry) return dbEntry!;
    if (!dbEntry) return localEntry;

    return {
      subStrand,
      level: Math.max(localEntry.level, dbEntry.level),
      questionsAttempted: Math.max(
        localEntry.questionsAttempted,
        dbEntry.questionsAttempted
      ),
      correctAnswers: Math.max(
        localEntry.correctAnswers,
        dbEntry.correctAnswers
      ),
      lastAttempted: new Date(
        Math.max(
          new Date(localEntry.lastAttempted).getTime(),
          new Date(dbEntry.lastAttempted).getTime()
        )
      ),
      mistakes: Array.from(
        new Set([...(localEntry.mistakes || []), ...(dbEntry.mistakes || [])])
      ),
    };
  });

  return {
    ...localProgress,
    subStrandProgress: mergedSubStrandProgress,
  };
}

export async function fetchAndMergeProgress(
  localUser: LocalUser
): Promise<LocalUser> {
  try {
    const dbProgress = await getStudentProgress({ userId: localUser.id });
    if (!dbProgress) return localUser;

    // Merge each topic's progress
    const mergedTopics: Record<string, Progress> = {
      ...localUser.progress.topics,
    };
    for (const [topicId, progress] of Object.entries(
      localUser.progress.topics
    )) {
      if (dbProgress.subStrandProgress?.length) {
        mergedTopics[topicId] = mergeProgress(progress, dbProgress);
      }
    }

    return {
      ...localUser,
      progress: {
        ...localUser.progress,
        topics: mergedTopics,
      },
    };
  } catch (error) {
    console.error('Error fetching and merging progress:', error);
    return localUser;
  }
}
