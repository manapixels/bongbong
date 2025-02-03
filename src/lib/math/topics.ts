import { MathTopic, MathCategory } from '@/types/math';

export const MATH_TOPICS: MathTopic[] = [
  // Primary 1
  {
    id: 'p1-numbers',
    name: 'Numbers to 20',
    description: 'Learn about numbers up to 20',
    level: 1,
    category: MathCategory.NUMBERS,
    subTopics: [
      {
        id: 'numbers-to-20',
        name: 'Numbers to 20',
        difficulty: 1,
        questionTypes: [
          {
            id: 'counting-20',
            type: 'numeric',
            conceptExplanation: [
              "Count objects up to 20",
              "Recognize and write numbers up to 20",
              "Compare numbers up to 20"
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p1-operations',
    name: 'Addition and Subtraction',
    description: 'Basic operations within 20',
    level: 1,
    category: MathCategory.OPERATIONS,
    subTopics: [
      {
        id: 'addition-within-10',
        name: 'Addition and Subtraction Within 10',
        difficulty: 1,
        questionTypes: [
          {
            id: 'basic-addition-10',
            type: 'numeric',
            conceptExplanation: [
              "Add numbers within 10",
              "Use number bonds",
              "Understand addition as combining sets"
            ]
          }
        ]
      },
      {
        id: 'addition-within-20',
        name: 'Addition Within 20',
        difficulty: 1,
        questionTypes: [
          {
            id: 'basic-addition-20',
            type: 'numeric',
            conceptExplanation: ["Add numbers within 20"]
          }
        ]
      },
      {
        id: 'subtraction-within-20',
        name: 'Subtraction Within 20',
        difficulty: 1,
        questionTypes: [
          {
            id: 'basic-subtraction-20',
            type: 'numeric',
            conceptExplanation: ["Subtract numbers within 20"]
          }
        ]
      }
    ]
  },
  // Primary 2
  {
    id: 'p2-operations',
    name: 'Advanced Operations',
    description: 'Multiplication and division concepts',
    level: 2,
    category: MathCategory.OPERATIONS,
    subTopics: [
      {
        id: 'multiplication',
        name: 'Multiplication',
        difficulty: 2,
        questionTypes: [
          {
            id: 'basic-multiplication',
            type: 'numeric',
            conceptExplanation: ["Master multiplication with basic numbers"]
          }
        ]
      },
      {
        id: 'division',
        name: 'Division',
        difficulty: 2,
        questionTypes: [
          {
            id: 'basic-division',
            type: 'word-problem',
            conceptExplanation: ["Division made easy: Story-based approach"]
          }
        ]
      }
    ]
  },
  {
    id: 'p2-fractions',
    name: 'Fractions',
    description: 'Introduction to fractions',
    level: 2,
    category: MathCategory.FRACTIONS,
    subTopics: [
      {
        id: 'fractions-1',
        name: 'Fractions 1',
        difficulty: 2,
        questionTypes: [
          {
            id: 'basic-fractions',
            type: 'mcq',
            conceptExplanation: ["Understanding basic fractions"]
          }
        ]
      }
    ]
  },
  // Primary 3
  {
    id: 'p3-measurements',
    name: 'Measurements',
    description: 'Understanding different measurements',
    level: 3,
    category: MathCategory.MEASUREMENT,
    subTopics: [
      {
        id: 'mass',
        name: 'Mass',
        difficulty: 2,
        questionTypes: [
          {
            id: 'mass-conversion',
            type: 'numeric',
            conceptExplanation: ["Converting between units of mass"]
          }
        ]
      },
      {
        id: 'length-mass-volume',
        name: 'Length, Mass and Volume',
        difficulty: 2,
        questionTypes: [
          {
            id: 'measurement-conversion',
            type: 'numeric',
            conceptExplanation: ["Converting between different units of measurement"]
          }
        ]
      }
    ]
  },
  {
    id: 'p3-money',
    name: 'Money',
    description: 'Working with money',
    level: 3,
    category: MathCategory.MONEY,
    subTopics: [
      {
        id: 'money-operations',
        name: 'Money',
        difficulty: 2,
        questionTypes: [
          {
            id: 'money-calculations',
            type: 'word-problem',
            conceptExplanation: ["Solving problems involving money"]
          }
        ]
      }
    ]
  },
  // Primary 4
  {
    id: 'p4-geometry',
    name: 'Area and Perimeter',
    description: 'Understanding geometric measurements',
    level: 4,
    category: MathCategory.GEOMETRY,
    subTopics: [
      {
        id: 'area-perimeter-1',
        name: 'Area and Perimeter 1',
        difficulty: 3,
        questionTypes: [
          {
            id: 'basic-geometry',
            type: 'numeric',
            conceptExplanation: ["Calculate area and perimeter of basic shapes"]
          }
        ]
      }
    ]
  },
  // Primary 5
  {
    id: 'p5-ratio',
    name: 'Ratio',
    description: 'Understanding ratios and proportions',
    level: 5,
    category: MathCategory.RATIO_PROPORTION,
    subTopics: [
      {
        id: 'ratio-intro',
        name: 'Ratio: Introduction',
        difficulty: 3,
        questionTypes: [
          {
            id: 'basic-ratio',
            type: 'word-problem',
            conceptExplanation: ["Understanding basic ratio concepts"]
          }
        ]
      },
      {
        id: 'table-rates',
        name: 'Table Rates',
        difficulty: 3,
        questionTypes: [
          {
            id: 'rates-calculation',
            type: 'numeric',
            conceptExplanation: ["Working with rates in tabular form"]
          }
        ]
      }
    ]
  },
  // Primary 6
  {
    id: 'p6-advanced-topics',
    name: 'Advanced Topics',
    description: 'PSLE preparation topics',
    level: 6,
    category: MathCategory.ADVANCED,
    subTopics: [
      {
        id: 'pie-charts',
        name: 'Fundamentals of Pie Chart',
        difficulty: 4,
        questionTypes: [
          {
            id: 'pie-chart-problems',
            type: 'mcq',
            conceptExplanation: ["Understanding and interpreting pie charts"]
          }
        ]
      },
      {
        id: 'number-patterns',
        name: 'Number Patterns',
        difficulty: 4,
        questionTypes: [
          {
            id: 'pattern-recognition',
            type: 'numeric',
            conceptExplanation: [
              "Grouping & Common Difference",
              "Identifying and continuing number patterns"
            ]
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