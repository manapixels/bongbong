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
import type {
  VariableConstraint,
  ProblemContext,
  Skill,
} from '@/types/problem-template';

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
export const problemTemplates = pgTable('problem_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  structure: text('structure').notNull(),
  variables: json('variables')
    .$type<Record<string, VariableConstraint>>()
    .notNull(),
  answerFormula: text('answer_formula').notNull(),
  context: json('context').$type<ProblemContext>(),
  difficulty: integer('difficulty').notNull(),
  strand: text('strand').notNull(),
  subStrand: text('sub_strand').notNull(),
  skills: json('skills').$type<Skill[]>().notNull(),
  commonMisconceptions: json('common_misconceptions')
    .$type<string[]>()
    .notNull(),
  explanationTemplate: json('explanation_template').$type<string[]>().notNull(),
  validationRules: json('validation_rules'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const mathProblems = pgTable('math_problems', {
  id: uuid('id').primaryKey().defaultRandom(),
  templateId: uuid('template_id').references(() => problemTemplates.id),
  type: text('type').notNull(),
  question: text('question').notNull(),
  variables: json('variables').$type<Record<string, number>>().notNull(),
  answer: integer('answer').notNull(),
  strand: text('strand').notNull(),
  subStrand: text('sub_strand').notNull(),
  difficulty: integer('difficulty').notNull(),
  context: json('context').$type<{
    theme: string;
    substitutions: Record<string, string>;
  }>(),
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

export const studentSkillProgress = pgTable('student_skill_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  skillId: text('skill_id').notNull(),
  proficiency: integer('proficiency').notNull(),
  lastPracticed: timestamp('last_practiced').notNull(),
  totalAttempts: integer('total_attempts').notNull().default(0),
  successRate: integer('success_rate').notNull().default(0),
  needsReview: boolean('needs_review').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const studentProblemHistory = pgTable('student_problem_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => user.id),
  templateId: uuid('template_id').references(() => problemTemplates.id),
  attempts: integer('attempts').notNull().default(0),
  correctAttempts: integer('correct_attempts').notNull().default(0),
  lastAttempted: timestamp('last_attempted').notNull(),
  averageResponseTime: integer('average_response_time').notNull().default(0),
  commonMistakes: json('common_mistakes')
    .$type<string[]>()
    .notNull()
    .default([]),
  variationsUsed: json('variations_used')
    .$type<Record<string, number>[]>()
    .notNull()
    .default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
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
