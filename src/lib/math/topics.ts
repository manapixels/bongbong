import { MathTopic, MathCategory } from '@/components/math/topics';

export const MATH_TOPICS: MathTopic[] = [
  {
    id: 'numbers-to-100000',
    name: 'Numbers to 100,000',
    description: 'Learn about numbers up to 100,000',
    level: 3,
    category: MathCategory.NUMBERS,
    subTopics: [
      {
        id: 'place-values',
        name: 'Place Values',
        difficulty: 1,
        questionTypes: [
          {
            id: 'identify-place-value',
            type: 'mcq',
            conceptExplanation: [
              "In our number system, each digit's position represents a value:",
              "- Ones (rightmost digit)",
              "- Tens (second from right)",
              "- Hundreds (third from right)",
              "- Thousands (fourth from right)",
              "- Ten thousands (fifth from right)"
            ],
            remediationStrategy: "visualPlaceValueChart"
          }
        ]
      }
    ]
  },
  {
    id: 'whole-numbers-operations',
    name: 'Operations with Whole Numbers',
    description: 'Learn about operations with whole numbers',
    level: 2,
    category: MathCategory.NUMBERS,
    subTopics: [
      {
        id: 'addition-within-1000',
        name: 'Addition within 1000',
        difficulty: 1,
        questionTypes: [
          {
            id: 'basic-addition',
            type: 'numeric',
            conceptExplanation: [
              "When adding numbers:",
              "1. Align the numbers by place value",
              "2. Start from the right (ones column)",
              "3. Add each column",
              "4. Carry over when sum is 10 or more"
            ],
            remediationStrategy: "columnAddition"
          },
          {
            id: 'word-problems-addition',
            type: 'word-problem',
            conceptExplanation: [
              "For addition word problems:",
              "1. Identify what is being combined/added",
              "2. Look for keywords like 'total', 'sum', 'altogether'",
              "3. Write the numbers and add"
            ],
            remediationStrategy: "partWholeModel"
          }
        ]
      }
    ]
  },
  {
    id: 'fractions',
    name: 'Fractions',
    description: 'Learn about fractions',
    level: 4,
    category: MathCategory.FRACTIONS,
    subTopics: [
      {
        id: 'equivalent-fractions',
        name: 'Equivalent Fractions',
        difficulty: 2,
        questionTypes: [
          {
            id: 'identify-equivalent',
            type: 'mcq',
            conceptExplanation: [
              "Equivalent fractions are different ways to express the same value:",
              "1. Multiply/divide both numerator and denominator by same number",
              "2. Use visual models to see equal parts",
              "3. Compare using common denominators"
            ],
            remediationStrategy: "fractionStrips"
          }
        ]
      }
    ]
  },
  {
    id: 'ratio-proportion',
    name: 'Ratio and Proportion',
    description: 'Learn about ratio and proportion',
    level: 5,
    category: MathCategory.RATIO_PROPORTION,
    subTopics: [
      {
        id: 'bar-model-ratio',
        name: 'Bar Model for Ratio',
        difficulty: 2,
        questionTypes: [
          {
            id: 'ratio-word-problems',
            type: 'word-problem',
            conceptExplanation: [
              "Using bar models for ratio problems:",
              "1. Draw equal bars for each part of ratio",
              "2. Label known values",
              "3. Find value of one unit",
              "4. Solve for unknown values"
            ],
            remediationStrategy: "barModelVisualization"
          }
        ]
      }
    ]
  }
];

export interface RemediationStrategy {
  type: 'visualization' | 'practice' | 'concept';
  steps: string[];
  examples: {
    problem: string;
    solution: string;
    explanation: string[];
  }[];
}

export const REMEDIATION_STRATEGIES: Record<string, RemediationStrategy> = {
  barModelVisualization: {
    type: 'visualization',
    steps: [
      "1. Read the problem carefully and identify the ratio relationship",
      "2. Draw bars of equal length for each part",
      "3. Label the known values",
      "4. Divide to find the unit value",
      "5. Multiply to find the answer"
    ],
    examples: [
      {
        problem: "The ratio of boys to girls in a class is 3:2. If there are 30 students in total, how many are boys?",
        solution: "18 boys",
        explanation: [
          "1. Total parts in ratio = 3 + 2 = 5 parts",
          "2. Each part = 30 ÷ 5 = 6 students",
          "3. Boys = 3 parts = 3 × 6 = 18 boys"
        ]
      }
    ]
  },
  partWholeModel: {
    type: 'visualization',
    steps: [
      "1. Identify the whole (total)",
      "2. Identify the parts",
      "3. Draw rectangles to represent parts",
      "4. Label known values",
      "5. Find unknown values"
    ],
    examples: [
      {
        problem: "John has 12 red marbles and 8 blue marbles. How many marbles does he have in total?",
        solution: "20 marbles",
        explanation: [
          "1. Draw rectangle for red marbles (12)",
          "2. Draw rectangle for blue marbles (8)",
          "3. Whole = 12 + 8 = 20 marbles"
        ]
      }
    ]
  }
};

export interface QuestionGenerator {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    question: string;
    answer: number | string;
    explanation: string[];
    visualAid?: string;
    hints: string[];
  };
}

export const generateSimilarQuestion = (
  topic: string,
  difficulty: number,
  previousMistakes: string[]
): {
  question: string;
  solution: string;
  conceptReview: string[];
  visualAid?: string;
} => {
  // Implementation would generate questions based on specific topic patterns
  // and adjust difficulty/focus based on previous mistakes
  return {
    question: "",
    solution: "",
    conceptReview: []
  };
}; 