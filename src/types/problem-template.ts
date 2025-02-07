import { MathSubStrand } from './math';

export interface VariableConstraint {
  min: number;
  max: number;
  step?: number;
  exclude?: number[];
}

export interface ProblemContext {
  type: 'word' | 'numeric' | 'algebraic';
  themes: string[]; // e.g., ['fruits', 'shopping', 'sports']
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  prerequisites: string[];
}

export interface ProblemTemplate {
  id: string;
  type: string;
  structure: string; // Question structure with placeholders e.g., "What is {a} + {b}?"
  variables: Record<string, VariableConstraint>;
  answerFormula: string; // e.g., "a + b" or "Math.max(a, b)"
  context?: ProblemContext;
  difficulty: number;
  strand: string;
  subStrand: MathSubStrand;
  skills: Skill[];
  commonMisconceptions: string[];
  explanationTemplate: string[];
  validationRules?: {
    maxResult?: number;
    minResult?: number;
    mustBeWhole?: boolean;
    customValidation?: string; // JavaScript expression for custom validation
  };
}

export interface GeneratedProblem {
  id: string;
  templateId: string;
  type: string;
  question: string;
  variables: Record<string, number>;
  answer: number;
  explanation: string[];
  difficulty: number;
  strand: string;
  subStrand: MathSubStrand;
  skills: string[];
  context?: {
    theme: string;
    substitutions: Record<string, string>;
  };
}

export interface StudentProblemHistory {
  templateId: string;
  attempts: number;
  correctAttempts: number;
  lastAttempted: Date;
  averageResponseTime: number;
  commonMistakes: string[];
  variationsUsed: Record<string, number>[]; // Track which variable combinations were used
}

export interface SkillProgress {
  skillId: string;
  proficiency: number; // 0-1
  lastPracticed: Date;
  totalAttempts: number;
  successRate: number;
  needsReview: boolean;
}
