'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/math';


interface ProblemDisplayProps {
  problem: Question;
  onAnswer: (answer: string) => void;
  isCorrect?: boolean;
  showSolution?: boolean;
}

export function ProblemDisplay({
  problem,
  onAnswer,
  isCorrect,
  showSolution
}: ProblemDisplayProps) {
  const [answer, setAnswer] = useState('');
  const [currentHint, setCurrentHint] = useState(0);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{problem.text}</h3>
        {isCorrect !== undefined && (
          <Badge variant={isCorrect ? "secondary" : "destructive"}>
            {isCorrect ? "Correct!" : "Try Again"}
          </Badge>
        )}
      </div>

      {problem.options ? (
        <div className="grid grid-cols-2 gap-2">
          {problem.options.map((option, i) => (
            <Button
              key={i}
              variant="outline"
              onClick={() => onAnswer(option)}
              className={
                showSolution && option === problem.correctAnswer
                  ? "border-green-500"
                  : ""
              }
            >
              {option}
            </Button>
          ))}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <Button onClick={() => onAnswer(answer)}>Submit</Button>
        </div>
      )}

      {problem.hints && problem.hints.length > 0 && (
        <div className="mt-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentHint((prev) => 
              (prev + 1) % problem.hints.length
            )}
          >
            Need a hint?
          </Button>
          {currentHint > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {problem.hints[currentHint - 1]}
            </p>
          )}
        </div>
      )}

      {showSolution && (
        <div className="mt-4 p-4 bg-muted rounded-md">
          <h4 className="font-medium">Solution:</h4>
          <p>{problem.solution.steps.join('\n')}</p>
          <p>{problem.solution.explanation}</p>
        </div>

      )}
    </Card>
  );
} 