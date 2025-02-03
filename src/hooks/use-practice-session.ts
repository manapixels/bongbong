import { useState, useEffect } from 'react';
import { useTimer } from './use-timer';
import { useToast } from '@/hooks/use-toast';
import { Question, MathTopic } from '@/types/math';

export function usePracticeSession(topic: MathTopic, studentId: string) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
  const [showSolution, setShowSolution] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const timer = useTimer();
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
      timer.reset();
      timer.start();
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

    const timeSpent = timer.stop();
    const correct = answer === currentQuestion.correctAnswer.toString();
    setIsCorrect(correct);
    setQuestionsAnswered(prev => prev + 1);
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    try {
      const response = await fetch('/api/math/update-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          topicId: topic.id,
          questionId: currentQuestion.id,
          isCorrect: correct,
          timeSpent
        })
      });

      const { newAchievements } = await response.json();
      
      if (newAchievements?.length > 0) {
        toast({
          title: "Achievement Unlocked!",
          description: `You've earned: ${newAchievements.join(', ')}`,
          variant: "success"
        });
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }

    if (correct) {
      setTimeout(fetchNextQuestion, 1500);
    } else {
      setShowSolution(true);
    }
  };

  return {
    currentQuestion,
    isCorrect,
    showSolution,
    questionsAnswered,
    correctAnswers,
    handleAnswer,
    timer: timer.time
  };
} 