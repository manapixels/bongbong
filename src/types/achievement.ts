import type { InferSelectModel } from 'drizzle-orm';
import { achievements, studentAchievements } from '@/lib/db/schema';

// Base types from schema
export type Achievement = InferSelectModel<typeof achievements>;
export type StudentAchievement = InferSelectModel<typeof studentAchievements>;

export type AchievementType = 'streak' | 'total_correct' | 'speed';

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  requiredValue: number;
  percentComplete: number;
}

export interface UserAchievement extends Achievement {
  unlockedAt?: Date;
  progress?: AchievementProgress;
}
