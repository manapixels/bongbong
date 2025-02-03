'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProblemDisplay } from './problem-display';
import { MathTopic, Question } from '@/types/math';
import { useToast } from '@/components/ui/use-toast';

interface PracticeSessionProps {
  topic: MathTopic;
  studentId: string;
  onComplete: () => void;
}

export function PracticeSession({
  topic,
  studentId,
  onComplete
}: PracticeSessionProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [showSolution, setShowSolution] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchNextQuestion();
  }, [topic.id]);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch(`/api/math/problems?topicId=${topic.id}`);
      if (!response.ok) throw new Error('Failed to fetch question');
      const question = await response.json();
      setCurrentQuestion(question);
      setIsCorrect(undefined);
      setShowSolution(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load next question",
        variant: "destructive"
      });
    }
  };

  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    const correct = answer === currentQuestion.correctAnswer.toString();
    setIsCorrect(correct);
    setQuestionsAnswered(prev => prev + 1);
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    try {
      await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          topicId: topic.id,
          questionId: currentQuestion.id,
          isCorrect: correct,
          timeSpent: 0 // TODO: Implement timer
        })
      });
    } catch (error) {
      console.error('Failed to update progress:', error);
    }

    if (correct) {
      setTimeout(fetchNextQuestion, 1500);
    } else {
      setShowSolution(true);
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{topic.name}</h2>
          <Button variant="outline" onClick={onComplete}>End Session</Button>
        </div>
        <Progress 
          value={(correctAnswers / Math.max(1, questionsAnswered)) * 100} 
          className="mb-2"
        />
        <div className="text-sm text-muted-foreground">
          {correctAnswers} correct out of {questionsAnswered} attempts
        </div>
      </Card>

      <ProblemDisplay
        problem={currentQuestion}
        onAnswer={handleAnswer}
        isCorrect={isCorrect}
        showSolution={showSolution}
      />
    </div>
  );
} 