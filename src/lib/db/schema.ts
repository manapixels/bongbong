import type { InferSelectModel } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  json,
  uuid,
  text,
  primaryKey,
  foreignKey,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { MathCategory } from '@/lib/types/math';

export const user = pgTable('User', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }),
});

export type User = InferSelectModel<typeof user>;

export const chat = pgTable('Chat', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  createdAt: timestamp('createdAt').notNull(),
  title: text('title').notNull(),
  userId: uuid('userId')
    .notNull()
    .references(() => user.id),
  visibility: varchar('visibility', { enum: ['public', 'private'] })
    .notNull()
    .default('private'),
});

export type Chat = InferSelectModel<typeof chat>;

export const message = pgTable('Message', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  chatId: uuid('chatId')
    .notNull()
    .references(() => chat.id),
  role: varchar('role').notNull(),
  content: json('content').notNull(),
  createdAt: timestamp('createdAt').notNull(),
});

export type Message = InferSelectModel<typeof message>;

export const vote = pgTable(
  'Vote',
  {
    chatId: uuid('chatId')
      .notNull()
      .references(() => chat.id),
    messageId: uuid('messageId')
      .notNull()
      .references(() => message.id),
    isUpvoted: boolean('isUpvoted').notNull(),
  },
  (table) => ({
    pk: primaryKey({ 
      columns: [table.chatId, table.messageId] }),
  }),
);

export type Vote = InferSelectModel<typeof vote>;

export const document = pgTable(
  'Document',
  {
    id: uuid('id').notNull().defaultRandom(),
    createdAt: timestamp('createdAt').notNull(),
    title: text('title').notNull(),
    content: text('content'),
    kind: varchar('kind', { enum: ['text', 'code'] })
      .notNull()
      .default('text'),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
  },
  (table) => ({
    pk: primaryKey([table.id, table.createdAt])
  }),
);

export type Document = InferSelectModel<typeof document>;

export const suggestion = pgTable(
  'Suggestion',
  {
    id: uuid('id').notNull().defaultRandom(),
    documentId: uuid('documentId').notNull(),
    documentCreatedAt: timestamp('documentCreatedAt').notNull(),
    originalText: text('originalText').notNull(),
    suggestedText: text('suggestedText').notNull(),
    description: text('description'),
    isResolved: boolean('isResolved').notNull().default(false),
    userId: uuid('userId')
      .notNull()
      .references(() => user.id),
    createdAt: timestamp('createdAt').notNull(),
  },
  (table) => ({
    pk: primaryKey([table.id]),
    documentRef: foreignKey({
      columns: [table.documentId, table.documentCreatedAt],
      foreignColumns: [document.id, document.createdAt]
    })
  }),
);

export type Suggestion = InferSelectModel<typeof suggestion>;

export const students = pgTable('students', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').notNull().references(() => user.id),
  level: integer('level').notNull().default(1),
  weakAreas: json('weak_areas').$type<string[]>().default([]),
  strengths: json('strengths').$type<string[]>().default([]),
  preferredLearningStyle: text('preferred_learning_style').default('numeric'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  xp: integer('xp').notNull().default(0),
  coins: integer('coins').notNull().default(0),
  achievements: json('achievements').$type<string[]>().default([]),
  lastLoginStreak: integer('last_login_streak').notNull().default(0),
  lastLoginDate: timestamp('last_login_date'),
  visualAidsEnabled: boolean('visual_aids_enabled').notNull().default(true),
  soundEffectsEnabled: boolean('sound_effects_enabled').notNull().default(true),
});

export const mathProblems = pgTable('math_problems', {
  id: text('id').primaryKey(),
  studentId: text('student_id').notNull().references(() => students.id),
  question: text('question').notNull(),
  answer: integer('answer').notNull(),
  category: text('category').notNull(),
  difficulty: integer('difficulty').notNull(),
  attemptedAt: timestamp('attempted_at').defaultNow(),
  isCorrect: boolean('is_correct').notNull(),
  timeSpent: integer('time_spent').notNull(),
});

export const studentProgress = pgTable('student_progress', {
  id: text('id').primaryKey(),
  studentId: text('student_id').notNull().references(() => students.id),
  totalProblems: integer('total_problems').notNull().default(0),
  correctAnswers: integer('correct_answers').notNull().default(0),
  streaks: integer('streaks').notNull().default(0),
  categoryProgress: json('category_progress').$type<Record<string, number>>().default({}),
  updatedAt: timestamp('updated_at').defaultNow(),
});

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

export type Student = InferSelectModel<typeof students>;
export type MathProblem = InferSelectModel<typeof mathProblems>;
export type StudentProgress = InferSelectModel<typeof studentProgress>;
export type Achievement = InferSelectModel<typeof achievements>;
export type StudentAchievement = InferSelectModel<typeof studentAchievements>;
export type PracticeSession = InferSelectModel<typeof practiceSession>;
