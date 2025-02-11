import { mathQuestions } from '@/lib/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type MathQuestion = InferSelectModel<typeof mathQuestions>;

export interface SubStrandTopic {
  id: string;
  name: string;
  difficulty: number;
  skills: {
    id: string;
    description: string;
    questions: {
      question: string;
      answer: number | string | null;
      explanation: string[];
      variables: {
        questionText: string;
        min: number;
        max: number;
      }[];
    }[];
  }[];
}

export interface MathTopic {
  id: string;
  name: string;
  level: number;
  strand: MathStrand;
  subStrand: MathSubStrand;
  subStrandTopics: SubStrandTopic[];
}

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

export const MATH_TOPICS = [
  {
    id: 'd1e6a12d-7313-4939-bbb9-60d11b8f4667',
    name: 'Whole Numbers',
    level: 1,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subStrandTopics: [
      {
        id: '998f4fe6-4579-4aee-82f2-a7cb2f458503',
        name: 'Numbers up to 100',
        difficulty: 1,
        skills: [
          {
            id: 'counting-objects',
            description:
              'Counting to tell the number of objects in a given set',
            questions: [
              {
                question: 'How many apples are there in the basket?',
                answer: null,
                explanation: ['Count the total number of apples in the basket'],
                variables: [
                  {
                    questionText:
                      'How many {objects} are there in the {container}?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'place-values',
            description:
              'Number notation, representations and place values (tens, ones)',
            questions: [
              {
                question: 'What is the value of the tens digit in 47?',
                answer: 40,
                explanation: ['In 47, the tens digit is 4, so the value is 40'],
                variables: [
                  {
                    questionText:
                      'What is the value of the tens digit in {number}?',
                    min: 10,
                    max: 99,
                  },
                ],
              },
              {
                question: 'What is the value of the ones digit in 47?',
                answer: 7,
                explanation: ['In 47, the ones digit is 7'],
                variables: [
                  {
                    questionText:
                      'What is the value of the ones digit in {number}?',
                    min: 10,
                    max: 99,
                  },
                ],
              },
            ],
          },
          {
            id: 'number-operations',
            description: 'Basic number operations within 100',
            questions: [
              {
                question: 'What is the sum of 35 and 47?',
                answer: 82,
                explanation: ['35 + 47 = 82'],
                variables: [
                  {
                    questionText: 'What is the sum of {number1} and {number2}?',
                    min: 10,
                    max: 50,
                  },
                ],
              },
              {
                question: 'What is the product of 7 and 8?',
                answer: 56,
                explanation: ['7 × 8 = 56'],
                variables: [
                  {
                    questionText:
                      'What is the product of {number1} and {number2}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '7692a08c-3560-428c-bcf1-187711873dfd',
        name: 'Addition and Subtraction',
        difficulty: 1,
        skills: [
          {
            id: 'addition-concepts',
            description: 'Concepts of addition and subtraction',
            questions: [
              {
                question: 'What is the sum of 23, 45, and 17?',
                answer: 85,
                explanation: ['23 + 45 + 17 = 85'],
                variables: [
                  {
                    questionText:
                      'What is the sum of {number1}, {number2}, and {number3}?',
                    min: 10,
                    max: 50,
                  },
                ],
              },
            ],
          },
          {
            id: 'subtraction-concepts',
            description: 'Use of +, – and =',
            questions: [
              {
                question: 'What is the difference between 78 and 54?',
                answer: 24,
                explanation: ['78 - 54 = 24'],
                variables: [
                  {
                    questionText:
                      'What is the difference between {number1} and {number2}?',
                    min: 50,
                    max: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '4cabf5ba-f3bb-4576-84c2-8b3e300ef778',
        name: 'Multiplication',
        difficulty: 1,
        skills: [
          {
            id: 'multiplication-concepts',
            description: 'Concepts of multiplication',
            questions: [
              {
                question: 'What is the product of 6 and 7?',
                answer: 42,
                explanation: ['6 × 7 = 42'],
                variables: [
                  {
                    questionText:
                      'What is the product of {number1} and {number2}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiplication-symbol',
            description: 'Use of ×',
            questions: [
              {
                question: 'Write 6 times 7 using the multiplication symbol.',
                answer: '6 × 7',
                explanation: [
                  'The multiplication symbol × is used to represent "times"',
                ],
                variables: [
                  {
                    questionText:
                      'Write {number1} times {number2} using the multiplication symbol.',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiply-within-40',
            description: 'Multiplying within 40',
            questions: [
              {
                question: 'What is the product of 8 and 5?',
                answer: 40,
                explanation: ['8 × 5 = 40'],
                variables: [
                  {
                    questionText:
                      'What is the product of {number1} and {number2}?',
                    min: 1,
                    max: 8,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cef54c34-989b-4a3c-bc35-4bc187e4ba63',
        name: 'Division',
        difficulty: 1,
        skills: [
          {
            id: 'division-concepts',
            description: 'Concepts of division',
            questions: [
              {
                question: 'What is the quotient when 48 is divided by 6?',
                answer: 8,
                explanation: ['48 ÷ 6 = 8'],
                variables: [
                  {
                    questionText:
                      'What is the quotient when {number1} is divided by {number2}?',
                    min: 1,
                    max: 50,
                  },
                ],
              },
            ],
          },
          {
            id: 'division-within-20',
            description: 'Dividing within 20',
            questions: [
              {
                question: 'What is the quotient when 56 is divided by 7?',
                answer: 8,
                explanation: ['56 ÷ 7 = 8'],
                variables: [
                  {
                    questionText:
                      'What is the quotient when {number1} is divided by {number2}?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'fb1261ec-2dd9-4df3-9835-3c71093ecf0e',
    name: 'Money',
    level: 1,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subStrandTopics: [
      {
        id: '4c8ade56-22c2-4b0e-9c9c-8a2793a09cf4',
        name: 'Counting Money',
        difficulty: 1,
        skills: [
          {
            id: 'counting-cents',
            description: 'Counting amount of money in cents up to $1',
            questions: [
              {
                question: 'How many cents are there in $0.75?',
                answer: 75,
                explanation: ['$0.75 = 75 cents'],
                variables: [
                  {
                    questionText: 'How many cents are there in ${amount}?',
                    min: 1,
                    max: 99,
                  },
                ],
              },
            ],
          },
          {
            id: 'counting-dollars',
            description: 'Counting amount of money in dollars up to $100',
            questions: [
              {
                question: 'How many dollars are there in 1000 cents?',
                answer: 10,
                explanation: ['1000 cents = 10 dollars'],
                variables: [
                  {
                    questionText:
                      'How many dollars are there in {cents} cents?',
                    min: 100,
                    max: 10000,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '8d641e08-7967-4462-a198-b3eb8bde3194',
    name: 'Length',
    level: 1,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subStrandTopics: [
      {
        id: '62483d15-36e4-43e7-acb4-2a772806035e',
        name: 'Measuring of Length',
        difficulty: 1,
        skills: [
          {
            id: 'measuring-cm',
            description: 'Measuring length in centimetres',
            questions: [
              {
                question: 'What is the length of a line that is 15 cm long?',
                answer: 15,
                explanation: ['The length is 15 cm'],
                variables: [
                  {
                    questionText:
                      'What is the length of a line that is {length} cm long?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'cm-abbreviation',
            description: 'Use of abbreviation cm',
            questions: [
              {
                question: 'What is the abbreviation for centimetre?',
                answer: 'cm',
                explanation: ['The abbreviation for centimetre is cm'],
                variables: [
                  {
                    questionText: 'What is the abbreviation for centimetre?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'comparing-lengths',
            description: 'Comparing and ordering lengths in cm',
            questions: [
              {
                question: 'Which is longer: 7 cm or 15 cm?',
                answer: '15 cm',
                explanation: ['15 cm is longer than 7 cm'],
                variables: [
                  {
                    questionText:
                      'Which is longer: {length1} cm or {length2} cm?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'drawing-lines',
            description:
              'Measuring and drawing a line segment to the nearest cm',
            questions: [
              {
                question: 'Draw a line segment that is 7 cm long.',
                answer: null,
                explanation: ['Draw a line segment that is 7 cm long'],
                variables: [
                  {
                    questionText:
                      'Draw a line segment that is {length} cm long.',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'c7560517-82ac-4bb3-8e37-503e2ff4b0fe',
        name: 'Measurement of Time',
        difficulty: 1,
        skills: [
          {
            id: 'telling-time',
            description: 'Telling time to 5 minutes',
            questions: [
              {
                question:
                  'What time is it when the hour hand is on 3 and the minute hand is on 12?',
                answer: '3:00',
                explanation: ['It is 3:00'],
                variables: [
                  {
                    questionText:
                      'What time is it when the hour hand is on {hour} and the minute hand is on {minute}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'am-pm',
            description: 'Use of "am" and "pm"',
            questions: [
              {
                question:
                  'What time is it when the hour hand is on 10 and the minute hand is on 30 in the morning?',
                answer: '10:30 am',
                explanation: ['When it is morning, we add "am" to the time'],
                variables: [
                  {
                    questionText:
                      'What time is it when the hour hand is on {hour} and the minute hand is on {minute} in the morning?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
              {
                question:
                  'What time is it when the hour hand is on 8 and the minute hand is on 45 in the evening?',
                answer: '8:45 pm',
                explanation: ['When it is evening, we add "pm" to the time'],
                variables: [
                  {
                    questionText:
                      'What time is it when the hour hand is on {hour} and the minute hand is on {minute} in the evening?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'time-abbreviations',
            description: 'Use of abbreviations h and min',
            questions: [
              {
                question: 'Write 2 hours and 30 minutes using h and min.',
                answer: '2 h 30 min',
                explanation: ['Use h for hours and min for minutes'],
                variables: [
                  {
                    questionText:
                      'Write {hours} hours and {minutes} minutes using h and min.',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'duration',
            description: 'Duration of one hour/half hour',
            questions: [
              {
                question: 'How many minutes are there in half an hour?',
                answer: 30,
                explanation: ['Half an hour = 30 minutes'],
                variables: [
                  {
                    questionText:
                      'How many minutes are there in {fraction} hour?',
                    min: 1,
                    max: 1,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '288ec1f7-9a53-48a8-a2c9-076336153d3f',
    name: 'Geometry',
    level: 1,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subStrandTopics: [
      {
        id: '12d95fd0-60e1-4f99-8bf2-b8b1c4cb2554',
        name: 'Geometry 2D Shapes',
        difficulty: 1,
        skills: [
          {
            id: 'identify-rectangle',
            description:
              'Identifying, naming, describing and classifying 2D shape (rectangle)',
            questions: [
              {
                question:
                  'What is the area of a rectangle with length 5 cm and width 3 cm?',
                answer: 15,
                explanation: ['Area = length × width = 5 cm × 3 cm = 15 cm²'],
                variables: [
                  {
                    questionText:
                      'What is the area of a rectangle with length {length} cm and width {width} cm?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'identify-square',
            description:
              'Identifying, naming, describing and classifying 2D shape (square)',
            questions: [
              {
                question: 'What is special about a square?',
                answer: 'All sides are equal',
                explanation: [
                  'A square has four equal sides and four right angles',
                ],
                variables: [
                  {
                    questionText: 'What is special about a square?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'identify-triangle',
            description:
              'Identifying, naming, describing and classifying 2D shape (triangle)',
            questions: [
              {
                question: 'How many sides does a triangle have?',
                answer: 3,
                explanation: ['A triangle has three sides'],
                variables: [
                  {
                    questionText: 'How many sides does a triangle have?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'identify-circle',
            description:
              'Identifying, naming, describing and classifying 2D shape (circle)',
            questions: [
              {
                question: 'What shape has no corners and is perfectly round?',
                answer: 'circle',
                explanation: [
                  'A circle is a perfectly round shape with no corners',
                ],
                variables: [
                  {
                    questionText:
                      'What shape has no corners and is perfectly round?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '248b62b7-f884-49f9-8eca-a409d1dc94c9',
    name: 'Data Representation and Interpretation',
    level: 1,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subStrandTopics: [
      {
        id: '4b350a48-1ebb-47d7-a1e9-d89879d83088',
        name: 'Picture Graphs',
        difficulty: 1,
        skills: [
          {
            id: 'reading-picture-graphs',
            description: 'Reading and interpreting data from picture graphs',
            questions: [
              {
                question: 'How many students chose option A?',
                answer: 20,
                explanation: ['20 students chose option A'],
                variables: [
                  {
                    questionText: 'How many students chose option {option}?',
                    min: 1,
                    max: 50,
                  },
                ],
              },
              {
                question: 'Which option was chosen by the most students?',
                answer: 'A',
                explanation: [
                  'Option A was chosen by 20 students, which is the highest',
                ],
                variables: [
                  {
                    questionText:
                      'Which option was chosen by the most students?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4e299797-5bcd-473d-8e53-13d1b8c2c649',
    name: 'Whole Numbers',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subStrandTopics: [
      {
        id: '40acff90-5cf1-45c6-a90a-030a8997dd89',
        name: 'Numbers up to 1000',
        difficulty: 2,
        skills: [
          {
            id: 'counting-hundreds',
            description: 'Counting in tens/hundreds',
            questions: [
              {
                question: 'What is the sum of 500, 300, and 200?',
                answer: 1000,
                explanation: ['500 + 300 + 200 = 1000'],
                variables: [
                  {
                    questionText:
                      'What is the sum of {number1}, {number2}, and {number3}?',
                    min: 100,
                    max: 900,
                  },
                ],
              },
              {
                question: 'Count by hundreds from 100 to 1000',
                answer: '100, 200, 300, 400, 500, 600, 700, 800, 900, 1000',
                explanation: ['When counting by hundreds, add 100 each time'],
                variables: [
                  {
                    questionText: 'Count by hundreds from {start} to {end}',
                    min: 100,
                    max: 1000,
                  },
                ],
              },
            ],
          },
          {
            id: 'place-values-3digit',
            description:
              'Number notation, representations and place values (hundreds, tens, ones)',
            questions: [
              {
                question: 'What is the value of the hundreds digit in 456?',
                answer: 400,
                explanation: [
                  'In 456, the hundreds digit is 4, so the value is 400',
                ],
                variables: [
                  {
                    questionText:
                      'What is the value of the hundreds digit in {number}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
          {
            id: 'number-words',
            description: 'Reading and writing numbers in numerals and in words',
            questions: [
              {
                question: 'Write 567 in words',
                answer: 'five hundred and sixty-seven',
                explanation: ['567 = five hundred and sixty-seven'],
                variables: [
                  {
                    questionText: 'Write {number} in words',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
          {
            id: 'comparing-numbers',
            description: 'Comparing and ordering numbers',
            questions: [
              {
                question: 'Which number is greater: 345 or 543?',
                answer: 543,
                explanation: ['543 is greater than 345'],
                variables: [
                  {
                    questionText:
                      'Which number is greater: {number1} or {number2}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
          {
            id: 'number-patterns',
            description: 'Patterns in number sequences',
            questions: [
              {
                question:
                  'What comes next in the sequence: 100, 200, 300, ___?',
                answer: 400,
                explanation: [
                  'The pattern adds 100 each time, so after 300 comes 400',
                ],
                variables: [
                  {
                    questionText:
                      'What comes next in the sequence: {start}, {second}, {third}, ___?',
                    min: 100,
                    max: 900,
                  },
                ],
              },
            ],
          },
          {
            id: 'odd-even',
            description: 'Odd and even numbers',
            questions: [
              {
                question: 'Is 456 an odd or even number?',
                answer: 'even',
                explanation: [
                  '456 is even because it ends in 6, which is even',
                ],
                variables: [
                  {
                    questionText: 'Is {number} an odd or even number?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '7d32b8e9-c9cd-42f0-8c4b-8321ee098fa4',
        name: 'Whole Numbers Addition and Subtraction',
        difficulty: 2,
        skills: [
          {
            id: 'three-digit-operations',
            description: 'Addition and subtraction algorithms (up to 3 digits)',
            questions: [
              {
                question: 'What is the sum of 456 and 234?',
                answer: 690,
                explanation: ['456 + 234 = 690'],
                variables: [
                  {
                    questionText: 'What is the sum of {number1} and {number2}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
              {
                question: 'What is the difference between 876 and 543?',
                answer: 333,
                explanation: ['876 - 543 = 333'],
                variables: [
                  {
                    questionText:
                      'What is the difference between {number1} and {number2}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
          {
            id: 'mental-calculation',
            description:
              'Mental calculation involving addition and subtraction of a 3-digit number and ones/tens/hundreds',
            questions: [
              {
                question: 'Add 100 to 456',
                answer: 556,
                explanation: ['456 + 100 = 556'],
                variables: [
                  {
                    questionText: 'Add {addend} to {number}',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: '19edeffe-a8c2-4aef-b2e0-c66cce5a580b',
        name: 'Whole Numbers Multiplication and Division',
        difficulty: 2,
        skills: [
          {
            id: 'multiplication-tables',
            description: 'Multiplication tables of 2, 3, 4, 5 and 10',
            questions: [
              {
                question: 'What is 7 × 8?',
                answer: 56,
                explanation: ['7 × 8 = 56'],
                variables: [
                  {
                    questionText: 'What is {number1} × {number2}?',
                    min: 2,
                    max: 10,
                  },
                ],
              },
              {
                question:
                  'Complete the multiplication table for 5: 5 × 1 = 5, 5 × 2 = 10, ...',
                answer: '5, 10, 15, 20, 25, 30, 35, 40, 45, 50',
                explanation: ['Multiply 5 by each number from 1 to 10'],
                variables: [
                  {
                    questionText:
                      'Complete the multiplication table for {number}: {number} × 1 = {first}, {number} × 2 = {second}, ...',
                    min: 2,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'division-symbol',
            description: 'Use of ÷ symbol',
            questions: [
              {
                question: 'Write "48 divided by 6" using the division symbol',
                answer: '48 ÷ 6',
                explanation: ['The ÷ symbol represents division'],
                variables: [
                  {
                    questionText:
                      'Write "{number1} divided by {number2}" using the division symbol',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiplication-division-relationship',
            description: 'Relationship between multiplication and division',
            questions: [
              {
                question: 'If 7 × 8 = 56, what is 56 ÷ 8?',
                answer: 7,
                explanation: ['Since 7 × 8 = 56, then 56 ÷ 8 = 7'],
                variables: [
                  {
                    questionText:
                      'If {number1} × {number2} = {product}, what is {product} ÷ {number2}?',
                    min: 2,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiply-divide-tables',
            description:
              'Multiplying and dividing within the multiplication tables',
            questions: [
              {
                question: 'What is 48 ÷ 6?',
                answer: 8,
                explanation: ['48 ÷ 6 = 8'],
                variables: [
                  {
                    questionText: 'What is {number1} ÷ {number2}?',
                    min: 2,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'mental-multiplication',
            description:
              'Mental calculation involving multiplication and division',
            questions: [
              {
                question: 'Multiply 25 by 4 mentally',
                answer: 100,
                explanation: ['25 × 4 = 100'],
                variables: [
                  {
                    questionText: 'Multiply {number1} by {number2} mentally',
                    min: 2,
                    max: 25,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9a950172-add3-4d9b-a8e9-4bd482d0c0f7',
    name: 'Fractions',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subStrandTopics: [
      {
        id: '17619218-12a1-4204-a375-28c1d3b6ef46',
        name: 'Fraction of a Whole',
        difficulty: 2,
        skills: [
          {
            id: 'fraction-concept',
            description: 'Fraction as part of a whole',
            questions: [
              {
                question: 'What fraction of the circle is shaded?',
                answer: 0.75,
                explanation: ['The shaded area is 3/4 of the circle'],
                variables: [
                  {
                    questionText: 'What fraction of the {shape} is shaded?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'fraction-notation',
            description: 'Notation and representations of fractions',
            questions: [
              {
                question: 'Write three-quarters as a fraction',
                answer: '3/4',
                explanation: ['Three-quarters is written as 3/4'],
                variables: [
                  {
                    questionText: 'Write {fraction_word} as a fraction',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'compare-unit-fractions',
            description:
              'Comparing and ordering unit fractions with denominators not exceeding 12',
            questions: [
              {
                question: 'Which is larger: 1/4 or 1/3?',
                answer: '1/3',
                explanation: [
                  '1/3 is larger than 1/4 because when the denominator is smaller, each part is larger',
                ],
                variables: [
                  {
                    questionText:
                      'Which is larger: 1/{denominator1} or 1/{denominator2}?',
                    min: 2,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'compare-like-fractions',
            description:
              'Comparing and ordering like fractions with denominators not exceeding 12',
            questions: [
              {
                question: 'Which is larger: 3/5 or 2/5?',
                answer: '3/5',
                explanation: [
                  '3/5 is larger than 2/5 because it has more equal parts',
                ],
                variables: [
                  {
                    questionText:
                      'Which is larger: {numerator1}/{denominator} or {numerator2}/{denominator}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dc0508f5-673a-49ca-94f6-8c241b81c1fc',
        name: 'Fraction Addition and Subtraction',
        difficulty: 2,
        skills: [
          {
            id: 'add-subtract-like-fractions',
            description:
              'Adding and subtracting like fractions within one whole with denominators not exceeding 12',
            questions: [
              {
                question: 'What is the sum of 1/4 and 1/4?',
                answer: 0.5,
                explanation: ['1/4 + 1/4 = 2/4 = 1/2'],
                variables: [
                  {
                    questionText:
                      'What is the sum of {numerator1}/{denominator} and {numerator2}/{denominator}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
              {
                question: 'What is 3/8 minus 1/8?',
                answer: 0.25,
                explanation: ['3/8 - 1/8 = 2/8 = 1/4'],
                variables: [
                  {
                    questionText:
                      'What is {numerator1}/{denominator} minus {numerator2}/{denominator}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3c557419-26e3-40d9-97dc-8bb5e2d80699',
    name: 'Money',
    level: 2,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subStrandTopics: [
      {
        id: 'c9d4be29-ba85-4f21-969b-19e1653b82c7',
        name: 'Money Operations',
        difficulty: 2,
        skills: [
          {
            id: 'count-money-mixed',
            description: 'Counting amount of money in dollars and cents',
            questions: [
              {
                question:
                  'What is the total amount of money if you have 3 quarters and 2 dimes?',
                answer: 0.85,
                explanation: [
                  '3 quarters = $0.75, 2 dimes = $0.20, 0.75 + 0.20 = $0.95',
                ],
                variables: [
                  {
                    questionText:
                      'What is the total amount of money if you have {coin1_count} {coin1_type} and {coin2_count} {coin2_type}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'decimal-notation',
            description: 'Reading and writing money in decimal notation',
            questions: [
              {
                question:
                  'Write eighty-five cents using the dollar symbol and decimal notation',
                answer: '$0.85',
                explanation: ['Eighty-five cents is written as $0.85'],
                variables: [
                  {
                    questionText:
                      'Write {amount_in_words} using the dollar symbol and decimal notation',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'compare-money',
            description: 'Comparing two or three amounts of money',
            questions: [
              {
                question: 'Which amount is larger: $1.25 or $1.52?',
                answer: '$1.52',
                explanation: ['$1.52 is larger than $1.25'],
                variables: [
                  {
                    questionText:
                      'Which amount is larger: ${amount1} or ${amount2}?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'convert-money',
            description:
              'Converting money in decimal notation to cents only, and vice versa',
            questions: [
              {
                question: 'How many cents is $2.35?',
                answer: 235,
                explanation: ['$2.35 = 235 cents'],
                variables: [
                  {
                    questionText: 'How many cents is ${dollars}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ae59466a-98d7-4dfa-95a6-00665e640aee',
    name: 'Measurement',
    level: 2,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subStrandTopics: [
      {
        id: 'ef0f0734-2e16-4251-ab4f-9b47c69be3bd',
        name: 'Length, Mass and Volume',
        difficulty: 2,
        skills: [
          {
            id: 'measuring-metres',
            description: 'Measuring length in metres',
            questions: [
              {
                question:
                  'What is the length of a table that is 1.2 meters long?',
                answer: 1.2,
                explanation: ['The length is 1.2 meters'],
                variables: [
                  {
                    questionText:
                      'What is the length of a {object} that is {length} meters long?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'measuring-mass',
            description: 'Measuring mass in kilograms/grams',
            questions: [
              {
                question: 'How many grams are in 2.5 kilograms?',
                answer: 2500,
                explanation: ['1 kilogram = 1000 grams, so 2.5 kg = 2500 g'],
                variables: [
                  {
                    questionText: 'How many grams are in {number} kilograms?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'measuring-volume',
            description: 'Measuring volume of liquid in litres',
            questions: [
              {
                question: 'How many litres of water can a 2-litre bottle hold?',
                answer: 2,
                explanation: ['A 2-litre bottle can hold 2 litres'],
                variables: [
                  {
                    questionText:
                      'How many litres of water can a {capacity}-litre {container} hold?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'measurement-units',
            description:
              'Using appropriate units of measurement and abbreviations (m, g, kg, ℓ)',
            questions: [
              {
                question: 'What is the abbreviation for kilogram?',
                answer: 'kg',
                explanation: ['The abbreviation for kilogram is kg'],
                variables: [
                  {
                    questionText: 'What is the abbreviation for {unit}?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'compare-lengths',
            description: 'Comparing and ordering lengths',
            questions: [
              {
                question: 'Which is longer: 1.5 meters or 150 centimeters?',
                answer: '150 centimeters',
                explanation: ['1.5 meters = 150 centimeters, they are equal'],
                variables: [
                  {
                    questionText:
                      'Which is longer: {length1} {unit1} or {length2} {unit2}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'dd24f2c2-8d07-4f18-91d0-0aaa14da15ad',
        name: 'Measurement Time',
        difficulty: 2,
        skills: [
          {
            id: 'telling-time-minute',
            description: 'Telling time to the minute',
            questions: [
              {
                question:
                  'What time is it when the hour hand is on 3 and the minute hand is on 12?',
                answer: '3:00',
                explanation: [
                  'When the minute hand is on 12, it is exactly the hour shown by the hour hand',
                ],
                variables: [
                  {
                    questionText:
                      'What time is it when the hour hand is on {hour} and the minute hand is on {minute}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'time-conversion',
            description:
              'Converting time in hours and minutes to minutes only, and vice versa',
            questions: [
              {
                question: 'How many minutes are in 2 hours and 30 minutes?',
                answer: 150,
                explanation: ['2 hours = 120 minutes, 120 + 30 = 150 minutes'],
                variables: [
                  {
                    questionText:
                      'How many minutes are in {hours} hours and {minutes} minutes?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'afad2755-2a54-4203-aa2b-d36ac9c23725',
    name: 'Geometry',
    level: 2,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subStrandTopics: [
      {
        id: '0dab254d-261f-4a96-9390-73149f30fa47',
        name: '2D Shapes',
        difficulty: 2,
        skills: [
          {
            id: 'shape-patterns',
            description:
              'Making/completing patterns with 2D shapes according to one or two of the following attributes: size, shape, color, orientation',
            questions: [
              {
                question:
                  'What comes next in the pattern: square, triangle, square, triangle, ___?',
                answer: 'square',
                explanation: [
                  'The pattern alternates between square and triangle',
                ],
                variables: [
                  {
                    questionText:
                      'What comes next in the pattern: {shape1}, {shape2}, {shape1}, {shape2}, ___?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'f3751a7a-ab22-4041-b986-7549f72132ff',
        name: '3D Shapes',
        difficulty: 2,
        skills: [
          {
            id: 'identify-3d-shapes',
            description:
              'Identifying, naming, describing and classifying 3D shapes: cube, cuboid, cone, cylinder, sphere',
            questions: [
              {
                question: "What is the shape of a Rubik's cube?",
                answer: 'cube',
                explanation: ["A Rubik's cube is a cube"],
                variables: [
                  {
                    questionText: 'What is the shape of a {object}?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                question: 'How many faces does a cube have?',
                answer: 6,
                explanation: ['A cube has 6 square faces'],
                variables: [
                  {
                    questionText: 'How many faces does a {shape} have?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ccfd0393-59af-45ef-87c9-07256cae5c79',
    name: 'Data Representation and Interpretation',
    level: 2,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subStrandTopics: [
      {
        id: '49152e60-2b58-40a1-b4a3-824fdaaea2a6',
        name: 'Picture Graphs with Scales',
        difficulty: 2,
        skills: {
          id: 'reading-interpreting-data-from-picture-graphs-with-scales',
          description:
            'Reading and interpreting data from picture graphs with scales',
          questions: [
            {
              question: 'How many students chose option B?',
              answer: 15,
              explanation: ['15 students chose option B'],
            },
          ],
        },
      },
    ],
  },
  {
    id: 'f8f4e8b5-6988-49d9-b4a4-1ab86f8c235e',
    name: 'Whole Numbers',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subStrandTopics: [
      {
        id: 'f52a4eaf-3f5e-475d-b19e-8f4a37da4bcf',
        name: 'Numbers up to 10000',
        difficulty: 3,
        skills: [
          {
            id: 'counting-in-hundreds-thousands',
            description: 'Counting in hundreds/thousands',
            questions: [
              {
                question: 'What is the sum of 500, 3000, and 2000?',
                answer: 5500,
                explanation: ['500 + 3000 + 2000 = 5500'],
              },
            ],
          },
          {
            id: 'number-notation-representations-place-values',
            description:
              'Number notation, representations and place values (thousands, hundreds, tens, ones)',
            questions: [
              {
                question: '(undefined)',
                answer: '(undefined)',
                explanation: ['(undefined)'],
              },
            ],
          },
          {
            id: 'reading-writing-numbers',
            description: 'Reading and writing numbers in numerals and in words',
            questions: [
              {
                question: 'Write 5500 in words',
                answer: 'five thousand five hundred',
                explanation: ['5500 in words is five thousand five hundred'],
              },
              {
                question: 'Write five thousand five hundred in numerals',
                answer: 5500,
                explanation: ['five thousand five hundred in numerals is 5500'],
              },
            ],
          },
          {
            id: 'patterns-in-number-sequences',
            description: 'Patterns in number sequences',
            questions: [
              {
                question:
                  'Write down the next numbers in the sequence: 1000, 2000, 3000, 4000, ___',
                answer: 5000,
                explanation: ['The sequence increases by 1000 each time'],
              },
              {
                question:
                  'Write down the next numbers in the sequence: 6, 10, 14, 18, ___',
                answer: 22,
                explanation: ['The sequence increases by 4 each time'],
              },
            ],
          },
        ],
      },
      {
        id: '799d2311-750d-462e-9f5a-da180a12f658',
        name: 'Addition and Subtraction',
        difficulty: 3,
        skills: [
          {
            id: 'addition-subtraction-algorithms',
            description: 'Addition and subtraction algorithms (up to 4 digits)',
            questions: [
              {
                question: 'What is the sum of 4,567 and 2,345?',
                answer: 6912,
                explanation: ['4,567 + 2,345 = 6,912'],
              },
              {
                question: 'What is the difference between 8,765 and 3,456?',
                answer: 5309,
                explanation: ['8,765 - 3,456 = 5,309'],
              },
            ],
          },
          {
            id: 'mental-calculation',
            description:
              'Mental calculation involving addition and subtraction of two 2-digit numbers',
            questions: [
              {
                question: 'What is 34 + 27?',
                answer: 61,
                explanation: ['34 + 27 = 61'],
              },
              {
                question: 'What is 76 - 48?',
                answer: 28,
                explanation: ['76 - 48 = 28'],
              },
            ],
          },
        ],
      },
      {
        id: '26fafdfa-f587-40ef-863b-469d29372657',
        name: 'Multiplication and Division',
        difficulty: 3,
        skills: [
          {
            id: 'multiplication-tables-advanced',
            description: 'Multiplication tables of 6, 7, 8 and 9',
            questions: [
              {
                question: 'What is the product of 6 and 7?',
                answer: 42,
                explanation: ['6 × 7 = 42'],
                variables: [
                  {
                    questionText:
                      'What is the product of {number1} and {number2}?',
                    min: 6,
                    max: 9,
                  },
                ],
              },
              {
                question:
                  'Complete the multiplication table for 7: 7 × 1 = 7, 7 × 2 = 14, ...',
                answer: '7, 14, 21, 28, 35, 42, 49, 56, 63, 70',
                explanation: ['Multiply 7 by each number from 1 to 10'],
                variables: [
                  {
                    questionText:
                      'Complete the multiplication table for {number}: {number} × 1 = {first}, {number} × 2 = {second}, ...',
                    min: 6,
                    max: 9,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiply-divide-tables-advanced',
            description:
              'Multiplying and dividing within the multiplication tables',
            questions: [
              {
                question: 'What is 56 ÷ 7?',
                answer: 8,
                explanation: ['56 ÷ 7 = 8'],
                variables: [
                  {
                    questionText: 'What is {number1} ÷ {number2}?',
                    min: 6,
                    max: 9,
                  },
                ],
              },
            ],
          },
          {
            id: 'division-remainder',
            description: 'Division with remainder',
            questions: [
              {
                question: 'What is the remainder when 47 is divided by 8?',
                answer: 7,
                explanation: ['47 = 8 × 5 + 7, so the remainder is 7'],
                variables: [
                  {
                    questionText:
                      'What is the remainder when {number1} is divided by {number2}?',
                    min: 20,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiplication-algorithm',
            description:
              'Multiplication and division algorithms (up to 3 digits by 1 digit)',
            questions: [
              {
                question: 'What is the product of 234 and 6?',
                answer: 1404,
                explanation: ['234 × 6 = 1404'],
                variables: [
                  {
                    questionText:
                      'What is the product of {number1} and {number2}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
          {
            id: 'mental-calculation',
            description:
              'Mental calculation involving multiplication and division within multiplication tables',
            questions: [
              {
                question: 'Multiply 25 by 4 mentally',
                answer: 100,
                explanation: ['25 × 4 = 100'],
                variables: [
                  {
                    questionText: 'Multiply {number1} by {number2} mentally',
                    min: 2,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '463f2115-8bcd-4f2f-9fe6-f66e85cea0c4',
    name: 'Fractions',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subStrandTopics: [
      {
        id: '75f07d13-6b93-4b92-9590-de059db3e7b5',
        name: 'Equivalent Fractions',
        difficulty: 3,
        skills: [
          {
            id: 'expressing-a-fraction-in-its-simplest-form',
            description: 'Expressing a fraction in its simplest form',
            questions: [
              {
                question: 'Reduce 4/8 to its simplest form',
                answer: 0.5,
                explanation: ['4/8 = 1/2'],
              },
            ],
          },
          {
            id: 'comparing-ordering-fractions',
            description:
              'Comparing and ordering unlike fractions with denominators not exceeding 12',
            questions: [
              {
                question: 'Which is greater: 2/3 or 3/4?',
                answer: 3 / 4,
                explanation: ['3/4 is greater than 2/3'],
              },
              {
                question:
                  'Order the fractions 1/2, 2/3, and 3/4 from least to greatest',
                answer: [1 / 2, 2 / 3, 3 / 4],
                explanation: [
                  '1/2 = 0.5, 2/3 ≈ 0.67, 3/4 = 0.75, so the order is 1/2, 2/3, 3/4',
                ],
              },
            ],
          },
          {
            id: 'writing-equivalent-fractions',
            description:
              'Writing equivalent fractions given the denominator or numerator',
            questions: [
              {
                question:
                  'Write an equivalent fraction for 2/3 with a denominator of 9',
                answer: 6 / 9,
                explanation: ['2/3 = 6/9'],
              },
              {
                question:
                  'Write an equivalent fraction for 3/4 with a numerator of 6',
                answer: 6 / 8,
                explanation: ['3/4 = 6/8'],
              },
            ],
          },
        ],
      },
      {
        id: '8ba9d78e-1aa6-47f2-a2eb-67b34576dee3',
        name: 'Fraction Addition and Subtraction',
        difficulty: 3,
        skills: [
          {
            id: 'adding-subtracting-two-related-fractions',
            description:
              'Adding and subtracting two related fractions within one whole',
            questions: [
              {
                question: 'What is the sum of 1/4 and 1/4?',
                answer: 0.5,
                explanation: ['1/4 + 1/4 = 2/4 = 1/2'],
              },
              {
                question: 'What is the difference between 3/5 and 1/5?',
                answer: 2 / 5,
                explanation: ['3/5 - 1/5 = 2/5'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '81bd01a5-6a53-483d-bbd6-3e860b8dbaee',
    name: 'Money',
    level: 3,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.MONEY,
    subStrandTopics: [
      {
        id: 'c9d4be29-ba85-4f21-969b-19e1653b82c7',
        name: 'Money Operations',
        difficulty: 3,
        skills: [
          {
            id: 'add-subtract-money',
            description: 'Adding and subtracting money in decimal notation',
            questions: [
              {
                question:
                  'What is the total amount of money if you have $0.75 and $0.20?',
                answer: 0.95,
                explanation: ['$0.75 + $0.20 = $0.95'],
                variables: [
                  {
                    questionText:
                      'What is the total amount of money if you have ${amount1} and ${amount2}?',
                    min: 0.01,
                    max: 10.0,
                  },
                ],
              },
              {
                question:
                  'If you have $5.00 and spend $2.50, how much money do you have left?',
                answer: 2.5,
                explanation: ['$5.00 - $2.50 = $2.50'],
                variables: [
                  {
                    questionText:
                      'If you have ${initial} and spend ${spent}, how much money do you have left?',
                    min: 0.01,
                    max: 20.0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '15ab9b72-0b91-4cb1-8742-e3668fd0c006',
    name: 'Length, Mass and Volume',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.MEASUREMENT,
    subStrandTopics: [
      {
        id: 'ef0f0734-2e16-4251-ab4f-9b47c69be3bd',
        name: 'Length, Mass and Volume',
        difficulty: 3,
        skills: [
          {
            id: 'measure-km',
            description: 'Measuring length in kilometres (km)',
            questions: [
              {
                question:
                  'What is the length of a road that is 5 kilometers long?',
                answer: 5,
                explanation: ['The length is 5 kilometers'],
                variables: [
                  {
                    questionText:
                      'What is the length of a {object} that is {length} kilometers long?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'measure-ml',
            description: 'Measuring volume of liquid in millilitres (ml)',
            questions: [
              {
                question: 'How many milliliters are in 2.5 litres?',
                answer: 2500,
                explanation: ['1 litre = 1000 millilitres, so 2.5 L = 2500 mL'],
                variables: [
                  {
                    questionText:
                      'How many milliliters are in {number} litres?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'compound-units',
            description: 'Measuring length/mass/volume in compound units',
            questions: [
              {
                question: 'Express 2500 meters as kilometers and meters',
                answer: '2 km 500 m',
                explanation: ['2500 m = 2 km 500 m (since 1 km = 1000 m)'],
                variables: [
                  {
                    questionText:
                      'Express {meters} meters as kilometers and meters',
                    min: 1000,
                    max: 9999,
                  },
                ],
              },
            ],
          },
          {
            id: 'convert-smaller-unit',
            description:
              'Converting a compound unit to the smaller unit (kilometres and metres)',
            questions: [
              {
                question: 'How many metres are in 3 km 500 m?',
                answer: 3500,
                explanation: ['3 km = 3000 m, so 3 km 500 m = 3500 m'],
                variables: [
                  {
                    questionText: 'How many metres are in {km} km {m} m?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'convert-larger-unit',
            description:
              'Converting a compound unit to the larger unit (metres and centimetres)',
            questions: [
              {
                question: 'Express 325 cm as metres and centimetres',
                answer: '3 m 25 cm',
                explanation: ['325 cm = 3 m 25 cm (since 1 m = 100 cm)'],
                variables: [
                  {
                    questionText: 'Express {cm} cm as metres and centimetres',
                    min: 100,
                    max: 999,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cc793e52-fd19-4ed1-9002-86c54dda9aa0',
        name: 'Time',
        difficulty: 3,
        skills: [
          {
            id: 'measuring-seconds',
            description: 'Measuring time in seconds',
            questions: [
              {
                question: 'How many seconds are in 2 minutes?',
                answer: 120,
                explanation: [
                  '1 minute = 60 seconds, so 2 minutes = 120 seconds',
                ],
                variables: [
                  {
                    questionText: 'How many seconds are in {minutes} minutes?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'time-duration',
            description: 'Finding starting time, finishing time or duration',
            questions: [
              {
                question:
                  'If an event starts at 2:30 PM and ends at 4:00 PM, how long did it last?',
                answer: '1:30',
                explanation: [
                  'Duration = end time - start time = 4:00 PM - 2:30 PM = 1 hour 30 minutes',
                ],
                variables: [
                  {
                    questionText:
                      'If an event starts at {start_time} and ends at {end_time}, how long did it last?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: '24-hour-clock',
            description: '24-hour clock',
            questions: [
              {
                question: 'What is 3:30 PM in 24-hour time?',
                answer: '15:30',
                explanation: [
                  'In 24-hour time, add 12 to hours after noon, so 3:30 PM = 15:30',
                ],
                variables: [
                  {
                    questionText: 'What is {time} in 24-hour time?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '249f9bd2-2edd-4471-ba3a-6c367c1720fc',
    name: 'Area and Volume',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subStrandTopics: [
      {
        id: '3d8d1794-76b1-490e-bd07-4da12c185a66',
        name: 'Area and Perimeter',
        difficulty: 3,
        skills: [
          {
            id: 'area-concept',
            description: 'Concepts of area and perimeter of a plane figure',
            questions: [
              {
                question:
                  'What is the perimeter of a square with side length 5 cm?',
                answer: 20,
                explanation: ['Perimeter = 4 × side length = 4 × 5 cm = 20 cm'],
                variables: [
                  {
                    questionText:
                      'What is the perimeter of a square with side length {length} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'area-units',
            description: 'Measuring area in square units, cm² and m²',
            questions: [
              {
                question: 'How many square centimeters are in 1 square meter?',
                answer: 10000,
                explanation: ['1 m² = 100 cm × 100 cm = 10,000 cm²'],
                variables: [
                  {
                    questionText:
                      'How many square centimeters are in {number} square meter?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'rectilinear-perimeter',
            description: 'Perimeter of rectilinear figure',
            questions: [
              {
                question:
                  'What is the perimeter of a rectilinear figure with sides 3 cm, 4 cm, 3 cm, and 4 cm?',
                answer: 14,
                explanation: [
                  'Perimeter = sum of all sides = 3 cm + 4 cm + 3 cm + 4 cm = 14 cm',
                ],
                variables: [
                  {
                    questionText:
                      'What is the perimeter of a rectilinear figure with sides {side1} cm, {side2} cm, {side3} cm, and {side4} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'rectangle-area',
            description: 'Area of rectangle',
            questions: [
              {
                question:
                  'What is the area of a rectangle with length 6 cm and width 4 cm?',
                answer: 24,
                explanation: ['Area = length × width = 6 cm × 4 cm = 24 cm²'],
                variables: [
                  {
                    questionText:
                      'What is the area of a rectangle with length {length} cm and width {width} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'square-area',
            description: 'Area of square',
            questions: [
              {
                question: 'What is the area of a square with side length 5 cm?',
                answer: 25,
                explanation: [
                  'Area = side length × side length = 5 cm × 5 cm = 25 cm²',
                ],
                variables: [
                  {
                    questionText:
                      'What is the area of a square with side length {length} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '306cc28d-20c4-4a44-8d6c-85364bb90817',
    name: 'Geometry',
    level: 3,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subStrandTopics: [
      {
        id: 'e4b0716d-0bed-4e1d-a848-d7e9025083ce',
        name: 'Angles',
        difficulty: 3,
        skills: [
          {
            id: 'angle-concept',
            description: 'Concepts of angle',
            questions: [
              {
                question: 'What is an angle?',
                answer:
                  'The amount of turn between two lines around their common point',
                explanation: [
                  'An angle is formed when two lines meet at a point',
                ],
                variables: [
                  {
                    questionText: 'What is an angle?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'right-angles',
            description: 'Right angles',
            questions: [
              {
                question: 'How many degrees are in a right angle?',
                answer: 90,
                explanation: ['A right angle is 90 degrees'],
                variables: [
                  {
                    questionText: 'How many degrees are in a right angle?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'angle-comparison',
            description: 'Angles greater than/smaller than a right angle',
            questions: [
              {
                question:
                  'Is 120 degrees greater than or smaller than a right angle?',
                answer: 'greater than',
                explanation: [
                  '120 degrees is greater than a right angle (90 degrees)',
                ],
                variables: [
                  {
                    questionText:
                      'Is {degrees} degrees greater than or smaller than a right angle?',
                    min: 0,
                    max: 180,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'db0e73c2-c426-43cb-af4d-77be7fc93379',
        name: 'Perpendicular and Parallel Lines',
        difficulty: 3,
        skills: [
          {
            id: 'line-concepts',
            description: 'Perpendicular and parallel lines',
            questions: [
              {
                question: 'What is the angle between perpendicular lines?',
                answer: 90,
                explanation: [
                  'Perpendicular lines meet at a right angle (90 degrees)',
                ],
                variables: [
                  {
                    questionText:
                      'What is the angle between perpendicular lines?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                question: 'What is special about parallel lines?',
                answer: 'They never meet',
                explanation: [
                  'Parallel lines are always the same distance apart and never intersect',
                ],
                variables: [
                  {
                    questionText: 'What is special about parallel lines?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'drawing-lines',
            description: 'Drawing perpendicular and parallel lines',
            questions: [
              {
                question: 'Draw a line perpendicular to line AB at point P.',
                answer: null,
                explanation: [
                  'Use a set square to draw a line at 90 degrees to line AB through point P',
                ],
                variables: [
                  {
                    questionText:
                      'Draw a line perpendicular to line {line} at point {point}.',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '5d68b8d7-0588-4405-b57a-7c5d5ff96ba6',
    name: 'Data Representation and Interpretation',
    level: 3,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_REPRESENTATION_AND_INTERPRETATION,
    subStrandTopics: [
      {
        id: '26c66f6d-8be5-4fb8-8171-a04960326a34',
        name: 'Bar Graphs',
        difficulty: 3,
        skills: [
          {
            id: 'read-bar-graphs',
            description: 'Reading and interpreting data from bar graphs',
            questions: [
              {
                question: 'How many students chose option A in the bar graph?',
                answer: 20,
                explanation: [
                  'Looking at the bar for option A, we can see it reaches 20 on the vertical axis',
                ],
                variables: [
                  {
                    questionText:
                      'How many students chose option {option} in the bar graph?',
                    min: 1,
                    max: 50,
                  },
                ],
              },
              {
                question: 'Which option was chosen by the most students?',
                answer: 'A',
                explanation: [
                  'Looking at all bars, option A has the highest bar reaching 20 students',
                ],
                variables: [
                  {
                    questionText:
                      'Which option was chosen by the most students?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
            ],
          },
          {
            id: 'scale-usage',
            description: 'Using different scales on axis',
            questions: [
              {
                question:
                  'If each unit on the vertical axis represents 5 students, how many students chose option B?',
                answer: 25,
                explanation: [
                  'The bar for option B reaches 5 units, and each unit represents 5 students, so 5 × 5 = 25 students',
                ],
                variables: [
                  {
                    questionText:
                      'If each unit on the vertical axis represents {scale} students, how many students chose option {option}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '92518db0-110b-4d49-8414-2834443f57ee',
    name: 'Numbers up to 10 million',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subStrandTopics: [
      {
        id: 'ebb0afa6-f43d-4742-9732-ebe44087a7d4',
        name: 'Numbers up to 10 million',
        difficulty: 5,
        skills: [
          {
            id: 'read-write-numbers',
            description:
              'Reading and writing numbers in numerals and in words up to 10 million',
            questions: [
              {
                question: 'Write 1,999,000 in words',
                answer: 'one million nine hundred and ninety-nine thousand',
                explanation: [
                  'Break down the number: 1 million + 999 thousand = one million nine hundred and ninety-nine thousand',
                ],
                variables: [
                  {
                    questionText: 'Write {number} in words',
                    min: 1000000,
                    max: 9999999,
                  },
                ],
              },
              {
                question:
                  'Write the number for five million three hundred thousand',
                answer: 5300000,
                explanation: [
                  '5 million = 5,000,000, three hundred thousand = 300,000, so 5,300,000',
                ],
                variables: [
                  {
                    questionText: 'Write the number for {number_in_words}',
                    min: 1000000,
                    max: 9999999,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6e83b314-de87-4726-b14c-3375c241bb6d',
    name: 'Four Operations',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.WHOLE_NUMBERS,
    subStrandTopics: [
      {
        id: '3e7bb46a-8165-40e9-b9c2-a4fbbd589350',
        name: 'Four Operations',
        difficulty: 5,
        skills: [
          {
            id: 'multiply-divide-powers',
            description:
              'Multiplying and dividing by 10, 100, 1000 and their multiples without calculator',
            questions: [
              {
                question: 'What is 456 × 100?',
                answer: 45600,
                explanation: [
                  'When multiplying by 100, add two zeros to the end of the number',
                ],
                variables: [
                  {
                    questionText: 'What is {number} × {multiplier}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
              {
                question: 'What is 45600 ÷ 1000?',
                answer: 45.6,
                explanation: [
                  'When dividing by 1000, move the decimal point 3 places to the left',
                ],
                variables: [
                  {
                    questionText: 'What is {number} ÷ {divisor}?',
                    min: 1000,
                    max: 999999,
                  },
                ],
              },
            ],
          },
          {
            id: 'order-operations',
            description: 'Order of operations without calculator',
            questions: [
              {
                question: 'What is 5 + 3 × 4?',
                answer: 17,
                explanation: [
                  'Multiplication before addition: 3 × 4 = 12, then 5 + 12 = 17',
                ],
                variables: [
                  {
                    questionText: 'What is {number1} + {number2} × {number3}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'use-brackets',
            description: 'Use of brackets without calculator',
            questions: [
              {
                question: 'What is (5 + 3) × 4?',
                answer: 32,
                explanation: ['Brackets first: 5 + 3 = 8, then 8 × 4 = 32'],
                variables: [
                  {
                    questionText:
                      'What is ({number1} + {number2}) × {number3}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '9489591d-cecc-428f-8767-a5b7d89efcfa',
    name: 'Fraction and Division',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subStrandTopics: [
      {
        id: '5aeb6594-9e8b-4b27-8b83-fa814d0e19e1',
        name: 'Fraction and Division',
        difficulty: 5,
        skills: [
          {
            id: 'division-as-fraction',
            description:
              'Dividing a whole number by a whole number with quotient as a fraction',
            questions: [
              {
                question: 'Express 3 ÷ 4 as a fraction',
                answer: '3/4',
                explanation: [
                  'When dividing whole numbers, the result can be written as a fraction: 3 ÷ 4 = 3/4',
                ],
                variables: [
                  {
                    questionText: 'Express {number1} ÷ {number2} as a fraction',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'fraction-to-decimal',
            description: 'Expressing fractions as decimals',
            questions: [
              {
                question: 'Convert 3/4 to a decimal',
                answer: 0.75,
                explanation: ['3/4 = 3 ÷ 4 = 0.75'],
                variables: [
                  {
                    questionText: 'Convert {fraction} to a decimal',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cd65fa82-1618-4b08-a6c3-af10b23f0820',
        name: 'Fraction and Four Operations',
        difficulty: 5,
        skills: [
          {
            id: 'mixed-numbers',
            description: 'Adding and subtracting mixed numbers',
            questions: [
              {
                question: 'What is 2 1/4 + 1 3/4?',
                answer: 4,
                explanation: [
                  'First add whole numbers: 2 + 1 = 3, then add fractions: 1/4 + 3/4 = 1, so total is 4',
                ],
                variables: [
                  {
                    questionText:
                      'What is {whole1} {fraction1} + {whole2} {fraction2}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiply-fractions',
            description:
              'Multiplying proper/improper fractions and whole numbers',
            questions: [
              {
                question: 'What is 2/3 × 6?',
                answer: 4,
                explanation: ['2/3 × 6 = (2 × 6)/(3 × 1) = 12/3 = 4'],
                variables: [
                  {
                    questionText: 'What is {fraction} × {whole}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
              {
                question: 'What is 3/4 × 2/3?',
                answer: 0.5,
                explanation: ['3/4 × 2/3 = (3 × 2)/(4 × 3) = 6/12 = 1/2 = 0.5'],
                variables: [
                  {
                    questionText: 'What is {fraction1} × {fraction2}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
          {
            id: 'multiply-mixed-numbers',
            description: 'Multiplying mixed numbers and whole numbers',
            questions: [
              {
                question: 'What is 1 1/2 × 4?',
                answer: 6,
                explanation: [
                  'Convert 1 1/2 to improper fraction: 3/2, then 3/2 × 4 = 12/2 = 6',
                ],
                variables: [
                  {
                    questionText: 'What is {mixed} × {whole}?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'a8887948-05ec-43a8-8404-5b25f7a828c0',
    name: 'Decimals',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.DECIMALS,
    subStrandTopics: [
      {
        id: 'a4b41fdd-18ea-4175-960f-16755d965124',
        name: 'Decimals and Four Operations',
        difficulty: 5,
        skills: [
          {
            id: 'multiplying-dividing-decimals-by-10-100-1000-and-their-multiples-without-calculator',
            questions: [
              {
                question: 'What is 2.41 × 100?',
                answer: 241,
                explanation: [
                  'When multiplying by 100, move the decimal point 2 places to the right',
                ],
                variables: [
                  {
                    questionText: 'What is {number} × {multiplier}?',
                    min: 100,
                    max: 999,
                  },
                ],
              },
              {
                question: 'What is 241 ÷ 1000?',
                answer: 0.241,
                explanation: [
                  'When dividing by 1000, move the decimal point 3 places to the left',
                ],
                variables: [
                  {
                    questionText: 'What is {number} ÷ {divisor}?',
                    min: 1000,
                    max: 999999,
                  },
                ],
              },
            ],
          },
          {
            id: 'converting-a-measurement-from-a-smaller-unit-to-a-larger-unit-in-decimal-form-and-vice-versa-between-km-and-m-kg-and-g-l-and-ml',
            questions: [
              {
                question: 'What is 2.41 km in meters?',
                answer: 2410,
                explanation: [
                  '1 km = 1000 m, so 2.41 km = 2.41 × 1000 m = 2410 m',
                ],
                variables: [
                  {
                    questionText: 'What is {number} km in meters?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
              {
                question: 'What is 2410 m in kilometers?',
                answer: 2.41,
                explanation: [
                  '1 km = 1000 m, so 2410 m = 2410 ÷ 1000 km = 2.41 km',
                ],
                variables: [
                  {
                    questionText: 'What is {number} m in kilometers?',
                    min: 1000,
                    max: 999999,
                  },
                ],
              },
              {
                question: 'What is 2.41 kg in grams?',
                answer: 2410,
                explanation: [
                  '1 kg = 1000 g, so 2.41 kg = 2.41 × 1000 g = 2410 g',
                ],
                variables: [
                  {
                    questionText: 'What is {number} kg in grams?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
              {
                question: 'What is 2410 g in kilograms?',
                answer: 2.41,
                explanation: [
                  '1 kg = 1000 g, so 2410 g = 2410 ÷ 1000 kg = 2.41 kg',
                ],
                variables: [
                  {
                    questionText: 'What is {number} g in kilograms?',
                    min: 1000,
                    max: 999999,
                  },
                ],
              },
              {
                question: 'What is 2.41 L in milliliters?',
                answer: 2410,
                explanation: [
                  '1 L = 1000 mL, so 2.41 L = 2.41 × 1000 mL = 2410 mL',
                ],
                variables: [
                  {
                    questionText: 'What is {number} L in milliliters?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
              {
                question: 'What is 2410 mL in liters?',
                answer: 2.41,
                explanation: [
                  '1 L = 1000 mL, so 2410 mL = 2410 ÷ 1000 L = 2.41 L',
                ],
                variables: [
                  {
                    questionText: 'What is {number} mL in liters?',
                    min: 1000,
                    max: 999999,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6d1384af-0297-47af-a7d3-4bc44383ee48',
    name: 'Percentage',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.PERCENTAGE,
    subStrandTopics: [
      {
        id: '8e4d67ca-7ecf-47ca-a127-9d4c1b80b9e8',
        name: 'Percentage',
        difficulty: 5,
        skills: [
          {
            id: 'finding-the-whole-given-a-part-and-the-percentage',
            description: 'Finding the whole given a part and the percentage',
            questions: [
              {
                question:
                  'What is the original price if a 20% discount reduces it to $80?',
                answer: 100,
                explanation: ['80 is 80% of the original price'],
                variables: [
                  {
                    questionText:
                      'What is the original price if a {percentage}% discount reduces it to ${part}?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'finding-percentage-increase-decrease',
            description: 'Finding percentage increase/decrease',
            questions: [
              {
                question: 'What is the percentage increase from 100 to 120?',
                answer: 20,
                explanation: [
                  'Percentage increase = ((new value - original value) / original value) × 100%',
                ],
                variables: [
                  {
                    questionText:
                      'What is the percentage increase from {original} to {new}?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'd9c65763-a499-48d7-9a7a-a506c83b4c54',
    name: 'Rate',
    level: 5,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.RATE,
    subStrandTopics: [
      {
        id: '16b5f125-92a8-436b-9777-c9c11a559080',
        name: 'Rate',
        difficulty: 5,
        skills: [
          {
            id: 'rate-concept',
            description:
              'Rate as the amount of a quantity per unit of another quantity',
            questions: [
              {
                question:
                  'If a car travels 240 kilometers in 3 hours, what is its rate in kilometers per hour?',
                answer: 80,
                explanation: [
                  'Rate = Total distance ÷ Total time = 240 km ÷ 3 h = 80 km/h',
                ],
                variables: [
                  {
                    questionText:
                      'If a car travels {distance} kilometers in {time} hours, what is its rate in kilometers per hour?',
                    min: 60,
                    max: 500,
                  },
                ],
              },
            ],
          },
          {
            id: 'find-rate',
            description: 'Finding rate given total amount and number of units',
            questions: [
              {
                question:
                  'How much does each item cost if 100 of this item cost $500?',
                answer: 5,
                explanation: [
                  'Rate = Total cost ÷ Number of items = $500 ÷ 100 = $5 per item',
                ],
                variables: [
                  {
                    questionText:
                      'How much does each item cost if {quantity} of this item cost ${total}?',
                    min: 10,
                    max: 1000,
                  },
                ],
              },
            ],
          },
          {
            id: 'find-total',
            description: 'Finding total amount given rate and number of units',
            questions: [
              {
                question:
                  'If each item costs $5 and you buy 20 items, what is the total cost?',
                answer: 100,
                explanation: [
                  'Total cost = Rate × Number of items = $5 × 20 = $100',
                ],
                variables: [
                  {
                    questionText:
                      'If each item costs ${rate} and you buy {quantity} items, what is the total cost?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'find-units',
            description: 'Finding number of units given rate and total amount',
            questions: [
              {
                question:
                  'If each item costs $4 and you spent $100, how many items did you buy?',
                answer: 25,
                explanation: [
                  'Number of items = Total cost ÷ Rate = $100 ÷ $4 = 25 items',
                ],
                variables: [
                  {
                    questionText:
                      'If each item costs ${rate} and you spent ${total}, how many items did you buy?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2707ae16-af03-4359-9402-d98c3fbc1cf9',
    name: 'Area and Volume',
    level: 5,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subStrandTopics: [
      {
        id: '19ad6e6f-09ac-41f0-b4d3-3cb7810e1845',
        name: 'Area of Triangle',
        difficulty: 5,
        skills: [
          {
            id: 'triangle-base-height',
            description: 'Concepts of base and height of a triangle',
            questions: [
              {
                question:
                  'What is the height of a triangle if its base is 6 cm and area is 15 cm²?',
                answer: 5,
                explanation: [
                  'Area = 1/2 × base × height, so height = (2 × area) ÷ base = (2 × 15) ÷ 6 = 5 cm',
                ],
                variables: [
                  {
                    questionText:
                      'What is the height of a triangle if its base is {base} cm and area is {area} cm²?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'triangle-area',
            description: 'Area of triangle',
            questions: [
              {
                question:
                  'What is the area of a triangle with base 10 cm and height 5 cm?',
                answer: 25,
                explanation: [
                  'Area = 1/2 × base × height = 1/2 × 10 cm × 5 cm = 25 cm²',
                ],
                variables: [
                  {
                    questionText:
                      'What is the area of a triangle with base {base} cm and height {height} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'composite-area',
            description: 'Finding area of composite figures with triangles',
            questions: [
              {
                question:
                  'What is the total area of a rectangle with base 8 cm and height 6 cm combined with a triangle with base 8 cm and height 4 cm?',
                answer: 64,
                explanation: [
                  'Rectangle area = 8 × 6 = 48 cm², Triangle area = 1/2 × 8 × 4 = 16 cm², Total = 48 + 16 = 64 cm²',
                ],
                variables: [
                  {
                    questionText:
                      'What is the total area of a rectangle with base {rect_base} cm and height {rect_height} cm combined with a triangle with base {tri_base} cm and height {tri_height} cm?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'fc1f9d5a-14df-4345-ad80-1ff84ce6a04f',
        name: 'Volume of Cube and Cuboid',
        difficulty: 5,
        skills: [
          {
            id: 'find-dimension',
            description:
              'Finding one dimension of a cuboid given its volume and the other dimensions',
            questions: [
              {
                question:
                  'A cuboid has volume 120 cm³, length 6 cm, and width 4 cm. What is its height?',
                answer: 5,
                explanation: [
                  'Volume = length × width × height, so height = volume ÷ (length × width) = 120 ÷ (6 × 4) = 5 cm',
                ],
                variables: [
                  {
                    questionText:
                      'A cuboid has volume {volume} cm³, length {length} cm, and width {width} cm. What is its height?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'cube-edge',
            description:
              'Finding the length of one edge of a cube given its volume',
            questions: [
              {
                question:
                  'What is the length of each edge of a cube with volume 64 cm³?',
                answer: 4,
                explanation: [
                  'For a cube, volume = edge³, so edge = ∛volume = ∛64 = 4 cm',
                ],
                variables: [
                  {
                    questionText:
                      'What is the length of each edge of a cube with volume {volume} cm³?',
                    min: 1,
                    max: 1000,
                  },
                ],
              },
            ],
          },
          {
            id: 'cuboid-height',
            description:
              'Finding the height of a cuboid given its volume and base area',
            questions: [
              {
                question:
                  'A cuboid has volume 90 cm³ and base area 18 cm². What is its height?',
                answer: 5,
                explanation: [
                  'Volume = base area × height, so height = volume ÷ base area = 90 ÷ 18 = 5 cm',
                ],
                variables: [
                  {
                    questionText:
                      'A cuboid has volume {volume} cm³ and base area {area} cm². What is its height?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'face-area',
            description:
              'Finding the area of a face of a cuboid given its volume and one dimension',
            questions: [
              {
                question:
                  'A cuboid has volume 120 cm³ and height 5 cm. What is the area of its base?',
                answer: 24,
                explanation: [
                  'Volume = base area × height, so base area = volume ÷ height = 120 ÷ 5 = 24 cm²',
                ],
                variables: [
                  {
                    questionText:
                      'A cuboid has volume {volume} cm³ and height {height} cm. What is the area of its base?',
                    min: 1,
                    max: 100,
                  },
                ],
              },
            ],
          },
          {
            id: 'roots',
            description: 'Use of square root and cube root',
            questions: [
              {
                question: 'What is the cube root of 125?',
                answer: 5,
                explanation: ['∛125 = 5 because 5³ = 5 × 5 × 5 = 125'],
                variables: [
                  {
                    questionText: 'What is the cube root of {number}?',
                    min: 1,
                    max: 1000,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '35b36126-7574-4e5e-9599-eeb352b4de55',
    name: 'Special Quadrilaterals',
    level: 6,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subStrandTopics: [
      {
        id: '7ea76274-0a70-4b58-9076-4f66d04d8027',
        name: 'Special Quadrilaterals',
        difficulty: 6,
        skills: [
          {
            id: 'unknown-angles',
            description:
              'Finding unknown angles, without additional construction of lines, in composite geometric figures involving squares, rectangles, triangles, parallelograms, rhombuses and trapeziums',
            questions: [
              {
                question:
                  'In a parallelogram, if one angle is 60°, what are the other angles?',
                answer: '120°, 60°, 120°',
                explanation: [
                  'In a parallelogram, opposite angles are equal and adjacent angles are supplementary (sum to 180°)',
                ],
                variables: [
                  {
                    questionText:
                      'In a parallelogram, if one angle is {angle}°, what are the other angles?',
                    min: 1,
                    max: 179,
                  },
                ],
              },
              {
                question: 'In a rectangle, what is the measure of each angle?',
                answer: 90,
                explanation: [
                  'All angles in a rectangle are right angles (90°)',
                ],
                variables: [
                  {
                    questionText:
                      'In a rectangle, what is the measure of each angle?',
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                question:
                  'In a trapezium, if three angles are 90°, 60°, and 90°, what is the fourth angle?',
                answer: 120,
                explanation: [
                  'The sum of angles in a quadrilateral is 360°, so 360° - (90° + 60° + 90°) = 120°',
                ],
                variables: [
                  {
                    questionText:
                      'In a trapezium, if three angles are {angle1}°, {angle2}°, and {angle3}°, what is the fourth angle?',
                    min: 1,
                    max: 178,
                  },
                ],
              },
            ],
          },
          {
            id: 'properties-relationships',
            description:
              'Understanding and applying the properties and relationships of special quadrilaterals including squares, rectangles, parallelograms, rhombuses, and trapeziums',
            questions: [
              {
                question:
                  'Which of these is always true for a rhombus? a) All sides are equal b) All angles are equal c) Diagonals are equal',
                answer: 'a) All sides are equal',
                explanation: [
                  'A rhombus is a quadrilateral with four equal sides',
                  'The angles in a rhombus are not necessarily equal',
                  'The diagonals in a rhombus are not necessarily equal',
                ],
                variables: [],
              },
              {
                question:
                  'If a quadrilateral has exactly one pair of parallel sides, what type of quadrilateral is it?',
                answer: 'Trapezium',
                explanation: [
                  'A trapezium is defined as a quadrilateral with exactly one pair of parallel sides',
                ],
                variables: [],
              },
              {
                question:
                  'What special type of parallelogram has perpendicular diagonals that bisect each other?',
                answer: 'Rhombus',
                explanation: [
                  'A rhombus has diagonals that are perpendicular and bisect each other',
                  'This is a unique property that distinguishes rhombuses from other parallelograms',
                ],
                variables: [],
              },
            ],
          },
          {
            id: 'diagonal-properties',
            description:
              'Understanding and applying the properties of diagonals in special quadrilaterals',
            questions: [
              {
                question: 'In a rectangle, what is true about the diagonals?',
                answer:
                  'The diagonals are equal in length and bisect each other',
                explanation: [
                  'Rectangle diagonals have two key properties: they are equal in length and they bisect each other',
                ],
                variables: [],
              },
              {
                question:
                  'If the diagonals of a quadrilateral bisect each other at right angles and are equal in length, what type of quadrilateral is it?',
                answer: 'Square',
                explanation: [
                  'This combination of diagonal properties - equal length, perpendicular, and bisecting - is unique to squares',
                ],
                variables: [],
              },
              {
                question:
                  'In a parallelogram, what is the one property that is always true about the diagonals?',
                answer: 'The diagonals bisect each other',
                explanation: [
                  'While the diagonals of a parallelogram may not be equal or perpendicular, they always bisect each other',
                ],
                variables: [],
              },
            ],
          },
          {
            id: 'area-perimeter',
            description:
              'Calculating and comparing areas and perimeters of special quadrilaterals',
            questions: [
              {
                question:
                  'A square has a side length of 6 cm. What is its area?',
                answer: '36',
                explanation: [
                  'The area of a square is side length squared',
                  'Area = 6 × 6 = 36 square centimeters',
                ],
                variables: [
                  {
                    questionText:
                      'A square has a side length of {length} cm. What is its area?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
              {
                question:
                  'A rectangle has length 8 cm and width 5 cm. What is its perimeter?',
                answer: '26',
                explanation: [
                  'The perimeter of a rectangle is 2(length + width)',
                  'Perimeter = 2(8 + 5) = 2(13) = 26 centimeters',
                ],
                variables: [
                  {
                    questionText:
                      'A rectangle has length {length} cm and width {width} cm. What is its perimeter?',
                    min: 1,
                    max: 15,
                  },
                ],
              },
              {
                question:
                  'A parallelogram has base 7 cm and height 4 cm. What is its area?',
                answer: '28',
                explanation: [
                  'The area of a parallelogram is base × height',
                  'Area = 7 × 4 = 28 square centimeters',
                ],
                variables: [
                  {
                    questionText:
                      'A parallelogram has base {base} cm and height {height} cm. What is its area?',
                    min: 1,
                    max: 12,
                  },
                ],
              },
              {
                question:
                  'A trapezium has parallel sides of lengths 6 cm and 10 cm, and a height of 4 cm. What is its area?',
                answer: '32',
                explanation: [
                  'The area of a trapezium is h(a + b)/2 where h is height and a,b are parallel sides',
                  'Area = 4(6 + 10)/2 = 4 × 16/2 = 32 square centimeters',
                ],
                variables: [
                  {
                    questionText:
                      'A trapezium has parallel sides of lengths {side1} cm and {side2} cm, and a height of {height} cm. What is its area?',
                    min: 2,
                    max: 15,
                  },
                ],
              },
            ],
          },
          {
            id: 'problem-solving',
            description:
              'Solving real-world problems involving special quadrilaterals and their properties',
            questions: [
              {
                question:
                  'A rectangular garden is 15m long and 10m wide. How much fencing is needed to enclose it completely?',
                answer: '50',
                explanation: [
                  'This is a perimeter problem',
                  'Perimeter = 2(length + width) = 2(15 + 10) = 2(25) = 50 meters',
                ],
                variables: [
                  {
                    questionText:
                      'A rectangular garden is {length}m long and {width}m wide. How much fencing is needed to enclose it completely?',
                    min: 5,
                    max: 25,
                  },
                ],
              },
              {
                question:
                  'A square tile has an area of 36 square centimeters. What is the length of each side?',
                answer: '6',
                explanation: [
                  'For a square, side length is the square root of area',
                  'Side length = √36 = 6 centimeters',
                ],
                variables: [
                  {
                    questionText:
                      'A square tile has an area of {area} square centimeters. What is the length of each side?',
                    min: 4,
                    max: 100,
                  },
                ],
              },
              {
                question:
                  'A parallelogram-shaped sign has a base of 8m and an area of 40 square meters. What is its height?',
                answer: '5',
                explanation: [
                  'Area of parallelogram = base × height',
                  'Height = Area ÷ base = 40 ÷ 8 = 5 meters',
                ],
                variables: [
                  {
                    questionText:
                      'A parallelogram-shaped sign has a base of {base}m and an area of {area} square meters. What is its height?',
                    min: 2,
                    max: 20,
                  },
                ],
              },
            ],
          },
          {
            id: 'similarity-congruence',
            description:
              'Understanding similarity and congruence in special quadrilaterals',
            questions: [
              {
                question:
                  'If two rectangles have the same length-to-width ratio but different sizes, what can we say about them?',
                answer: 'They are similar',
                explanation: [
                  'Rectangles with the same length-to-width ratio are similar',
                  'Similar shapes have the same shape but may have different sizes',
                ],
                variables: [],
              },
              {
                question:
                  'If two squares have sides of 5cm, what can we say about them?',
                answer: 'They are congruent',
                explanation: [
                  'Squares with equal sides are congruent',
                  'Congruent shapes have exactly the same size and shape',
                ],
                variables: [
                  {
                    questionText:
                      'If two squares have sides of {length}cm, what can we say about them?',
                    min: 1,
                    max: 20,
                  },
                ],
              },
              {
                question:
                  'A rectangle has length 12cm and width 8cm. Another rectangle has length 6cm and width 4cm. What is the relationship between these rectangles?',
                answer: 'Similar',
                explanation: [
                  'Both rectangles have a length-to-width ratio of 3:2',
                  'The second rectangle is a half-scale version of the first',
                ],
                variables: [
                  {
                    questionText:
                      'A rectangle has length {length1}cm and width {width1}cm. Another rectangle has length {length2}cm and width {width2}cm. What is the relationship between these rectangles?',
                    min: 2,
                    max: 16,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '5933f320-f501-4d8a-a6f9-63d25a3a5342',
    name: 'Data Analysis',
    level: 6,
    strand: MathStrand.STATISTICS,
    subStrand: MathSubStrand.DATA_ANALYSIS,
    subStrandTopics: [
      {
        id: 'c7750314-a2b9-40f8-8d86-84c8f17c83a1',
        name: 'Average of a Set of Data',
        difficulty: 6,
        skills: [
          {
            id: 'understanding-average-as-total-value-number-of-data',
            description:
              'Understanding average as "total value ÷ number of data"',
            questions: [
              {
                question:
                  'What is the average of the numbers 2, 4, 6, 8, and 10?',
                answer: 6,
                explanation: ['(2 + 4 + 6 + 8 + 10) ÷ 5 = 30 ÷ 5 = 6'],
                variables: [
                  {
                    questionText:
                      'What is the average of the numbers {number1}, {number2}, {number3}, {number4}, and {number5}?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'finding-average-given-total-value-and-number-of-data',
            description: 'Finding average given total value and number of data',
            questions: [
              {
                question:
                  'Adam bought 4 bags of rice. The total weight of the rice is 20 kg. What is the average weight of the rice?',
                answer: 5,
                explanation: [
                  'Average weight = total weight ÷ number of bags = 20 kg ÷ 4 = 5 kg',
                ],
                variables: [
                  {
                    questionText:
                      'Adam bought {number} bags of rice. The total weight of the rice is {total} kg. What is the average weight of the rice?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
          {
            id: 'finding-total-value-given-average-and-number-of-data',
            description: 'Finding total value given average and number of data',
            questions: [
              {
                question:
                  'The average weight of 5 apples is 100 g. What is the total weight of the 5 apples?',
                answer: 500,
                explanation: [
                  'Total weight = average weight × number of data = 100 g × 5 = 500 g',
                ],
                variables: [
                  {
                    questionText:
                      'The average weight of {number} apples is {average} g. What is the total weight of the {number} apples?',
                    min: 1,
                    max: 10,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
] as MathTopic[];
