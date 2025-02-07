import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { TopicProgress, UserProgress } from '@/types/progress';
import { MathSubStrand } from '@/types/math';

interface LocalUser {
  id: string;
  preferences: {
    difficulty: string;
    topicsEnabled: string[];
  };
  progress: {
    topics: Record<string, TopicProgress>;
    userProgress: UserProgress[];
  };
}

const DEFAULT_USER: LocalUser = {
  id: '',
  preferences: {
    difficulty: 'medium',
    topicsEnabled: ['addition', 'subtraction', 'multiplication', 'division'],
  },
  progress: {
    topics: {},
    userProgress: [],
  },
};

export function useLocalUser() {
  const [localUser, setLocalUser] = useLocalStorage<LocalUser>(
    'localUser',
    DEFAULT_USER
  );

  useEffect(() => {
    if (!localUser.id) {
      // Initialize with a new ID if not set
      setLocalUser({
        ...localUser,
        id: crypto.randomUUID(),
      });
    }

    // Ensure progress structure exists
    if (!localUser.progress) {
      setLocalUser({
        ...localUser,
        progress: {
          topics: {},
          userProgress: [],
        },
      });
    }
  }, [localUser, setLocalUser]);

  const updateProgress = (
    topicId: string,
    isCorrect: boolean,
    category: MathSubStrand
  ) => {
    const now = new Date();

    // Ensure progress structure exists
    const currentProgress = {
      topics: localUser.progress?.topics || {},
      userProgress: localUser.progress?.userProgress || [],
    };

    // Update topic progress
    const currentTopicProgress = currentProgress.topics[topicId] || {
      topicId,
      questionsAttempted: 0,
      correctAnswers: 0,
      averageScore: 0,
      lastAttempted: now,
      mistakes: [],
    };

    const newTopicProgress: TopicProgress = {
      ...currentTopicProgress,
      questionsAttempted: currentTopicProgress.questionsAttempted + 1,
      correctAnswers: currentTopicProgress.correctAnswers + (isCorrect ? 1 : 0),
      averageScore:
        ((currentTopicProgress.correctAnswers + (isCorrect ? 1 : 0)) /
          (currentTopicProgress.questionsAttempted + 1)) *
        100,
      lastAttempted: now,
    };

    // Update user progress for the category
    const existingProgress = currentProgress.userProgress.find(
      (p) => p.category === category
    );
    const newUserProgress: UserProgress = existingProgress
      ? {
          ...existingProgress,
          totalAttempts: existingProgress.totalAttempts + 1,
          correctAnswers: existingProgress.correctAnswers + (isCorrect ? 1 : 0),
          lastAttemptAt: now,
        }
      : {
          userId: localUser.id,
          category,
          difficulty: Number(localUser.preferences.difficulty) || 1,
          correctAnswers: isCorrect ? 1 : 0,
          totalAttempts: 1,
          lastAttemptAt: now,
          mistakes: [],
        };

    const userProgress = existingProgress
      ? currentProgress.userProgress.map((p) =>
          p.category === category ? newUserProgress : p
        )
      : [...currentProgress.userProgress, newUserProgress];

    // Update the entire progress structure
    setLocalUser({
      ...localUser,
      progress: {
        topics: {
          ...currentProgress.topics,
          [topicId]: newTopicProgress,
        },
        userProgress,
      },
    });
  };

  const getTotalProgress = () => {
    const totalAttempts = localUser.progress?.userProgress?.reduce(
      (sum, p) => sum + p.totalAttempts,
      0
    );
    const totalCorrect = localUser.progress?.userProgress?.reduce(
      (sum, p) => sum + p.correctAnswers,
      0
    );

    return {
      totalProblems: totalAttempts || 0,
      correctAnswers: totalCorrect || 0,
    };
  };

  return {
    localUser,
    setLocalUser,
    updateProgress,
    getTotalProgress,
  };
}
