import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface MathProblem {
  id: string;
  question: string;
  answer: number;
  difficulty: number;
  category: 'addition' | 'subtraction' | 'multiplication' | 'division';
}

interface StudentProfile {
  userId: string;
  level: number;
  weakAreas: string[];
  strengths: string[];
  preferredLearningStyle: 'visual' | 'numeric' | 'word-problems';
}

interface StudentProgress {
  totalProblems: number;
  correctAnswers: number;
  streaks: number;
  categoryProgress: Record<string, { attempts: number; success: number }>;
}

interface MathTrainer extends StudentProfile {
  achievements: Achievement[];
  xp: number;
  coins: number;
}

export function MathTrainer({ 
  studentId, 
  profile, 
  progress 
}: { 
  studentId: string;
  profile: StudentProfile;
  progress: StudentProgress;
}) {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [streak, setStreak] = useState(progress.streaks);
  const [timer, setTimer] = useState(0);
  const [isTestMode, setIsTestMode] = useState(false);
  const [visualAid, setVisualAid] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  const { toast } = useToast();

  useEffect(() => {
    generateNewProblem();
    return () => clearInterval(timerRef.current);
  }, [isTestMode]);

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTimeRef.current!) / 1000));
    }, 1000);
  };

  const generateVisualAid = (problem: MathProblem) => {
    if (!profile.visualAidsEnabled) return null;

    switch (problem.category) {
      case 'addition':
        return `🔵`.repeat(problem.num1) + ' + ' + `🔴`.repeat(problem.num2);
      case 'subtraction':
        return `⭐`.repeat(problem.num1) + ' - ' + `⭐`.repeat(problem.num2);
      // Add more visual representations for other categories
    }
  };

  const generateNewProblem = async () => {
    clearInterval(timerRef.current);
    setTimer(0);
    startTimer();

    const problem = await fetch('/api/math/generate-problem', {
      method: 'POST',
      body: JSON.stringify({
        studentId,
        profile,
        progress,
        isTestMode
      })
    }).then(res => res.json());
    
    setCurrentProblem(problem);
    setVisualAid(generateVisualAid(problem));
  };

  const handleSubmit = async () => {
    if (!currentProblem) return;
    clearInterval(timerRef.current);

    const timeSpent = Math.floor((Date.now() - startTimeRef.current!) / 1000);
    const isCorrect = Number(userAnswer) === currentProblem.answer;
    
    if (isCorrect) {
      setStreak(prev => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const xpGained = calculateXP(timeSpent, currentProblem.difficulty);
      const coinsGained = calculateCoins(streak);

      toast({
        title: "Correct! 🎉",
        description: `+${xpGained}XP | +${coinsGained}🪙 | Streak: ${streak + 1}`,
        variant: "success"
      });
    } else {
      setStreak(0);
      playSound('wrong');
      toast({
        title: "Try again!",
        description: `The correct answer was ${currentProblem.answer}`,
        variant: "error"
      });
    }

    // Update progress
    const result = await fetch('/api/math/update-progress', {
      method: 'POST',
      body: JSON.stringify({
        studentId,
        problemId: currentProblem.id,
        isCorrect,
        timeSpent,
        category: currentProblem.category,
        isTestMode
      })
    }).then(res => res.json());

    // Check for new achievements
    if (result.newAchievements?.length) {
      result.newAchievements.forEach((achievement: Achievement) => {
        toast({
          title: "🏆 New Achievement!",
          description: `${achievement.name}: ${achievement.description}`,
          variant: "success"
        });
      });
    }

    setUserAnswer('');
    if (!isTestMode || (isTestMode && progress.totalProblems < 10)) {
      generateNewProblem();
    } else {
      // End of test mode
      showTestResults(result.testResults);
    }
  };

  const showTestResults = (results: TestResults) => {
    // Show modal with test results
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-8">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge variant="outline">Level {profile.level}</Badge>
          <Badge variant="outline">🔥 {streak}</Badge>
          <Badge variant="outline">⭐ {profile.xp}XP</Badge>
          <Badge variant="outline">🪙 {profile.coins}</Badge>
        </div>
        <Button
          onClick={() => setIsTestMode(!isTestMode)}
          variant={isTestMode ? "destructive" : "outline"}
        >
          {isTestMode ? "Exit Test" : "Start Test"}
        </Button>
      </div>

      <Card className="p-6 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <Badge>{currentProblem?.category}</Badge>
          <Badge variant="outline">⏱️ {timer}s</Badge>
        </div>

        <h2 className="text-3xl mb-4 text-center">{currentProblem?.question}</h2>
        
        {visualAid && (
          <div className="text-center text-2xl mb-4">
            {visualAid}
          </div>
        )}

        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full p-4 text-2xl rounded border"
          placeholder="Enter your answer"
          autoFocus
        />
        
        <Button 
          onClick={handleSubmit}
          className="w-full mt-4"
        >
          Submit
        </Button>
      </Card>

      <div className="w-full max-w-md space-y-4">
        <div>
          <h3 className="text-xl mb-2">Overall Progress</h3>
          <Progress 
            value={progress.correctAnswers / progress.totalProblems * 100} 
            className="h-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(progress.categoryProgress).map(([category, stats]) => (
            <div key={category}>
              <h4 className="text-sm mb-1">{category}</h4>
              <Progress 
                value={stats.success / stats.attempts * 100}
                className="h-1"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 