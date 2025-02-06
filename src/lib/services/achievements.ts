import { db } from '@/lib/db';
import { achievements, studentAchievements } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function checkAndUnlockAchievements(
  studentId: string,
  progress: any
): Promise<string[]> {
  const unlockedAchievements: string[] = [];

  // Check for speed achievements
  if (progress.averageResponseTime < 5) {
    await unlockAchievement(studentId, 'SPEED_DEMON');
    unlockedAchievements.push('Speed Demon');
  }

  // Check for accuracy achievements
  const accuracy = progress.correctAnswers / progress.totalProblems;
  if (accuracy > 0.9 && progress.totalProblems > 50) {
    await unlockAchievement(studentId, 'MATH_MASTER');
    unlockedAchievements.push('Math Master');
  }

  // Check for streak achievements
  if (progress.streaks >= 10) {
    await unlockAchievement(studentId, 'STREAK_MASTER');
    unlockedAchievements.push('Streak Master');
  }

  return unlockedAchievements;
}

async function unlockAchievement(studentId: string, achievementId: string) {
  const existingAchievement = await db.query.studentAchievements.findFirst({
    where: eq(studentAchievements.userId, studentId),
  });

  if (!existingAchievement) {
    await db.insert(studentAchievements).values({
      userId: studentId,
      achievementId: achievementId,
      unlockedAt: new Date(),
    });
  }
}
