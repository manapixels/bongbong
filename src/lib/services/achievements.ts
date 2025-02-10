import { db } from '@/lib/db';
import { achievements } from '@/lib/db/schema';
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
  const accuracy = progress.answers / progress.totalProblems;
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
  const existingAchievement = await db
    .select()
    .from(achievements)
    .where(
      and(
        eq(achievements.userId, studentId),
        eq(achievements.id, achievementId)
      )
    )
    .limit(1);

  if (!existingAchievement.length) {
    await db.insert(achievements).values({
      id: achievementId,
      name: achievementId.toLowerCase(),
      type: 'achievement',
      userId: studentId,
      createdAt: new Date(),
      description: 'Achievement',
      requiredValue: 0,
      rewardCoins: 0,
      rewardXP: 0,
    });
  }
}
