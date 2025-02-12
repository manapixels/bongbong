'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useUserProgress } from '@/hooks/use-user-progress';
import { MathQuestion, MathSubStrand } from '@/types/math';

function formatSubStrand(subStrand: string): string {
  return subStrand
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const DEFAULT_PREFERENCES = {
  difficulty: 1,
  topicsEnabled: [MathSubStrand.WHOLE_NUMBERS],
};

export function MathTrainer() {
  const {
    user,
    userId,
    progress,
    isLoading,
    updateProgress,
    getTotalProgress,
  } = useUserProgress();
  const [answer, setAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<MathQuestion | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const generateNewProblem = async () => {
    try {
      const response = await fetch('/api/math/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: {
            id: userId,
            preferences: user?.preferences || DEFAULT_PREFERENCES,
          },
          progress,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.answer) {
        throw new Error('Invalid problem data received from server');
      }

      setCurrentProblem(data);
      setAnswer('');
      setError(null);
    } catch (err) {
      console.error('Error generating problem:', err);
      setError('Failed to generate problem. Please try again.');
    }
  };

  const checkAnswer = async () => {
    if (!currentProblem || !answer.trim()) {
      setError('Please enter an answer');
      return;
    }

    try {
      // Clean up the answer string and convert to number if needed
      const userAnswer = answer.trim().toLowerCase();
      const correctAnswer = String(currentProblem.answer).toLowerCase();
      const isCorrect = userAnswer === correctAnswer;

      const requestBody = {
        studentId: userId,
        questionId: currentProblem.id,
        topicId: currentProblem.strand,
        isCorrect,
        timeSpent: 0,
        category: currentProblem.subStrand,
      };

      const response = await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Progress update failed:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update progress
      await updateProgress(
        currentProblem.strand,
        isCorrect,
        currentProblem.subStrand as MathSubStrand
      );

      // Show feedback before moving to next problem
      setError(
        isCorrect
          ? '✅ Correct!'
          : `❌ Incorrect. The answer was ${currentProblem.answer}`
      );

      // Wait a moment before generating new problem
      setTimeout(() => {
        generateNewProblem();
      }, 1500);
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to submit answer. Please try again.');
    }
  };

  // Don't render until initialization is complete
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const { totalProblems, correctAnswers } = getTotalProgress();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Math Practice</h2>

        {error && (
          <div
            className={`mb-4 ${error.includes('✅') ? 'text-green-500' : error.includes('❌') ? 'text-red-500' : 'text-red-500'}`}
          >
            {error}
          </div>
        )}

        {currentProblem ? (
          <div className="space-y-4">
            <div className="text-xl">{currentProblem.question}</div>

            <div className="text-sm text-gray-500">
              Topic: {formatSubStrand(currentProblem.subStrand)}
            </div>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="text-lg"
            />

            <Button onClick={checkAnswer}>Submit Answer</Button>
          </div>
        ) : (
          <Button onClick={generateNewProblem}>Start Practice</Button>
        )}

        {/* Progress Summary */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-2">Progress</h3>
          <div className="text-sm text-gray-600">
            Total Problems: {totalProblems}
            <br />
            Correct Answers: {correctAnswers}
            <br />
            Accuracy:{' '}
            {totalProblems > 0
              ? Math.round((correctAnswers / totalProblems) * 100)
              : 0}
            %
          </div>
        </div>
      </Card>
    </div>
  );
}
