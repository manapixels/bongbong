export const ACHIEVEMENTS = {
  SPEED_DEMON: {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Solve a problem in under 5 seconds',
    type: 'speed',
    requiredValue: 5,
    rewardCoins: 100,
    rewardXP: 200,
    icon: '⚡'
  },
  STREAK_MASTER: {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Maintain a 10-problem streak',
    type: 'streak',
    requiredValue: 10,
    rewardCoins: 200,
    rewardXP: 300,
    icon: '🔥'
  },
  MATH_WIZARD: {
    id: 'math_wizard',
    name: 'Math Wizard',
    description: 'Solve 100 problems correctly',
    type: 'total_correct',
    requiredValue: 100,
    rewardCoins: 500,
    rewardXP: 1000,
    icon: '🧙‍♂️'
  },
  CATEGORY_MASTER: {
    id: 'category_master',
    name: 'Category Master',
    description: 'Achieve 90% accuracy in any category',
    type: 'category_mastery',
    requiredValue: 0.9,
    rewardCoins: 300,
    rewardXP: 500,
    icon: '👑'
  }
} as const;

export function checkAchievements(stats: any, currentAchievements: string[]): string[] {
  const newAchievements: string[] = [];

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (currentAchievements.includes(achievement.id)) return;

    switch (achievement.type) {
      case 'speed':
        if (stats.lastProblemTime <= achievement.requiredValue) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'streak':
        if (stats.currentStreak >= achievement.requiredValue) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'total_correct':
        if (stats.totalCorrect >= achievement.requiredValue) {
          newAchievements.push(achievement.id);
        }
        break;
      case 'category_mastery':
        Object.values(stats.categoryProgress).forEach((catStats: any) => {
          if (catStats.success / catStats.attempts >= achievement.requiredValue) {
            newAchievements.push(achievement.id);
          }
        });
        break;
    }
  });

  return newAchievements;
} 