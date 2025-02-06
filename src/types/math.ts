import type { InferSelectModel } from 'drizzle-orm';
import {
  mathProblems,
  practiceSessions as dbPracticeSessions,
} from '@/lib/db/schema';

export const enum MathStrand {
  NUMBER_AND_ALGEBRA = 'number-and-algebra',
  MEASUREMENT_AND_GEOMETRY = 'measurement-and-geometry',
  STATISTICS = 'statistics',
}

export const enum MathSubStrand {
  // Number and Algebra sub-strands
  WHOLE_NUMBERS = 'whole-numbers',
  MONEY = 'money',
  FRACTIONS = 'fractions',
  DECIMALS = 'decimals',
  PERCENTAGE = 'percentage',
  RATIO = 'ratio',
  ALGEBRA = 'algebra',

  // Measurement and Geometry sub-strands
  MEASUREMENT = 'measurement',
  GEOMETRY = 'geometry',
  AREA_AND_VOLUME = 'area-and-volume',

  // Statistics sub-strands
  DATA_REPRESENTATION_AND_INTERPRETATION = 'data-representation-and-interpretation',
  DATA_ANALYSIS = 'data-analysis',
  RATE = 'rate',
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
  objectives?: string[];
}

export interface MathTopic {
  id: string;
  name: string;
  level: number; // 1-6 for Primary 1-6
  strand: MathStrand;
  subStrand: MathSubStrand;
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

export type DBPracticeSession = InferSelectModel<typeof dbPracticeSessions>;

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

export const REMEDIATION_STRATEGIES: Record<string, RemediationStrategy> = {
  barModelVisualization: {
    type: 'visualization',
    steps: [
      '1. Read the problem carefully and identify the ratio relationship',
      '2. Draw bars of equal length for each part',
      '3. Label the known values',
      '4. Divide to find the unit value',
      '5. Multiply to find the answer',
    ],
    examples: [
      {
        problem:
          'The ratio of boys to girls in a class is 3:2. If there are 30 students in total, how many are boys?',
        solution: '18 boys',
        explanation: [
          '1. Total parts in ratio = 3 + 2 = 5 parts',
          '2. Each part = 30 ÷ 5 = 6 students',
          '3. Boys = 3 parts = 3 × 6 = 18 boys',
        ],
      },
    ],
  },
  partWholeModel: {
    type: 'visualization',
    steps: [
      '1. Identify the whole (total)',
      '2. Identify the parts',
      '3. Draw rectangles to represent parts',
      '4. Label known values',
      '5. Find unknown values',
    ],
    examples: [
      {
        problem:
          'John has 12 red marbles and 8 blue marbles. How many marbles does he have in total?',
        solution: '20 marbles',
        explanation: [
          '1. Draw rectangle for red marbles (12)',
          '2. Draw rectangle for blue marbles (8)',
          '3. Whole = 12 + 8 = 20 marbles',
        ],
      },
    ],
  },
};

export interface Solution {
  steps: string[];
  explanation: string;
}

export interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  difficulty: number;
  category: MathSubStrand;
  solution: {
    steps: string[];
    explanation: string;
  };
  hints: string[];
  options?: string[];
}

