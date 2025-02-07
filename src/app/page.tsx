'use client';

import { MathTrainer } from '@/components/math-trainer';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [localId, setLocalId] = useState<string>('');

  useEffect(() => {
    // Try to get existing ID from localStorage
    const storedId = localStorage.getItem('studentId');
    if (storedId) {
      setLocalId(storedId);
    } else {
      // Generate new UUID if none exists
      const newId = crypto.randomUUID();
      localStorage.setItem('studentId', newId);
      setLocalId(newId);
    }
  }, []);

  // We'll use default values for a local profile
  const defaultProfile = {
    id: localId,
    name: 'Student',
    grade: 5,
    preferences: {
      difficulty: 'medium',
      topicsEnabled: ['addition', 'subtraction', 'multiplication', 'division'],
    },
  };

  const defaultProgress = {
    totalProblems: 0,
    correctAnswers: 0,
    topicStats: {},
  };

  // Don't render until we have a valid ID
  if (!localId) {
    return null;
  }

  return (
    <div className="flex-1 overflow-auto">
      <MathTrainer
        studentId={localId}
        profile={defaultProfile}
        progress={defaultProgress}
      />
    </div>
  );
}
