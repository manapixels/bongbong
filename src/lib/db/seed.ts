import { db } from './index';
import { strands } from './schema';
import { MATH_TOPICS, MathTopic } from '@/types/math';
import { problemTemplates } from './schema';
import { MathSubStrand } from '@/types/math';

// Seed the topics table with the MathTopic array
async function seedStrands(): Promise<void> {
  try {
    await db.insert(strands).values(
      MATH_TOPICS.map((topic: MathTopic) => ({
        name: topic.name,
        strand: topic.strand,
        subStrand: topic.subStrand,
        level: topic.level,
        subStrandTopics: topic.subStrandTopics.map((subTopic) => ({
          id: subTopic.id,
          name: subTopic.name,
          difficulty: subTopic.difficulty,
          objectives: subTopic.objectives || [],
        })),
        description: null, // optional
      }))
    );
    console.log('Strands seeded successfully');
    process.exit(0);
  } catch (error: unknown) {
    console.error(
      'Error seeding topics:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

async function seedProblemTemplates() {
  try {
    // Add basic arithmetic templates
    await db.insert(problemTemplates).values([
      {
        id: crypto.randomUUID(),
        type: 'arithmetic',
        structure: 'What is {a} + {b}?',
        variables: {
          a: { min: 1, max: 20 },
          b: { min: 1, max: 20 },
        },
        answerFormula: 'a + b',
        difficulty: 1,
        strand: 'number-and-algebra',
        subStrand: MathSubStrand.WHOLE_NUMBERS,
        skills: [
          {
            id: 'basic-addition',
            name: 'Basic Addition',
            level: 1,
            prerequisites: [],
          },
        ],
        commonMisconceptions: ['Counting error', 'Place value confusion'],
        explanationTemplate: [
          'To add {a} and {b}:',
          '1. Start with {a}',
          '2. Count forward {b} more',
          'So, {a} + {b} = {answer}',
        ],
        validationRules: {
          maxResult: 40,
          minResult: 2,
          mustBeWhole: true,
        },
      },
      {
        id: crypto.randomUUID(),
        type: 'arithmetic',
        structure: 'What is {a} - {b}?',
        variables: {
          a: { min: 5, max: 20 },
          b: { min: 1, max: 10 },
        },
        answerFormula: 'a - b',
        difficulty: 1,
        strand: 'number-and-algebra',
        subStrand: MathSubStrand.WHOLE_NUMBERS,
        skills: [
          {
            id: 'basic-subtraction',
            name: 'Basic Subtraction',
            level: 1,
            prerequisites: [],
          },
        ],
        commonMisconceptions: [
          'Counting backwards error',
          'Subtracting from smaller number',
        ],
        explanationTemplate: [
          'To subtract {b} from {a}:',
          '1. Start with {a}',
          '2. Count backward {b} times',
          'So, {a} - {b} = {answer}',
        ],
        validationRules: {
          maxResult: 19,
          minResult: 1,
          mustBeWhole: true,
        },
      },
      {
        id: crypto.randomUUID(),
        type: 'arithmetic',
        structure: 'What is {a} × {b}?',
        variables: {
          a: { min: 2, max: 10 },
          b: { min: 2, max: 10 },
        },
        answerFormula: 'a * b',
        difficulty: 2,
        strand: 'number-and-algebra',
        subStrand: MathSubStrand.WHOLE_NUMBERS,
        skills: [
          {
            id: 'basic-multiplication',
            name: 'Basic Multiplication',
            level: 2,
            prerequisites: ['basic-addition'],
          },
        ],
        commonMisconceptions: [
          'Adding instead of multiplying',
          'Skip counting errors',
        ],
        explanationTemplate: [
          'To multiply {a} and {b}:',
          '1. Think of {a} groups of {b}',
          '2. Add: ' + Array(5).fill('{b}').join(' + ') + ' ({a} times)',
          'So, {a} × {b} = {answer}',
        ],
        validationRules: {
          maxResult: 100,
          minResult: 4,
          mustBeWhole: true,
        },
      },
    ]);

    console.log('✅ Added problem templates');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedStrands();
seedProblemTemplates();
