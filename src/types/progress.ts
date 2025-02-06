import { MathSubStrand } from './math';
import type { InferSelectModel } from 'drizzle-orm';
import { studentProgress } from '@/lib/db/schema';

export type StudentProgress = InferSelectModel<typeof studentProgress>;

export interface TopicProgress {
  topicId: string;
  questionsAttempted: number;
  correctAnswers: number;
  averageScore: number;
  lastAttempted: Date;
  mistakes: string[];
}

export interface UserProgress {
  userId: string;
  category: MathSubStrand;
  difficulty: number;
  correctAnswers: number;
  totalAttempts: number;
  lastAttemptAt: Date;
  mistakes: string[];
}

export interface ProgressUpdate {
  category: MathSubStrand;
  isCorrect: boolean;
  questionId: string;
}
