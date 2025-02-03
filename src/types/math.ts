export enum MathCategory {
  NUMBERS = 'numbers',
  OPERATIONS = 'operations',
  FRACTIONS = 'fractions',
  MEASUREMENT = 'measurement',
  GEOMETRY = 'geometry',
  MONEY = 'money',
  RATIO_PROPORTION = 'ratio_proportion',
  ADVANCED = 'advanced'
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
  category: MathCategory;
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

export interface PracticeSession {
  id: string;
  userId: string;
  topicId: string;
  subTopicId: string;
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  answers: {
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  startedAt: Date;
  completedAt?: Date;
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

