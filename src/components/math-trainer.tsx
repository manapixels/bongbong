'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { useLocalUser } from '@/hooks/use-local-user';
import { MathSubStrand } from '@/types/math';

interface Problem {
  id: string;
  question: string;
  answer: number;
  strand: string;
  subStrand: MathSubStrand;
  difficulty: number;
  topicId: string;
}

export function MathTrainer() {
  const { localUser, updateProgress, getTotalProgress } = useLocalUser();
  const [answer, setAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (localUser.id && !isInitialized) {
      setIsInitialized(true);
    }
  }, [localUser.id, isInitialized]);

  const generateNewProblem = async () => {
    try {
      const response = await fetch('/api/math/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: {
            id: localUser.id,
            preferences: localUser.preferences,
          },
          progress: {
            ...localUser.progress,
            userId: localUser.id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        throw new Error('No data received from server');
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
    if (!currentProblem) return;

    try {
      const isCorrect = Number(answer) === currentProblem.answer;

      const requestBody = {
        studentId: localUser.id,
        questionId: currentProblem.id,
        topicId: currentProblem.topicId || currentProblem.strand,
        isCorrect,
        timeSpent: 0,
      };

      const response = await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local progress
      updateProgress(
        currentProblem.topicId || currentProblem.strand,
        isCorrect,
        currentProblem.subStrand
      );

      // Show feedback before moving to next problem
      setError(
        isCorrect
          ? '✅ Correct!'
          : '❌ Incorrect. The answer was ' + currentProblem.answer
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
  if (!isInitialized) {
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

        {!currentProblem ? (
          <Button onClick={generateNewProblem}>Start Practice</Button>
        ) : (
          <div className="space-y-4">
            <div className="text-xl">{currentProblem.question}</div>
            <div className="text-sm text-gray-500">
              Topic: {currentProblem.strand}
            </div>
            <Input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="text-lg"
            />

            <Button onClick={checkAnswer}>Submit Answer</Button>
          </div>
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
