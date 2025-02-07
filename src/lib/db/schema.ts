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
  isStudent: boolean('is_student').notNull().default(false),
  xpPoints: integer('xp_points').notNull().default(0),
  coins: integer('coins').notNull().default(0),
});

export type User = InferSelectModel<typeof user>;

// ==================== Math Learning System ====================
export const mathProblems = pgTable('math_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  question: text('question').notNull(),
  answer: integer('answer').notNull(),
  strand: text('strand').notNull(),
  subStrand: text('sub_strand').notNull(),
  difficulty: integer('difficulty').notNull(),
});

export const strands = pgTable('strands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  level: integer('level').notNull(), // 1-6 for Primary levels
  description: text('description'),
  strand: text('strand').notNull(),
  subStrand: text('sub_strand').notNull(),
  subStrandTopics: json('sub_strand_topics')
    .$type<
      {
        id: string;
        name: string;
        difficulty: number;
        objectives?: string[];
      }[]
    >()
    .notNull(),
});

export const studentProgress = pgTable('student_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  problemId: uuid('problem_id').references(() => mathProblems.id),
  isCorrect: boolean('is_correct').notNull(),
  timeSpent: integer('time_spent'),
  createdAt: timestamp('created_at').defaultNow(),
  subStrandProgress: json('sub_strand_progress').$type<
    {
      subStrand: string;
      level: number;
      questionsAttempted: number;
      correctAnswers: number;
      mistakes: string[];
    }[]
  >(),
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

export const studentAchievements = pgTable(
  'student_achievements',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => user.id),
    achievementId: text('achievement_id')
      .notNull()
      .references(() => achievements.id),
    unlockedAt: timestamp('unlocked_at').notNull(),
  },
  (table) => ({
    pk: primaryKey(table.userId, table.achievementId),
  })
);
// ==================== Practice Sessions ====================
export const practiceSessions = pgTable('practice_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  mode: text('mode').notNull(), // 'practice' or 'test'
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
  totalQuestions: integer('total_questions').notNull(),
  correctAnswers: integer('correct_answers').notNull().default(0),
  averageResponseTime: integer('average_response_time'),
  xpEarned: integer('xp_earned'),
  coinsEarned: integer('coins_earned'),
});
