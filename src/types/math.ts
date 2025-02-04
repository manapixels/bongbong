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

export const MathTopics = [
  // Basic Number Operations
  {
    name: 'Addition',
    category: MathCategory.ADDITION,
    description: 'Learn to add numbers and understand the concept of sum',
    level: 1,
  },
  {
    name: 'Subtraction',
    category: MathCategory.SUBTRACTION,
    description: 'Master the concept of taking away and finding differences',
    level: 1,
  },
  {
    name: 'Multiplication',
    category: MathCategory.MULTIPLICATION,
    description: 'Understanding repeated addition and multiplication tables',
    level: 2,
  },
  {
    name: 'Division',
    category: MathCategory.DIVISION,
    description: 'Learn to share equally and divide numbers',
    level: 2,
  },

  // Number Concepts
  {
    name: 'Place Value',
    category: MathCategory.PLACE_VALUE,
    description: 'Understanding ones, tens, hundreds, and thousands',
    level: 1,
  },
  {
    name: 'Number Sense',
    category: MathCategory.NUMBER_SENSE,
    description: 'Developing number relationships and mental math skills',
    level: 2,
  },

  // Fractions & Decimals
  {
    name: 'Fractions',
    category: MathCategory.FRACTIONS,
    description: 'Understanding parts of a whole and fraction operations',
    level: 3,
  },
  {
    name: 'Decimals',
    category: MathCategory.DECIMALS,
    description: 'Working with decimal numbers and their operations',
    level: 4,
  },

  // Measurement & Geometry
  {
    name: 'Measurement',
    category: MathCategory.MEASUREMENT,
    description: 'Learning about length, mass, volume, and time',
    level: 2,
  },
  {
    name: 'Geometry',
    category: MathCategory.GEOMETRY,
    description: 'Exploring shapes, angles, and spatial relationships',
    level: 3,
  },

  // Advanced Topics
  {
    name: 'Ratio and Proportion',
    category: MathCategory.RATIO_PROPORTION,
    description: 'Understanding relationships between quantities',
    level: 5,
  },
  {
    name: 'Algebra',
    category: MathCategory.ALGEBRA,
    description: 'Introduction to variables and simple equations',
    level: 6,
  },

  // Money & Real World
  {
    name: 'Money Math',
    category: MathCategory.MONEY,
    description: 'Learning about currency, spending, and saving',
    level: 2,
  },
  {
    name: 'Word Problems',
    category: MathCategory.WORD_PROBLEMS,
    description: 'Applying math concepts to real-world situations',
    level: 3,
  },
] as const; 


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
