'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MathQuestion } from '@/types/math';

interface ProblemDisplayProps {
  problem: MathQuestion;
  onAnswer: (answer: string) => void;
  isCorrect?: boolean;
  showSolution?: boolean;
}

export function ProblemDisplay({
  problem,
  onAnswer,
  isCorrect,
  showSolution,
}: ProblemDisplayProps) {
  const [answer, setAnswer] = useState('');
  const [currentHint, setCurrentHint] = useState(0);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{problem.question}</h3>
        {isCorrect !== undefined && (
          <Badge variant={isCorrect ? 'secondary' : 'destructive'}>
            {isCorrect ? 'Correct!' : 'Try Again'}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <Button onClick={() => onAnswer(answer)}>Submit</Button>
      </div>

      {showSolution && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <h4 className="font-medium">Solution:</h4>
          <p>{problem.explanation.join('\n')}</p>
        </div>
      )}
    </Card>
  );
}
