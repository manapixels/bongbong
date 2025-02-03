import { MathCategory } from './math';

export interface StudentProgress {
  id: string;
  studentId: string;
  totalProblems: number;
  correctAnswers: number;
  streaks: number;
  topicProgress: TopicProgress[] | null;
  updatedAt: Date;
}


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
  category: MathCategory;
  difficulty: number;
  correctAnswers: number;
  totalAttempts: number;
  lastAttemptAt: Date;
  mistakes: string[];
}

export interface ProgressUpdate {
  category: MathCategory;
  isCorrect: boolean;
  questionId: string;
} 