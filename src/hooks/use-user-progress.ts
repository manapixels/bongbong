import { useEffect, useState } from 'react';
import { MathSubStrand } from '@/types/math';
import { Progress, User } from '@/types';

interface UserProgress {
  totalProblems: number;
  correctAnswers: number;
}

const STORAGE_KEY = 'user_id';

function getOrCreateUserId(): string {
  if (typeof window === 'undefined') {
    return ''; // Return empty string or some default value for server-side rendering
  }

  const existingId = localStorage.getItem(STORAGE_KEY);
  if (existingId) {
    return existingId;
  }

  const newId = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, newId);
  return newId;
}

export function useUserProgress() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState(getOrCreateUserId);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Get or create user profile
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);

        // Get user progress
        const progressResponse = await fetch(`/api/progress/${userId}`);
        if (!progressResponse.ok) {
          throw new Error('Failed to fetch progress');
        }
        const progressData = await progressResponse.json();
        setProgress(progressData);
      } catch (error) {
        console.error('Error initializing user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, [userId]);

  const updateProgress = async (
    topicId: string,
    isCorrect: boolean,
    category: MathSubStrand
  ) => {
    try {
      const response = await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          topicId,
          isCorrect,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      // Refresh progress after update
      const progressResponse = await fetch(`/api/progress/${userId}`);
      if (!progressResponse.ok) {
        throw new Error('Failed to fetch updated progress');
      }
      const progressData = await progressResponse.json();
      setProgress(progressData);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getTotalProgress = (): UserProgress => {
    if (!progress?.subStrandProgress) {
      return {
        totalProblems: 0,
        correctAnswers: 0,
      };
    }

    const totalAttempts = progress.subStrandProgress.reduce(
      (sum, p) => sum + (p.questionsAttempted || 0),
      0
    );
    const totalCorrect = progress.subStrandProgress.reduce(
      (sum, p) => sum + (p.correctAnswers || 0),
      0
    );

    return {
      totalProblems: totalAttempts,
      correctAnswers: totalCorrect,
    };
  };

  return {
    user,
    userId,
    progress,
    isLoading,
    updateProgress,
    getTotalProgress,
  };
}
