export interface SubStrandTopic {
  id: string;
  name: string;
  difficulty: number;
  objectives: string[];
  sampleQuestions: Question[];
}
export interface MathTopic {
  id: string;
  name: string;
  level: number;
  strand: MathStrand;
  subStrand: MathSubStrand;
  subStrandTopics: SubStrandTopic[];
}

export interface Question {
  id?: string;
  type: string;
  question: string;
  answer: number | string | number[] | null;
  explanation: string[];
  difficulty?: number;
  strand?: MathStrand;
  subStrand?: MathSubStrand;
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
        objectives: [
          'Counting to tell the number of objects in a given set',
          'Number notation, representations and place values (tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing the number of objects in two or more sets',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
          'Ordinal numbers (first, second, up to tenth) and symbols (1st, 2nd, 3rd, etc.)',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 35 and 47?',
            answer: 82,
            explanation: ['35 + 47 = 82'],
            type: 'numeric',
          },
          {
            question: 'What is the product of 7 and 8?',
            answer: 56,
            explanation: ['7 × 8 = 56'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '7692a08c-3560-428c-bcf1-187711873dfd',
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
        sampleQuestions: [
          {
            question: 'What is the sum of 23, 45, and 17?',
            answer: 85,
            explanation: ['23 + 45 + 17 = 85'],
            type: 'numeric',
          },
          {
            question: 'What is the difference between 78 and 54?',
            answer: 24,
            explanation: ['78 - 54 = 24'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '4cabf5ba-f3bb-4576-84c2-8b3e300ef778',
        name: 'Multiplication',
        difficulty: 1,
        objectives: [
          'Concepts of multiplication',
          'Use of ×',
          'Multiplying within 40',
        ],
        sampleQuestions: [
          {
            question: 'What is the product of 6 and 7?',
            answer: 42,
            explanation: ['6 × 7 = 42'],
            type: 'numeric',
          },
          {
            question: 'What is the product of 8 and 5?',
            answer: 40,
            explanation: ['8 × 5 = 40'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'cef54c34-989b-4a3c-bc35-4bc187e4ba63',
        name: 'Division',
        difficulty: 1,
        objectives: ['Concepts of division', 'Dividing within 20'],
        sampleQuestions: [
          {
            question: 'What is the quotient when 48 is divided by 6?',
            answer: 8,
            explanation: ['48 ÷ 6 = 8'],
            type: 'numeric',
          },
          {
            question: 'What is the quotient when 56 is divided by 7?',
            answer: 8,
            explanation: ['56 ÷ 7 = 8'],
            type: 'numeric',
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
        objectives: [
          'Counting amount of money in cents up to $1',
          'Counting amount of money in dollars up to $100',
        ],
        sampleQuestions: [
          {
            question: 'How many cents are there in $0.75?',
            answer: 75,
            explanation: ['$0.75 = 75 cents'],
            type: 'numeric',
          },
          {
            question: 'How many dollars are there in 1000 cents?',
            answer: 10,
            explanation: ['1000 cents = 10 dollars'],
            type: 'numeric',
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
        objectives: [
          'Measuring length in centimetres',
          'Use of abbreviation cm',
          'Comparing and ordering lengths in cm',
          'Measuring and drawing a line segment to the nearest cm',
        ],
        sampleQuestions: [
          {
            question: 'What is the length of a line that is 15 cm long?',
            answer: 15,
            explanation: ['The length is 15 cm'],
            type: 'numeric',
          },
          {
            question: 'Draw a line segment that is 7 cm long.',
            answer: null,
            explanation: ['Draw a line segment that is 7 cm long'],
            type: 'mcq',
          },
        ],
      },
      {
        id: 'c7560517-82ac-4bb3-8e37-503e2ff4b0fe',
        name: 'Measurement of Time',
        difficulty: 1,
        objectives: [
          'Telling time to 5 minutes',
          'Use of "am" and "pm"',
          'Use of abbreviations h and min',
          'Duration of one hour/half hour',
        ],
        sampleQuestions: [
          {
            question:
              'What time is it when the hour hand is on 3 and the minute hand is on 12?',
            answer: '3:00',
            explanation: ['It is 3:00'],
            type: 'numeric',
          },
          {
            question:
              'What time is it when the hour hand is on 12 and the minute hand is on 30?',
            answer: '12:30',
            explanation: ['It is 12:30'],
            type: 'numeric',
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
        sampleQuestions: [
          {
            question:
              'What is the area of a rectangle with length 5 cm and width 3 cm?',
            answer: 15,
            explanation: ['Area = length × width = 5 cm × 3 cm = 15 cm²'],
            type: 'numeric',
          },
          {
            question: 'Draw a square.',
            answer: null,
            explanation: ['Draw a square'],
            type: 'mcq',
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
        objectives: ['Reading and interpreting data from picture graphs'],
        sampleQuestions: [
          {
            question: 'How many students chose option A?',
            answer: 20,
            explanation: ['20 students chose option A'],
            type: 'numeric',
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
        objectives: [
          'Counting in tens/hundreds',
          'Number notation, representations and place values (hundreds, tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
          'Odd and even numbers',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 500, 300, and 200?',
            answer: 1000,
            explanation: ['500 + 300 + 200 = 1000'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '7d32b8e9-c9cd-42f0-8c4b-8321ee098fa4',
        name: 'Whole Numbers Addition and Subtraction',
        difficulty: 2,
        objectives: [
          'Addition and subtraction algorithms (up to 3 digits)',
          'Mental calculation involving addition and subtraction of a 3-digit number and ones/tens/hundreds',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 456 and 234?',
            answer: 690,
            explanation: ['456 + 234 = 690'],
            type: 'numeric',
          },
          {
            question: 'What is the difference between 876 and 543?',
            answer: 333,
            explanation: ['876 - 543 = 333'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '19edeffe-a8c2-4aef-b2e0-c66cce5a580b',
        name: 'Whole Numbers Multiplication and Division',
        difficulty: 2,
        objectives: [
          'Multiplication tables of 2, 3, 4, 5 and 10',
          'Use of ÷ symbol',
          'Relationship between multiplication and division',
          'Multiplying and dividing within the multiplication tables',
          'Mental calculation involving multiplication and division',
        ],
        sampleQuestions: [
          {
            question: 'What is the product of 7 and 8?',
            answer: 56,
            explanation: ['7 × 8 = 56'],
            type: 'numeric',
          },
          {
            question: 'What is the quotient when 48 is divided by 6?',
            answer: 8,
            explanation: ['48 ÷ 6 = 8'],
            type: 'numeric',
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
        objectives: [
          'Fraction as part of a whole',
          'Notation and representations of fractions',
          'Comparing and ordering unitfractions with denominators not exceeding 12',
          'Comparing and ordering like fractions with denominators not exceeding 12',
        ],
        sampleQuestions: [
          {
            question: 'What is the fraction of the circle that is shaded?',
            answer: 0.75,
            explanation: ['The shaded area is 3/4 of the circle'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'dc0508f5-673a-49ca-94f6-8c241b81c1fc',
        name: 'Fraction Addition and Subtraction',
        difficulty: 2,
        objectives: [
          'Adding and subtracting like fractions within one whole with denominators of given fractions not exceeding 12',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 1/4 and 1/4?',
            answer: 0.5,
            explanation: ['1/4 + 1/4 = 2/4 = 1/2'],
            type: 'numeric',
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
        objectives: [
          'Counting amount of money in dollars and cents',
          'Reading and writing money in decimal notation',
          'Comparing two or three amounts of money',
          'Converting money in decimal notation to cents only, and vice versa',
        ],
        sampleQuestions: [
          {
            question:
              'What is the total amount of money if you have 3 quarters and 2 dimes?',
            answer: 0.85,
            explanation: [
              '3 quarters = $0.75, 2 dimes = $0.20, 0.75 + 0.20 = $0.95',
            ],
            type: 'numeric',
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
        objectives: [
          'Measuring length in metres',
          'Measuring mass in kilograms/grams',
          'Measuring volume of liquid in litres',
          'Using appropriate units of measurement and abbreviations (m, g, kg, ℓ)',
          'Comparing and ordering lengths',
          'Comparing and ordering masses',
          'Comparing and ordering volumes',
        ],
        sampleQuestions: [
          {
            question: 'What is the length of a table that is 1.2 meters long?',
            answer: 1.2,
            explanation: ['The length is 1.2 meters'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'dd24f2c2-8d07-4f18-91d0-0aaa14da15ad',
        name: 'Measurement Time',
        difficulty: 2,
        objectives: [
          'Telling time to the minute',
          'Measuring time in hours and minutes',
          'Converting time in hours and minutes to minutes only, and vice versa',
        ],
        sampleQuestions: [
          {
            question:
              'What time is it when the hour hand is on 3 and the minute hand is on 12?',
            answer: '3:00',
            explanation: ['It is 3:00'],
            type: 'numeric',
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
        objectives: [
          'Making/completing patterns with 2D shapes according to one or two of the following attributes: size, shape, color, orientation',
        ],
        sampleQuestions: [
          {
            question: 'Draw a rectangle.',
            answer: null,
            explanation: ['Draw a rectangle'],
            type: 'mcq',
          },
        ],
      },
      {
        id: 'f3751a7a-ab22-4041-b986-7549f72132ff',
        name: '3D Shapes',
        difficulty: 2,
        objectives: [
          'Identifying, naming, describing and classifying 3D shapes: cube, cuboid, cone, cylinder, sphere',
        ],
        sampleQuestions: [
          {
            question: "What is the shape of a Rubik's cube?",
            answer: 'cube',
            explanation: ["A Rubik's cube is a cube"],
            type: 'mcq',
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
        objectives: [
          'Reading and interpreting data from picture graphs with scales',
        ],
        sampleQuestions: [
          {
            question: 'How many students chose option B?',
            answer: 15,
            explanation: ['15 students chose option B'],
            type: 'numeric',
          },
        ],
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
        objectives: [
          'Counting in hundreds/thousands',
          'Number notation, representations and place values (thousands, hundreds, tens, ones)',
          'Reading and writing numbers in numerals and in words',
          'Comparing and ordering numbers',
          'Patterns in number sequences',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 5,000, 3,000, and 2,000?',
            answer: 10000,
            explanation: ['5,000 + 3,000 + 2,000 = 10,000'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '799d2311-750d-462e-9f5a-da180a12f658',
        name: 'Addition and Subtraction',
        difficulty: 3,
        objectives: [
          'Addition and subtraction algorithms (up to 4 digits)',
          'Mental calculation involving addition and subtraction of two 2-digit numbers',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 4,567 and 2,345?',
            answer: 6912,
            explanation: ['4,567 + 2,345 = 6,912'],
            type: 'numeric',
          },
          {
            question: 'What is the difference between 8,765 and 3,456?',
            answer: 5309,
            explanation: ['8,765 - 3,456 = 5,309'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '26fafdfa-f587-40ef-863b-469d29372657',
        name: 'Multiplication and Division',
        difficulty: 3,
        objectives: [
          'Multiplication tables of 6, 7, 8 and 9',
          'Multiplying and dividing within the multiplication tables',
          'Division with remainder',
          'Multiplication and division algorithms (up to 3 digits by 1 digit)',
          'Mental calculation involving multiplication and division within multiplication tables',
        ],
        sampleQuestions: [
          {
            question: 'What is the product of 6 and 7?',
            answer: 42,
            explanation: ['6 × 7 = 42'],
            type: 'numeric',
          },
          {
            question: 'What is the quotient when 42 is divided by 6?',
            answer: 7,
            explanation: ['42 ÷ 6 = 7'],
            type: 'numeric',
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
        objectives: [
          'Equivalent fractions',
          'Expressing a fraction in its simplest form',
          'Comparing and ordering unlike fractions with denominators not exceeding 12',
          'Writing equivalent fractions given the denominator or numerator',
        ],
        sampleQuestions: [
          {
            question: 'What is the simplest form of 4/8?',
            answer: 0.5,
            explanation: ['4/8 = 1/2'],
            type: 'numeric',
          },
        ],
      },
      {
        id: '8ba9d78e-1aa6-47f2-a2eb-67b34576dee3',
        name: 'Fraction Addition and Subtraction',
        difficulty: 3,
        objectives: [
          'Adding and subtracting two related fractions within one whole',
          'Denominators of given fractions not exceeding 12',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 1/4 and 1/4?',
            answer: 0.5,
            explanation: ['1/4 + 1/4 = 2/4 = 1/2'],
            type: 'numeric',
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
        objectives: ['Adding and subtracting money in decimal notation'],
        sampleQuestions: [
          {
            question:
              'What is the total amount of money if you have $0.75 and $0.20?',
            answer: 0.95,
            explanation: ['$0.75 + $0.20 = $0.95'],
            type: 'numeric',
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
        objectives: [
          'Measuring length in kilometres (km)',
          'Measuring volume of liquid in millilitres (ml)',
          'Measuring length/mass/volume in compound units',
          'Converting a compound unit to the smaller unit (kilometres and metres)',
          'Converting a compound unit to the larger unit (metres and centimetres)',
          'Converting a compound unit to the smaller unit (kilograms and grams)',
          'Converting a compound unit to the larger unit (litres and millilitres)',
        ],
        sampleQuestions: [
          {
            question: 'What is the length of a road that is 5 kilometers long?',
            answer: 5,
            explanation: ['The length is 5 kilometers'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'cc793e52-fd19-4ed1-9002-86c54dda9aa0',
        name: 'Time',
        difficulty: 3,
        objectives: [
          'Measuring time in seconds',
          'Finding starting time, finishing time or duration',
          '24-hour clock',
        ],
        sampleQuestions: [
          {
            question:
              'What time is it when the hour hand is on 3 and the minute hand is on 12?',
            answer: '3:00',
            explanation: ['It is 3:00'],
            type: 'numeric',
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
        objectives: [
          'Concepts of area and perimeter of a plane figure',
          'Measuring area in square units, cm² and m²',
          'Perimeter of rectilinear figure',
          'Perimeter of rectangle',
          'Perimeter of square',
          'Area of rectangle',
          'Area of square',
        ],
        sampleQuestions: [
          {
            question:
              'What is the area of a rectangle with length 5 cm and width 3 cm?',
            answer: 15,
            explanation: ['Area = length × width = 5 cm × 3 cm = 15 cm²'],
            type: 'numeric',
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
        objectives: [
          'Concepts of angle',
          'Right angles',
          'Angles greater than/smaller than a right angle',
        ],
        sampleQuestions: [
          {
            question: 'What is the measure of angle ABC?',
            answer: 90,
            explanation: ['Angle ABC is a right angle'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'db0e73c2-c426-43cb-af4d-77be7fc93379',
        name: 'Perpendicular and Parallel Lines',
        difficulty: 3,
        objectives: [
          'Perpendicular and parallel lines',
          'Drawing perpendicular and parallel lines',
        ],
        sampleQuestions: [
          {
            question: 'Draw a perpendicular line to line AB.',
            answer: null,
            explanation: ['Draw a perpendicular line to line AB'],
            type: 'mcq',
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
        objectives: [
          'Reading and interpreting data from bar graphs',
          'Using different scales on axis',
        ],
        sampleQuestions: [
          {
            question: 'How many students chose option A?',
            answer: 20,
            explanation: ['20 students chose option A'],
            type: 'numeric',
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
        objectives: [
          'Reading and writing numbers in numerals and in words up to 10 million',
        ],
        sampleQuestions: [
          {
            question:
              'What is the number for one million nine hundred and ninety-nine thousand?',
            answer: 1999000,
            explanation: [
              'The number for one million nine hundred and ninety-nine thousand is 1999000',
            ],
            type: 'numeric',
          },
          {
            question: 'Write the number 1,999,000 in words.',
            answer: 'one million nine hundred and ninety-nine thousand',
            explanation: [
              'The number 1,999,000 in words is one million nine hundred and ninety-nine thousand',
            ],
            type: 'word-problem',
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
        objectives: [
          'Multiplying and dividing by 10, 100, 1000 and their multiples without calculator',
          'Order of operations without calculator',
          'Use of brackets without calculator',
        ],
        sampleQuestions: [
          {
            question: 'What is the product of 10 and 100?',
            answer: 1000,
            explanation: ['10 × 100 = 1000'],
            type: 'numeric',
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
        objectives: [
          'Dividing a whole number by a whole number with quotient as a fraction',
          'Expressing fractions as decimals',
        ],
        sampleQuestions: [
          {
            question: 'What is the quotient when 4 is divided by 8?',
            answer: 0.5,
            explanation: ['4 ÷ 8 = 0.5'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'cd65fa82-1618-4b08-a6c3-af10b23f0820',
        name: 'Fraction and Four Operations',
        difficulty: 5,
        objectives: [
          'Adding and subtracting mixed numbers',
          'Multiplying a proper/improper fraction and a whole number without calculator',
          'Multiplying a proper fraction and a proper/improper fraction without calculator',
          'Multiplying two improper fractions',
          'Multiplying a mixed number and a whole number',
        ],
        sampleQuestions: [
          {
            question: 'What is the sum of 2 1/4 and 1 3/4?',
            answer: 4,
            explanation: ['2 1/4 + 1 3/4 = 4'],
            type: 'numeric',
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
        objectives: [
          'Multiplying and dividing decimals (up to 3 decimal places) by 10, 100, 1000 and their multiples without calculator',
          'Converting a measurement from a smaller unit to a larger unit in decimal form, and vice versa between km and m, kg and g, L and mL',
        ],
        sampleQuestions: [
          {
            question: 'What is the product of 0.5 and 0.5?',
            answer: 0.25,
            explanation: ['0.5 × 0.5 = 0.25'],
            type: 'numeric',
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
        objectives: [
          'Finding the whole given a part and the percentage',
          'Finding percentage increase/decrease',
        ],
        sampleQuestions: [
          {
            question:
              'What is the original price if a 20% discount reduces it to $80?',
            answer: 100,
            explanation: ['80 is 80% of the original price'],
            type: 'numeric',
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
        objectives: [
          'Rate as the amount of a quantity per unit of another quantity',
          'Finding rate given total amount and number of units',
          'Finding total amount given rate and number of units',
          'Finding number of units given rate and total amount',
        ],
        sampleQuestions: [
          {
            question:
              'How much does each item cost if 100 of this item cost $500?',
            answer: 5,
            explanation: ['500 ÷ 100 = 5, so each item costs $5.'],
            type: 'numeric',
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
        objectives: [
          'Concepts of base and height of a triangle',
          'Area of triangle',
          'Finding area of composite figures with triangles',
        ],
        sampleQuestions: [
          {
            question:
              'What is the area of a triangle with base 10 cm and height 5 cm?',
            answer: 25,
            explanation: [
              'Area = 1/2 × base × height = 1/2 × 10 cm × 5 cm = 25 cm²',
            ],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'fc1f9d5a-14df-4345-ad80-1ff84ce6a04f',
        name: 'Volume of Cube and Cuboid',
        difficulty: 5,
        objectives: [
          'Finding one dimension of a cuboid given its volume and the other dimensions',
          'Finding the length of one edge of a cube given its volume',
          'Finding the height of a cuboid given its volume and base area',
          'Finding the area of a face of a cuboid given its volume and one dimension',
          'Use of square root and cube root',
        ],
        sampleQuestions: [
          {
            question: 'What is the volume of a cube with side length 4 cm?',
            answer: 64,
            explanation: [
              'Volume = side length³ = 4 cm × 4 cm × 4 cm = 64 cm³',
            ],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: '76201c5b-b20f-44b4-ba54-d6f933f53e62',
    name: 'Geometry',
    level: 5,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.GEOMETRY,
    subStrandTopics: [
      {
        id: 'e4b0716d-0bed-4e1d-a848-d7e9025083ce',
        name: 'Angles',
        difficulty: 5,
        objectives: [
          'Angles on a straight line',
          'Angles at a point',
          'Vertically opposite angles',
          'Finding unknown angles',
        ],
        sampleQuestions: [
          {
            question: 'What is the measure of angle ABC?',
            answer: 90,
            explanation: ['Angle ABC is a right angle'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'f6fe0131-5269-4ddf-84f6-e20f2add4d09',
        name: 'Triangles',
        difficulty: 5,
        objectives: [
          'Properties of isosceles triangle',
          'Properties of equilateral triangle',
          'Properties of right-angled triangle',
          'Angle sum of a triangle',
          'Finding unknown angles without additional construction',
        ],
        sampleQuestions: [
          {
            question: 'What is the measure of angle x in the given triangle?',
            answer: 45,
            explanation: [
              'The triangle is isosceles, so the two base angles are equal',
            ],
            type: 'numeric',
          },
        ],
      },
      {
        id: '12b35d3f-9b85-492b-b7df-7db403c095eb',
        name: 'Quadrilaterals',
        difficulty: 5,
        objectives: [
          'Properties of parallelogram',
          'Properties of rhombus',
          'Properties of trapezium',
          'Finding unknown angles without additional construction',
        ],
        sampleQuestions: [
          {
            question:
              'What is the measure of angle x in the given parallelogram?',
            answer: 120,
            explanation: ['The opposite angles in a parallelogram are equal'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: '272c724e-9178-4ff0-8529-4951ee9b0e72',
    name: 'Fractions',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.FRACTIONS,
    subStrandTopics: [
      {
        id: '3e7bb46a-8165-40e9-b9c2-a4fbbd589350',
        name: 'Four Operations',
        difficulty: 6,
        objectives: [
          'Dividing a proper fraction by a whole number',
          'Dividing a whole number/proper fraction by a proper fraction',
        ],
        sampleQuestions: [
          {
            question: 'What is the quotient when 4 is divided by 8?',
            answer: 0.5,
            explanation: ['4 ÷ 8 = 0.5'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: 'e448b3b5-bab5-43ef-a415-69ae92c1f2b8',
    name: 'Percentage',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.PERCENTAGE,
    subStrandTopics: [
      {
        id: '8e4d67ca-7ecf-47ca-a127-9d4c1b80b9e8',
        name: 'Percentage',
        difficulty: 6,
        objectives: [
          'Finding the whole given a part and the percentage',
          'Finding percentage increase/decrease',
        ],
        sampleQuestions: [
          {
            question:
              'What is the original price if a 20% discount reduces it to $80?',
            answer: 100,
            explanation: ['80 is 80% of the original price'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: '511c4850-6da1-4434-a6b5-e1cc48d1cc50',
    name: 'Ratio',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.RATIO,
    subStrandTopics: [
      {
        id: 'fd4687a6-6749-421e-86f2-8083c87bc605',
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
        sampleQuestions: [
          {
            question:
              'What is the ratio of boys to girls if there are 12 boys and 8 girls?',
            answer: '3:2',
            explanation: ['12 ÷ 4 = 3, 8 ÷ 4 = 2'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: 'b4d96087-ff55-4a18-9253-719c03890670',
    name: 'Algebra',
    level: 6,
    strand: MathStrand.NUMBER_AND_ALGEBRA,
    subStrand: MathSubStrand.ALGEBRA,
    subStrandTopics: [
      {
        id: '376c9b48-d198-4c6f-8949-5c621dcaa48a',
        name: 'Algebra',
        difficulty: 6,
        objectives: [
          'using a letter to represent an unknown number ',
          'notation, representations and interpretation of simple algebraic expressions such as a+-3, ax3 or 3a, a ÷ 3 or a/3',
          'simplifying simple linear expressions excluding brackets',
          'evaluating simple linear expressions by substitution',
          'simple linear equations involving whole number coefficient only',
        ],
        sampleQuestions: [
          {
            question: 'What is the value of x in the equation 2x + 3 = 7?',
            answer: 2,
            explanation: ['2x + 3 = 7, so 2x = 7 - 3, so x = 2'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
  {
    id: '3a2901bd-58dd-4cf0-bf74-5dad88d76d56',
    name: 'Area and Volume',
    level: 6,
    strand: MathStrand.MEASUREMENT_AND_GEOMETRY,
    subStrand: MathSubStrand.AREA_AND_VOLUME,
    subStrandTopics: [
      {
        id: 'ee561c4d-9fe1-4f1a-9b76-21c3631d78ed',
        name: 'Area and Circumference of Circle',
        difficulty: 6,
        objectives: [
          'Area and circumference of circle',
          'Finding the area and perimeter of semicircle',
          'Finding the area and perimeter of quarter circle',
          'Finding the area and perimeter of composite figures made up of square, rectangle, triangle, semicircle and quarter circle ',
        ],
        sampleQuestions: [
          {
            question: 'What is the area of a circle with radius 5 cm?',
            answer: 78.5,
            explanation: ['Area = πr² = 3.14 × 5 cm × 5 cm = 78.5 cm²'],
            type: 'numeric',
          },
        ],
      },
      {
        id: 'fc1f9d5a-14df-4345-ad80-1ff84ce6a04f',
        name: 'Volume of Cube and Cuboid',
        difficulty: 6,
        objectives: [
          'Finding one dimension of a cuboid given its volume and the other dimensions',
          'Finding the length of one edge of a cube given its volume',
          'Finding the height of a cuboid given its volume and base area',
          'Finding the area of a face of a cuboid given its volume and one dimension',
          'Use of square root and cube root',
        ],
        sampleQuestions: [
          {
            question: 'What is the volume of a cube with side length 4 cm?',
            answer: 64,
            explanation: [
              'Volume = side length³ = 4 cm × 4 cm × 4 cm = 64 cm³',
            ],
            type: 'numeric',
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
        objectives: [
          'Finding unknown angles, without additional construction of lines, in composite geometric figures involving squares, rectangles, triangles, parallelograms, rhombuses and trapeziums',
        ],
        sampleQuestions: [
          {
            question:
              'What is the measure of angle x in the given quadrilateral?',
            answer: 120,
            explanation: ['The sum of angles in a quadrilateral is 360°'],
            type: 'numeric',
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
        objectives: [
          'Understanding average as "total value ÷ number of data"',
          'Finding average given total value and number of data',
          'Finding total value given average and number of data',
          'Finding number of data given average and total value',
        ],
        sampleQuestions: [
          {
            question: 'What is the average of the numbers 2, 4, 6, 8, and 10?',
            answer: 6,
            explanation: ['(2 + 4 + 6 + 8 + 10) ÷ 5 = 30 ÷ 5 = 6'],
            type: 'numeric',
          },
        ],
      },
    ],
  },
] as MathTopic[];
