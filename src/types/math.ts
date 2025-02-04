import type { InferSelectModel } from 'drizzle-orm';
import { mathProblems, practiceSession as dbPracticeSession } from '@/lib/db/schema';

export enum MathCategory {
  // Basic Number Operations
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
  MULTIPLICATION = 'multiplication',
  DIVISION = 'division',
  
  // Number Concepts
  PLACE_VALUE = 'place_value',
  NUMBER_SENSE = 'number_sense',
  
  // Fractions & Decimals
  FRACTIONS = 'fractions',
  DECIMALS = 'decimals',
  
  // Measurement & Geometry
  MEASUREMENT = 'measurement',
  GEOMETRY = 'geometry',
  
  // Advanced Topics
  RATIO_PROPORTION = 'ratio_proportion',
  ALGEBRA = 'algebra',
  
  // Money & Real World
  MONEY = 'money',
  WORD_PROBLEMS = 'word_problems'
}

export type QuestionType = 'mcq' | 'numeric' | 'word-problem';

export interface QuestionTypeConfig {
  id: string;
  type: QuestionType;
  conceptExplanation: string[];
  remediationStrategy?: string;
}

export interface SubTopic {
  id: string;
  name: string;
  difficulty: number; // 1-4 scale
  questionTypes: QuestionTypeConfig[];
}

export interface MathTopic {
  id: string;
  name: string;
  description: string;
  level: number; // 1-6 for Primary 1-6
  categories: MathCategory[];
  subTopics: SubTopic[];
}

export interface PracticeQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // For MCQ questions
  correctAnswer: string | number;
  explanation: string[];
  difficulty: number;
  topicId: string;
  subTopicId: string;
}

export type Problem = InferSelectModel<typeof mathProblems>;

export type DBPracticeSession = InferSelectModel<typeof dbPracticeSession>;

export interface PracticeSession extends DBPracticeSession {
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  answers: {
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export interface RemediationExample {
  problem: string;
  solution: string;
  explanation: string[];
}

export interface RemediationStrategy {
  type: 'visualization' | 'practice' | 'concept';
  steps: string[];
  examples: RemediationExample[];
}

export interface Solution {
  steps: string[];
  explanation: string;
}

export interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  difficulty: number;
  category: MathCategory;
  solution: {
    steps: string[];
    explanation: string;
  };
  hints: string[];
  options?: string[];
}

export interface QuestionGenerator {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => Question;
}

export interface StudentProfile {
  id: string;
  preferences: {
    difficulty: string;
    topicsEnabled: string[];
  };
}

export interface Progress {
  totalProblems: number;
  correctAnswers: number;
  topicStats: Record<string, { total: number; correct: number }>;
} 

