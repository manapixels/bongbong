'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface MathTrainerProps {
  studentId: string;
  profile: {
    id: string;
    preferences: {
      difficulty: string;
      topicsEnabled: string[];
    };
  };
  progress: {
    totalProblems: number;
    correctAnswers: number;
    topicStats: Record<string, { total: number; correct: number }>;
  };
}

interface Problem {
  id: string;
  question: string;
  answer: number;
  category: string;
}

export function MathTrainer({
  studentId,
  profile,
  progress,
}: MathTrainerProps) {
  const [answer, setAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log(currentProblem);

  const generateNewProblem = async () => {
    try {
      const response = await fetch('/api/math/generate-problem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile, progress }),
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

      const response = await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          questionId: currentProblem.id,
          topicId: currentProblem.category,
          isCorrect,
          timeSpent: 0, // Add timer implementation if needed
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Generate new problem after submitting answer
      generateNewProblem();
    } catch (err) {
      console.error('Error updating progress:', err);
      setError('Failed to submit answer. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Math Practice</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {!currentProblem ? (
          <Button onClick={generateNewProblem}>Start Practice</Button>
        ) : (
          <div className="space-y-4">
            <div className="text-xl">{currentProblem.question}</div>
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
      </Card>
    </div>
  );
}
