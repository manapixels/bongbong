import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  boolean,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { getAllTopicIds } from '../utils/math';

// ==================== User Management ====================
export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }),
  isStudent: boolean('is_student').notNull().default(false),
  xpPoints: integer('xp_points').notNull().default(0),
  coins: integer('coins').notNull().default(0),
  preferences: json('preferences')
    .$type<{
      difficulty: number;
      topicsEnabled: string[];
    }>()
    .default({
      difficulty: 1,
      topicsEnabled: getAllTopicIds().map(
        (topic) => `${topic.subStrand}-${topic.level}`
      ),
    }),
});

export type User = InferSelectModel<typeof user>;

// ==================== Learning System ====================

export const subjectEnum = pgEnum('subject', [
  'english',
  'chinese',
  'science',
  'mathematics',
]);

export const mathQuestions = pgTable('math_questions', {
  // Default question fields
  id: uuid('id').primaryKey().defaultRandom(),
  subject: subjectEnum('subject').notNull().default('mathematics'),
  type: text('type'),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  explanation: json('explanation').$type<string[]>().notNull(),
  difficulty: integer('difficulty').notNull(),

  // Math-specific question fields
  strand: text('strand').notNull(),
  subStrand: text('sub_strand').notNull(),
  answerFormula: text('answer_formula').notNull(),
  variables: json('variables').$type<Record<string, string>>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
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
        skills: {
          id: string;
          description: string;
          questions: {
            question: string;
            answer: number | string | null;
            explanation: string[];
            variables: {
              questionText: string;
              min: number;
              max: number;
            }[];
          }[];
        }[];
      }[]
    >()
    .notNull(),
});

// ==================== Achievement System ====================
export const progress = pgTable('progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  questionId: uuid('question_id').references(() => mathQuestions.id),
  isCorrect: boolean('is_correct').notNull(),
  timeSpent: integer('time_spent'),
  createdAt: timestamp('created_at').defaultNow(),
  subStrandProgress: json('sub_strand_progress').$type<
    {
      subStrand: string;
      level: number;
      questionsAttempted: number;
      correctAnswers: number;
      lastAttempted: Date;
      mistakes: string[];
    }[]
  >(),
});
export const achievements = pgTable('achievements', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => user.id),
  name: text('name').notNull(),
  description: text('description').notNull(),
  requiredValue: integer('required_value').notNull(),
  type: text('type').notNull(), // 'streak', 'total_correct', 'speed', etc.
  rewardCoins: integer('reward_coins').notNull(),
  rewardXP: integer('reward_xp').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

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
