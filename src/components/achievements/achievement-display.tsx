'use client';

import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import confetti from 'canvas-confetti';

interface AchievementDisplayProps {
  achievements: {
    id: string;
    name: string;
    description: string;
    unlockedAt: Date;
  }[];
  newAchievements?: string[];
}

export function AchievementDisplay({ 
  achievements,
  newAchievements = []
}: AchievementDisplayProps) {
  useEffect(() => {
    if (newAchievements.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [newAchievements]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Achievements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id}
            className={`p-4 ${
              newAchievements.includes(achievement.name)
                ? 'border-2 border-yellow-500 dark:border-yellow-400'
                : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{achievement.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              <Badge variant={
                newAchievements.includes(achievement.name)
                  ? 'default'
                  : 'secondary'
              }>
                {new Date(achievement.unlockedAt).toLocaleDateString()}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 