export interface QuestionGenerator {
  generateQuestion: (
    difficulty: number,
    previousMistakes: string[]
  ) => Question;
  generateSimilarQuestion: (
    originalQuestion: Question,
    variation?: 'easier' | 'harder' | 'same'
  ) => Question;
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

export const MATH_TOPICS: MathTopic[] = [
  // PRIMARY 1
  {
    id: 'p1-whole-numbers',
    name: 'Whole Numbers',
    level: 1,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'numbers-to-100',
        name: 'Numbers up to 100',
        difficulty: 1,
        objectives: [
          'Counting to tell the number of objects in a given set',
          'Number notation, representations and place values (tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing the number of objects in two or more sets',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
          'Ordinal numbers (first, second, up to tenth) and symbols (1st, 2nd, 3rd, etc.)',
        ],
      },
      {
        id: 'addition-and-subtraction',
        name: 'Addition and Subtraction',
        difficulty: 1,
        objectives: [
          'Concepts of addition and subtraction',
          'Use of +, – and =',
          'Relationship between addition and subtraction',
          'Adding more than two 1-digit numbers',
          'Adding and subtracting within 100',
          'Mental calculation involving addition and subtraction within 20',
          'Mental calculation involving addition and subtraction of a 2-digit number and ones without renaming',
          'Mental calculation involving addition and subtraction of a 2-digit number and tens',
        ],
      },
      {
        id: 'multiplication',
        name: 'Multiplication',
        difficulty: 1,
        objectives: [
          'Concepts of multiplication',
          'Use of ×',
          'Multiplying within 40',
        ],
      },
      {
        id: 'division',
        name: 'Division',
        difficulty: 1,
        objectives: ['Concepts of division', 'Dividing within 20'],
      },
    ],
  },
  {
    id: 'p1-money',
    name: 'Money',
    level: 1,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subTopics: [
      {
        id: 'counting-money',
        name: 'Counting Money',
        difficulty: 1,
        objectives: [
          'Counting amount of money in cents up to $1',
          'Counting amount of money in dollars up to $100',
        ],
      },
    ],
  },
  {
    id: 'p1-length',
    name: 'Length',
    level: 1,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subTopics: [
      {
        id: 'measuring-of-length',
        name: 'Measuring of Length',
        difficulty: 1,
        objectives: [
          'Measuring length in centimetres',
          'Use of abbreviation cm',
          'Comparing and ordering lengths in cm',
          'Measuring and drawing a line segment to the nearest cm',
        ],
      },
      {
        id: 'measurement-of-time',
        name: 'Measurement of Time',
        difficulty: 1,
        objectives: [
          'Telling time to 5 minutes',
          'Use of "am" and "pm"',
          'Use of abbreviations h and min',
          'Duration of one hour/half hour',
        ],
      },
    ],
  },
  {
    id: 'p1-geometry',
    name: 'Geometry',
    level: 1,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'geometry-2d-shapes',
        name: 'Geometry 2D Shapes',
        difficulty: 1,
        objectives: [
          'Identifying, naming, describing and classifying 2D shape (rectangle)',
          'Identifying, naming, describing and classifying 2D shape (square)',
          'Identifying, naming, describing and classifying 2D shape (triangle)',
          'Identifying, naming, describing and classifying 2D shape (circle)',
          'Identifying, naming, describing and classifying 2D shape (half circle)',
          'Identifying, naming, describing and classifying 2D shape (quarter circle)',
          'Forming different 2D figures with rectangle, square, triangle, circle, half circle and quarter circle',
          'Identifying the 2D shapes that make up a given figure',
          'Copying figures on dot grid or square grid',
        ],
      },
    ],
  },
  {
    id: 'p1-data-representation-and-interpretation',
    name: 'Data Representation and Interpretation',
    level: 1,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subTopics: [
      {
        id: 'picture-graphs',
        name: 'Picture Graphs',
        difficulty: 1,
        objectives: ['Reading and interpreting data from picture graphs'],
      },
    ],
  },
  // PRIMARY 2
  {
    id: 'p2-whole-numbers',
    name: 'Whole Numbers',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'numbers-to-1000',
        name: 'Numbers up to 1000',
        difficulty: 2,
        objectives: [
          'Counting in tens/hundreds',
          'Number notation, representations and place values (hundreds, tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
          'Odd and even numbers',
        ],
      },
      {
        id: 'whole-numbers-addition-and-subtraction',
        name: 'Whole Numbers Addition and Subtraction',
        difficulty: 2,
        objectives: [
          'Addition and subtraction algorithms (up to 3 digits)',
          'Mental calculation involving addition and subtraction of a 3-digit number and ones/tens/hundreds',
        ],
      },
      {
        id: 'whole-numbers-multiplication-and-division',
        name: 'Whole Numbers Multiplication and Division',
        difficulty: 2,
        objectives: [
          'Multiplication tables of 2, 3, 4, 5 and 10',
          'Use of ÷ symbol',
          'Relationship between multiplication and division',
          'Multiplying and dividing within the multiplication tables',
          'Mental calculation involving multiplication and division',
        ],
      },
    ],
  },
  {
    id: 'p2-fractions',
    name: 'Fractions',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subTopics: [
      {
        id: 'fraction-of-a-whole',
        name: 'Fraction of a Whole',
        difficulty: 2,
        objectives: [
          'Fraction as part of a whole',
          'Notation and representations of fractions',
          'Comparing and ordering unitfractions with denominators not exceeding 12',
          'Comparing and ordering like fractions with denominators not exceeding 12',
        ],
      },
      {
        id: 'fraction-addition-and-subtraction',
        name: 'Fraction Addition and Subtraction',
        difficulty: 2,
        objectives: [
          'Adding and subtracting like fractions within one whole with denominators of given fractions not exceeding 12',
        ],
      },
    ],
  },
  {
    id: 'p2-money',
    name: 'Money',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subTopics: [
      {
        id: 'money-operations',
        name: 'Money Operations',
        difficulty: 2,
        objectives: [
          'Counting amount of money in dollars and cents',
          'Reading and writing money in decimal notation',
          'Comparing two or three amounts of money',
          'Converting money in decimal notation to cents only, and vice versa',
        ],
      },
    ],
  },
  {
    id: 'p2-measurement',
    name: 'Measurement',
    level: 2,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subTopics: [
      {
        id: 'length-mass-and-volume',
        name: 'Length, Mass and Volume',
        difficulty: 2,
        objectives: [
          'Measuring length in metres',
          'Measuring mass in kilograms/grams',
          'Measuring volume of liquid in litres',
          'Using appropriate units of measurement and abbreviations (m, g, kg, ℓ)',
          'Comparing and ordering lengths',
          'Comparing and ordering masses',
          'Comparing and ordering volumes',
        ],
      },
      {
        id: 'measurement-time',
        name: 'Measurement Time',
        difficulty: 2,
        objectives: [
          'Telling time to the minute',
          'Measuring time in hours and minutes',
          'Converting time in hours and minutes to minutes only, and vice versa',
        ],
      },
    ],
  },
  {
    id: 'p2-geometry',
    name: 'Geometry',
    level: 2,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: '2d-shapes',
        name: '2D Shapes',
        difficulty: 2,
        objectives: [
          'Making/completing patterns with 2D shapes according to one or two of the following attributes: size, shape, color, orientation',
        ],
      },
      {
        id: '3d-shapes',
        name: '3D Shapes',
        difficulty: 2,
        objectives: [
          'Identifying, naming, describing and classifying 3D shapes: cube, cuboid, cone, cylinder, sphere',
        ],
      },
    ],
  },
  {
    id: 'p2-data-representation-and-interpretation',
    name: 'Data Representation and Interpretation',
    level: 2,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subTopics: [
      {
        id: 'picture-graphs-with-scales',
        name: 'Picture Graphs with Scales',
        difficulty: 2,
        objectives: [
          'Reading and interpreting data from picture graphs with scales',
        ],
      },
    ],
  },
  // PRIMARY 3
  {
    id: 'p3-whole-numbers',
    name: 'Whole Numbers',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'numbers-to-10000',
        name: 'Numbers up to 10000',
        difficulty: 3,
        objectives: [
          'Counting in hundreds/thousands',
          'Number notation, representations and place values (thousands, hundreds, tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
        ],
      },
      {
        id: 'addition-and-subtraction',
        name: 'Addition and Subtraction',
        difficulty: 3,
        objectives: [
          'Addition and subtraction algorithms (up to 4 digits)',
          'Mental calculation involving addition and subtraction of two 2-digit numbers',
        ],
      },
      {
        id: 'multiplication-and-division',
        name: 'Multiplication and Division',
        difficulty: 3,
        objectives: [
          'Multiplication tables of 6, 7, 8 and 9',
          'Multiplying and dividing within the multiplication tables',
          'Division with remainder',
          'Multiplication and division algorithms (up to 3 digits by 1 digit)',
          'Mental calculation involving multiplication and division within multiplication tables',
        ],
      },
    ],
  },
  {
    id: 'p3-fractions',
    name: 'Fractions',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subTopics: [
      {
        id: 'equivalent-fractions',
        name: 'Equivalent Fractions',
        difficulty: 3,
        objectives: [
          'Equivalent fractions',
          'Expressing a fraction in its simplest form',
          'Comparing and ordering unlike fractions with denominators not exceeding 12',
          'Writing equivalent fractions given the denominator or numerator',
        ],
      },
      {
        id: 'fractions-addition-and-subtraction',
        name: 'Fractions Addition and Subtraction',
        difficulty: 3,
        objectives: [
          'Adding and subtracting two related fractions within one whole',
          'Denominators of given fractions not exceeding 12',
        ],
      },
    ],
  },
  {
    id: 'p3-money',
    name: 'Money',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subTopics: [
      {
        id: 'money-operations',
        name: 'Money Operations',
        difficulty: 3,
        objectives: ['Adding and subtracting money in decimal notation'],
      },
    ],
  },
  {
    id: 'p3-measurement',
    name: 'Length, Mass and Volume',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subTopics: [
      {
        id: 'length-mass-and-volume',
        name: 'Length, Mass and Volume',
        difficulty: 3,
        objectives: [
          'Measuring length in kilometres (km)',
          'Measuring volume of liquid in millilitres (ml)',
          'Measuring length/mass/volume in compound units',
          'Converting a compound unit to the smaller unit (kilometres and metres)',
          'Converting a compound unit to the larger unit (metres and centimetres)',
          'Converting a compound unit to the smaller unit (kilograms and grams)',
          'Converting a compound unit to the larger unit (litres and millilitres)',
        ],
      },
      {
        id: 'time',
        name: 'Time',
        difficulty: 3,
        objectives: [
          'Measuring time in seconds',
          'Finding starting time, finishing time or duration',
          '24-hour clock',
        ],
      },
    ],
  },
  {
    id: 'p3-area-and-volume',
    name: 'Area and Volume',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subTopics: [
      {
        id: 'area-and-perimeter',
        name: 'Area and Perimeter',
        difficulty: 3,
        objectives: [
          'Concepts of area and perimeter of a plane figure',
          'Measuring area in square units, cm² and m²',
          'Perimeter of rectilinear figure',
          'Perimeter of rectangle',
          'Perimeter of square',
          'Area of rectangle',
          'Area of square',
        ],
      },
    ],
  },
  {
    id: 'p3-geometry',
    name: 'Geometry',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'angles',
        name: 'Angles',
        difficulty: 3,
        objectives: [
          'Concepts of angle',
          'Right angles',
          'Angles greater than/smaller than a right angle',
        ],
      },
      {
        id: 'perpendicular-and-parallel-lines',
        name: 'Perpendicular and Parallel Lines',
        difficulty: 3,
        objectives: [
          'Perpendicular and parallel lines',
          'Drawing perpendicular and parallel lines',
        ],
      },
    ],
  },
  {
    id: 'p3-data-representation-and-interpretation',
    name: 'Data Representation and Interpretation',
    level: 3,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subTopics: [
      {
        id: 'bar-graphs',
        name: 'Bar Graphs',
        difficulty: 3,
        objectives: [
          'Reading and interpreting data from bar graphs',
          'Using different scales on axis',
        ],
      },
    ],
  },
  // PRIMARY 4
  {
    id: 'p4-whole-numbers',
    name: 'Whole Numbers',
    level: 4,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'numbers-to-100000',
        name: 'Numbers up to 100000',
        difficulty: 4,
        objectives: [
          'Number notation, representations and place values (ten thousands, thousands, hundreds, tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
          'Rounding numbers to the nearest 10, 100 or 1000',
          'Use of ≈',
        ],
      },
      {
        id: 'factors-and-multiples',
        name: 'Factors and Multiples',
        difficulty: 4,
        objectives: [
          'Factors, multiples and their relationship',
          'Determining if a 1-digit number is a factor of a given number within 100',
          'Finding the common factors of two given numbers',
          'Determining if a number is a multiple of a given 1-digit number',
          'Finding the common multiples of two given 1-digit numbers',
        ],
      },
      {
        id: 'four-operations',
        name: 'Four Operations',
        difficulty: 4,
        objectives: [
          'Multiplication algorithm up to 4 digits by 1 digit',
          'Multiplication algorithm up to 3 digits by 2 digits',
          'Division algorithm (up to 4 digits by 1 digit)',
        ],
      },
    ],
  },
  {
    id: 'p4-fractions',
    name: 'Mixed Numbers and Improper Fractions',
    level: 4,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subTopics: [
      {
        id: 'mixed-numbers',
        name: 'Mixed Numbers and Improper Fractions',
        difficulty: 4,
        objectives: [
          'Mixed numbers, improper fractions and their relationship',
        ],
      },
      {
        id: 'fraction-of-a-set',
        name: 'Fraction of a Set',
        difficulty: 4,
        objectives: ['fraction as part of a set'],
      },
      {
        id: 'fraction-addition-and-subtraction',
        name: 'Fraction Addition and Subtraction',
        difficulty: 4,
        objectives: [
          'Add and subtract fractions with denominators not exceeding 12 and not more than two different denominators',
        ],
      },
    ],
  },
  {
    id: 'p4-decimals',
    name: 'Decimals',
    level: 4,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.DECIMALS,
    subTopics: [
      {
        id: 'decimal-concepts',
        name: 'Decimals up to 3 decimal places',
        difficulty: 4,
        objectives: [
          'Notation, representations and place values (tenths, hundredths, thousandths)',
          'Comparing and ordering decimals',
          'Expressing decimals as fractions',
          'Expressing fractions as decimals when denominator is factor of 10 or 100',
          'Rounding decimals to:',
          '- The nearest whole number',
          '- 1 decimal place',
          '- 2 decimal places',
        ],
      },
      {
        id: 'decimal-operations',
        name: 'Operations with Decimals',
        difficulty: 4,
        objectives: [
          'Adding and subtracting decimals (up to 2 decimal places)',
          'Multiplying and dividing decimals (up to 2 decimal places) by a 1-digit whole number',
          'Dividing a whole number by a whole number with quotient as a decimal',
          'Rounding answers to a specified degree of accuracy',
        ],
      },
    ],
  },
  {
    id: 'p4-area-perimeter',
    name: 'Area and Perimeter',
    level: 4,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subTopics: [
      {
        id: 'advanced-area-perimeter',
        name: 'Advanced Area and Perimeter',
        difficulty: 4,
        objectives: [
          'Finding one dimension of a rectangle given the other dimension and its area/perimeter',
          'Finding the length of one side of a square given its area/perimeter',
          'Finding the area and perimeter of composite figures made up of rectangles and squares',
        ],
      },
    ],
  },
  {
    id: 'p4-angles',
    name: 'Angles',
    level: 4,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'angle-measurement',
        name: 'Angle Measurement',
        difficulty: 4,
        objectives: [
          'Using notation such as ∠ABC and ∠a to name angles',
          'Measuring angles in degrees',
          'Drawing an angle of given size',
        ],
      },
    ],
  },
  {
    id: 'p4-geometry',
    name: 'Geometry',
    level: 4,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'rectangle-square',
        name: 'Rectangle and Square',
        difficulty: 4,
        objectives: [
          'Properties of rectangle and square, excluding diagonal properties',
          'Drawing rectangles and squares',
        ],
      },
      {
        id: 'line-symmetry',
        name: 'Line Symmetry',
        difficulty: 4,
        objectives: [
          'Identifying symmetric figures',
          'Determining whether a straight line is a line of symmetry of a symmetric figure',
          'Completing a symmetric figure with respect to a given line of symmetry on square grid',
        ],
      },
      {
        id: 'nets',
        name: 'Nets',
        difficulty: 4,
        objectives: [
          'Identifying 2D representations of 3D shape: cube',
          'Identifying 2D representations of 3D shape: cuboid',
          'Identifying 2D representations of 3D shape: cone',
          'Identifying 2D representations of 3D shape: cylinder',
          'Identifying 2D representations of 3D shape: prism',
          'Identifying 2D representations of 3D shape: pyramid',
          'Drawing 2D representations of cube',
          'Drawing 2D representations of cuboid',
          'Drawing 2D representations of prism',
          'Drawing 2D representations of pyramid',
          'Identifying the nets of 3D solids: cube',
          'Identifying the nets of 3D solids: cuboid',
          'Identifying the nets of 3D solids: prism',
          'Identifying the nets of 3D solids: pyramid',
          'Identifying the solid which can be formed by a given net',
        ],
      },
    ],
  },
  {
    id: 'p4-tables-graphs',
    name: 'Tables and Graphs',
    level: 4,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subTopics: [
      {
        id: 'tables-line-graphs-pie-charts',
        name: 'Tables, Line Graphs and Pie Charts',
        difficulty: 4,
        objectives: [
          'Completing a table from given data',
          'Reading and interpreting data from tables/line graphs/pie charts',
        ],
      },
    ],
  },
  // PRIMARY 5
  {
    id: 'p5-whole-numbers',
    name: 'Numbers up to 10 million',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'numbers-up-to-10-million',
        name: 'Numbers up to 10 million',
        difficulty: 5,
        objectives: [
          'Reading and writing numbers in numerals and in words up to 10 million',
        ],
      },
    ],
  },
  {
    id: 'p5-four-operations',
    name: 'Four Operations',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subTopics: [
      {
        id: 'four-operations',
        name: 'Four Operations',
        difficulty: 5,
        objectives: [
          'Multiplying and dividing by 10, 100, 1000 and their multiples without calculator',
          'Order of operations without calculator',
          'Use of brackets without calculator',
        ],
      },
    ],
  },
  {
    id: 'p5-fractions-division',
    name: 'Fraction and Division',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subTopics: [
      {
        id: 'fraction-division',
        name: 'Fraction and Division',
        difficulty: 5,
        objectives: [
          'Dividing a whole number by a whole number with quotient as a fraction',
          'Expressing fractions as decimals',
        ],
      },
      {
        id: 'fractions-four-operations',
        name: 'Fraction and Four Operations',
        difficulty: 5,
        objectives: [
          'Adding and subtracting mixed numbers',
          'Multiplying a proper/improper fraction and a whole number without calculator',
          'Multiplying a proper fraction and a proper/improper fraction without calculator',
          'Multiplying two improper fractions',
          'Multiplying a mixed number and a whole number',
        ],
      },
    ],
  },
  {
    id: 'p5-decimals',
    name: 'Decimals',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.DECIMALS,
    subTopics: [
      {
        id: 'decimals-four-operations',
        name: 'Decimals and Four Operations',
        difficulty: 5,
        objectives: [
          'Multiplying and dividing decimals (up to 3 decimal places) by 10, 100, 1000 and their multiples without calculator',
          'Converting a measurement from a smaller unit to a larger unit in decimal form, and vice versa between km and m, kg and g, L and mL',
        ],
      },
    ],
  },
  {
    id: 'p5-percentage',
    name: 'Percentage',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.PERCENTAGE,
    subTopics: [
      {
        id: 'percentage',
        name: 'Percentage',
        difficulty: 5,
        objectives: [
          'Expressing a part of a whole as a percentage',
          'Use of % symbol',
          'Finding a percentage part of a whole',
          'Finding discount, GST and annual interest',
        ],
      },
    ],
  },
  {
    id: 'p5-rate',
    name: 'Rate',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.RATE,
    subTopics: [
      {
        id: 'rate',
        name: 'Rate',
        difficulty: 5,
        objectives: [
          'Rate as the amount of a quantity per unit of another quantity',
          'Finding rate given total amount and number of units',
          'Finding total amount given rate and number of units',
          'Finding number of units given rate and total amount',
        ],
      },
    ],
  },
  {
    id: 'p5-area-and-volume',
    name: 'Area and Volume',
    level: 5,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subTopics: [
      {
        id: 'area-of-triangle',
        name: 'Area of Triangle',
        difficulty: 5,
        objectives: [
          'Concepts of base and height of a triangle',
          'Area of triangle',
          'Finding area of composite figures with triangles',
        ],
      },
      {
        id: 'volume-of-cube-and-cuboid',
        name: 'Volume of Cube and Cuboid',
        difficulty: 5,
        objectives: [
          'Building solids with unit cubes',
          'Understanding cubic units (cm³, m³), excluding conversion between cm³ and m³',
          'Drawing cubes and cuboids on isometric grid',
          'Volume of cube/cuboid',
          'Finding volume of liquid in a rectangular tank',
          'Relationship between ℓ (or ml) with cm3',
        ],
      },
    ],
  },
  {
    id: 'p5-geometry',
    name: 'Geometry',
    level: 5,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'angles',
        name: 'Angles',
        difficulty: 5,
        objectives: [
          'Angles on a straight line',
          'Angles at a point',
          'Vertically opposite angles',
          'Finding unknown angles',
        ],
      },
      {
        id: 'triangles',
        name: 'Triangles',
        difficulty: 5,
        objectives: [
          'Properties of isosceles triangle',
          'Properties of equilateral triangle',
          'Properties of right-angled triangle',
          'Angle sum of a triangle',
          'Finding unknown angles without additional construction',
        ],
      },
      {
        id: 'quadrilaterals',
        name: 'Quadrilaterals',
        difficulty: 5,
        objectives: [
          'Properties of parallelogram',
          'Properties of rhombus',
          'Properties of trapezium',
          'Finding unknown angles without additional construction',
        ],
      },
    ],
  },
  // Primary 6
  {
    id: 'p6-fractions',
    name: 'Fractions',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subTopics: [
      {
        id: 'four-operations',
        name: 'Four Operations',
        difficulty: 6,
        objectives: [
          'Dividing a proper fraction by a whole number',
          'Dividing a whole number/proper fraction by a proper fraction',
        ],
      },
    ],
  },
  {
    id: 'p6-percentage',
    name: 'Percentage',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.PERCENTAGE,
    subTopics: [
      {
        id: 'percentage',
        name: 'Percentage',
        difficulty: 6,
        objectives: [
          'Finding the whole given a part and the percentage',
          'Finding percentage increase/decrease',
        ],
      },
    ],
  },
  {
    id: 'p6-ratio',
    name: 'Ratio',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.RATIO,
    subTopics: [
      {
        id: 'ratio',
        name: 'Ratio',
        difficulty: 6,
        objectives: [
          'notation, representations and interpretation of a:b and a:b:c, where a, b and c are whole numbers',
          'excluding ratios involving fractions and decimals',
          'equivalent ratios',
          'dividing a quantity in a given ratio',
          'expressing a ratio in its simplest form',
          'finding the ratio of two or three given quantities',
          'finding the missing term in a pair of equivalent ratios',
          'relationship between fraction and ratio',
        ],
      },
    ],
  },
  {
    id: 'p6-algebra',
    name: 'Algebra',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.ALGEBRA,
    subTopics: [
      {
        id: 'algebra',
        name: 'Algebra',
        difficulty: 6,
        objectives: [
          'using a letter to represent an unknown number ',
          'notation, representations and interpretation of simple algebraic expressions such as a+-3, ax3 or 3a, a ÷ 3 or a/3',
          'simplifying simple linear expressions excluding brackets',
          'evaluating simple linear expressions by substitution',
          'simple linear equations involving whole number coefficient only',
        ],
      },
    ],
  },
  {
    id: 'p6-area-and-volume',
    name: 'Area and Volume',
    level: 6,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subTopics: [
      {
        id: 'area-and-circumference-of-circle',
        name: 'Area and Circumference of Circle',
        difficulty: 6,
        objectives: [
          'Area and circumference of circle',
          'Finding the area and perimeter of semicircle',
          'Finding the area and perimeter of quarter circle',
          'Finding the area and perimeter of composite figures made up of square, rectangle, triangle, semicircle and quarter circle ',
        ],
      },
      {
        id: 'volume-of-cube-and-cuboid',
        name: 'Volume of Cube and Cuboid',
        difficulty: 6,
        objectives: [
          'Finding one dimension of a cuboid given its volume and the other dimensions',
          'Finding the length of one edge of a cube given its volume',
          'Finding the height of a cuboid given its volume and base area',
          'Finding the area of a face of a cuboid given its volume and one dimension',
          'Use of square root and cube root',
        ],
      },
    ],
  },
  {
    id: 'p6-special-quadrilaterals',
    name: 'Special Quadrilaterals',
    level: 6,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subTopics: [
      {
        id: 'special-quadrilaterals',
        name: 'Special Quadrilaterals',
        difficulty: 6,
        objectives: [
          'Finding unknown angles, without additional construction of lines, in composite geometric figures involving squares, rectangles, triangles, parallelograms, rhombuses and trapeziums',
        ],
      },
    ],
  },
  {
    id: 'p6-data-analysis',
    name: 'Data Analysis',
    level: 6,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_ANALYSIS,
    subTopics: [
      {
        id: 'average-of-a-set-of-data',
        name: 'Average of a Set of Data',
        difficulty: 6,
        objectives: [
          'Understanding average as "total value ÷ number of data"',
          'Finding average given total value and number of data',
          'Finding total value given average and number of data',
          'Finding number of data given average and total value',
        ],
      },
    ],
  },
];

export function getTopicsByLevel(
  startLevel: number,
  endLevel: number
): MathTopic[] {
  return MATH_TOPICS.filter(
    (topic) => topic.level >= startLevel && topic.level <= endLevel
  );
}
