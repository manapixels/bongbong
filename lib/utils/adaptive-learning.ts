interface ProblemStats {
  attempts: number;
  success: number;
  averageTime: number;
}

interface StudentStats {
  categoryProgress: Record<string, ProblemStats>;
  level: number;
  recentPerformance: boolean[];
}

export function calculateDifficulty(stats: StudentStats, category: string): number {
  const categoryStats = stats.categoryProgress[category];
  if (!categoryStats) return 1;

  // Base difficulty from success rate
  const successRate = categoryStats.success / categoryStats.attempts;
  let difficulty = stats.level;

  // Adjust based on success rate
  if (successRate > 0.8) {
    difficulty += 1;
  } else if (successRate < 0.6) {
    difficulty = Math.max(1, difficulty - 1);
  }

  // Adjust based on recent performance
  const recentSuccessRate = stats.recentPerformance
    .slice(-5)
    .filter(Boolean).length / 5;
  if (recentSuccessRate > 0.8) {
    difficulty += 1;
  }

  // Cap difficulty based on level
  return Math.min(Math.max(1, difficulty), stats.level + 2);
}

export function findWeakAreas(problems: any[]): string[] {
  const categoryStats: Record<string, ProblemStats> = {};

  problems.forEach(problem => {
    if (!categoryStats[problem.category]) {
      categoryStats[problem.category] = {
        attempts: 0,
        success: 0,
        averageTime: 0
      };
    }
    categoryStats[problem.category].attempts++;
    if (problem.isCorrect) {
      categoryStats[problem.category].success++;
    }
    categoryStats[problem.category].averageTime += problem.timeSpent;
  });

  return Object.entries(categoryStats)
    .filter(([_, stats]) => stats.success / stats.attempts < 0.7)
    .map(([category]) => category);
}

export function generateRecommendations(stats: any): string[] {
  const recommendations: string[] = [];
  const weakAreas = findWeakAreas(stats.problems);

  if (weakAreas.length > 0) {
    recommendations.push(
      `Focus on practicing ${weakAreas.join(', ')} to improve your skills.`
    );
  }

  if (stats.averageTime > 15) {
    recommendations.push(
      'Try to improve your speed by practicing mental calculation techniques.'
    );
  }

  if (stats.streaks < 3) {
    recommendations.push(
      'Work on maintaining longer streaks to build confidence and consistency.'
    );
  }

  return recommendations;
} 