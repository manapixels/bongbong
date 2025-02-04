import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

// ==================== User Management ====================
export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

// ==================== Math Learning System ====================
export const mathProblems = pgTable('math_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  question: text('question').notNull(),
  answer: integer('answer').notNull(),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull(),
});

export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
});

export const topics = pgTable('topics', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  category: text('category').notNull(), // Will store MathCategory values
  description: text('description'),
  level: integer('level').notNull(), // 1-6 for Primary levels
});

export const studentProgress = pgTable('student_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  studentId: uuid('student_id').references(() => students.id),
  problemId: uuid('problem_id').references(() => mathProblems.id),
  isCorrect: boolean('is_correct').notNull(),
  timeSpent: integer('time_spent'),
  createdAt: timestamp('created_at').defaultNow(),
  topicProgress: json('topic_progress').$type<{
    topicId: string;
    questionsAttempted: number;
    correctAnswers: number;
    mistakes: string[];
  }[]>()
});

// ==================== Achievement System ====================
export const achievements = pgTable('achievements', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  requiredValue: integer('required_value').notNull(),
  type: text('type').notNull(), // 'streak', 'total_correct', 'speed', etc.
  rewardCoins: integer('reward_coins').notNull(),
  rewardXP: integer('reward_xp').notNull(),
});

export const studentAchievements = pgTable('student_achievements', {
  studentId: text('student_id').notNull().references(() => students.id),
  achievementId: text('achievement_id').notNull().references(() => achievements.id),
  unlockedAt: timestamp('unlocked_at').notNull(),
}, (table) => ({
  pk: primaryKey(table.studentId, table.achievementId)
}));

// ==================== Practice Sessions ====================
export const practiceSession = pgTable('practice_sessions', {
  id: text('id').primaryKey(),
  studentId: text('student_id').notNull().references(() => students.id),
  mode: text('mode').notNull(), // 'practice' or 'test'
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').notNull().default(0),
  averageResponseTime: integer('average_response_time'),
  xpEarned: integer('xp_earned'),
  coinsEarned: integer('coins_earned'),
});