export enum MathCategory {
  NUMBERS = 'numbers',
  MEASUREMENT = 'measurement',
  DATA = 'data',
  ADDITION = 'addition',
  SUBTRACTION = 'subtraction',
  MULTIPLICATION = 'multiplication',
  DIVISION = 'division',
  FRACTIONS = 'fractions',
  DECIMALS = 'decimals',
  RATIO_PROPORTION = 'ratio-proportion',
  PLACE_VALUE = 'place-value'
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

export interface MathTopic {
  id: string;
  name: string;
  description: string;
  level: number;
  category: MathCategory;
  subTopics: SubTopic[];
}

export interface SubTopic {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3;
  questionTypes: QuestionType[];
}

export interface QuestionType {
  id: string;
  type: 'mcq' | 'numeric' | 'word-problem';
  conceptExplanation: string[];
  remediationStrategy: string;
}

export interface QuestionGenerator {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => Question;
} 