import { db } from './index';
import { strands } from './schema';
import {
  MATH_TOPICS,
  MathTopic,
  MathStrand,
  MathSubStrand,
} from '@/types/math';
import { problemTemplates } from './schema';
import type { ProblemTemplate } from '@/types/problem-template';

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
        description: null,
      }))
    );
    console.log('✅ Strands seeded successfully');
  } catch (error: unknown) {
    console.error(
      'Error seeding topics:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

function extractVariablesFromQuestion(
  question: string
): Record<string, { min: number; max: number }> {
  // Find all numbers in the question
  const numbers = question.match(/\d+/g)?.map(Number) || [];
  if (numbers.length < 2) return { a: { min: 1, max: 10 } }; // Default range if no numbers found

  // For arithmetic operations, use the numbers to determine ranges
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  // If it's a basic arithmetic question, use a and b as variables
  if (
    question.includes('+') ||
    question.includes('-') ||
    question.includes('×') ||
    question.includes('÷')
  ) {
    return {
      a: { min: Math.max(1, min - 5), max: max + 5 },
      b: { min: Math.max(1, min - 5), max: max + 5 },
    };
  }

  // For other types of questions, use more specific variable names
  if (question.toLowerCase().includes('length')) {
    return { length: { min, max: max * 2 } };
  }
  if (question.toLowerCase().includes('width')) {
    return { width: { min, max: max * 2 } };
  }
  if (question.toLowerCase().includes('radius')) {
    return { radius: { min, max: max * 2 } };
  }

  // Default case
  return { n: { min, max: max * 2 } };
}

function generateAnswerFormula(question: string): string {
  if (question.includes('+')) return 'a + b';
  if (question.includes('-')) return 'a - b';
  if (question.includes('×')) return 'a * b';
  if (question.includes('÷')) return 'a / b';
  if (question.includes('area') && question.includes('rectangle'))
    return 'length * width';
  if (question.includes('area') && question.includes('circle'))
    return 'Math.PI * radius * radius';
  return 'a'; // Default case
}

async function seedProblemTemplates() {
  try {
    const templates: Array<{
      id: string;
      type: string;
      structure: string;
      variables: Record<string, { min: number; max: number }>;
      answerFormula: string;
      difficulty: number;
      strand: string;
      subStrand: string;
      skills: Array<{
        id: string;
        name: string;
        level: number;
        prerequisites: string[];
      }>;
      commonMisconceptions: string[];
      explanationTemplate: string[];
      validationRules: {
        mustBeWhole?: boolean;
        minResult?: number;
        maxResult?: number;
      };
    }> = [];

    // Convert each sample question in MATH_TOPICS to a template
    MATH_TOPICS.forEach((topic) => {
      topic.subStrandTopics.forEach((subTopic) => {
        subTopic.sampleQuestions.forEach((question) => {
          if (question.type === 'numeric') {
            // Only use numeric questions for now
            const variables = extractVariablesFromQuestion(question.question);
            const answerFormula = generateAnswerFormula(question.question);

            templates.push({
              id: crypto.randomUUID(),
              type: question.type,
              structure: question.question,
              variables,
              answerFormula,
              difficulty: subTopic.difficulty,
              strand: topic.strand,
              subStrand: topic.subStrand,
              skills: [
                {
                  id: `${topic.subStrand}-${subTopic.name.toLowerCase().replace(/\s+/g, '-')}`,
                  name: subTopic.name,
                  level: topic.level,
                  prerequisites: [],
                },
              ],
              commonMisconceptions: [],
              explanationTemplate: question.explanation,
              validationRules: {
                mustBeWhole: true, // Default to whole numbers for most primary math
                minResult: 1,
                maxResult:
                  Math.max(...Object.values(variables).map((v) => v.max)) * 2,
              },
            });
          }
        });
      });
    });

    // Insert all templates
    await db.insert(problemTemplates).values(templates);
    console.log(
      `✅ Added ${templates.length} problem templates from MATH_TOPICS`
    );
  } catch (error) {
    console.error('Error seeding problem templates:', error);
    process.exit(1);
  }
}

async function seed() {
  await seedStrands();
  await seedProblemTemplates();
  process.exit(0);
}

seed();
