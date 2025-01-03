// XP and rewards calculation
export function calculateXP(timeSpent: number, difficulty: number): number {
  const baseXP = difficulty * 10;
  const speedBonus = Math.max(0, 30 - timeSpent) * 2;
  return Math.floor(baseXP + speedBonus);
}

export function calculateCoins(streak: number): number {
  return Math.floor(10 + (streak * 2));
}

// Sound effects
const sounds = {
  correct: new Audio('/sounds/correct.mp3'),
  wrong: new Audio('/sounds/wrong.mp3'),
  achievement: new Audio('/sounds/achievement.mp3'),
};

export function playSound(type: keyof typeof sounds) {
  if (typeof window !== 'undefined') {
    sounds[type].play().catch(() => {});
  }
}

// Test results calculation
export function calculateTestResults(progress: any) {
  return {
    accuracy: (progress.correctAnswers / progress.totalProblems) * 100,
    averageTime: progress.totalTime / progress.totalProblems,
    grade: calculateGrade(progress.correctAnswers / progress.totalProblems),
    weakestCategory: findWeakestCategory(progress.categoryProgress),
    recommendations: generateRecommendations(progress)
  };
}

function calculateGrade(accuracy: number): string {
  if (accuracy >= 0.9) return 'A';
  if (accuracy >= 0.8) return 'B';
  if (accuracy >= 0.7) return 'C';
  if (accuracy >= 0.6) return 'D';
  return 'F';
} 