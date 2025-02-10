import { db } from './index';
import { strands } from './schema';
import { MATH_TOPICS, MathTopic } from '@/types/math';
import { mathQuestions } from './schema';
import { extractVariablesFromQuestion } from '../math/utils';
import { generateAnswerFormula } from '../math/utils';

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
          skills: subTopic.skills || [],
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

async function seedProblems() {
  try {
    // Transform topics and their sample questions into database format
    const dbQuestions = MATH_TOPICS.flatMap((topic) =>
      topic.subStrandTopics.flatMap((subTopic) =>
        subTopic.sampleQuestions.map((question) => ({
          question: question.question,
          answer: question.answer?.toString() || '',
          explanation: question.explanation,
          difficulty: subTopic.difficulty,
          strand: topic.strand,
          subStrand: topic.subStrand,
          skills: subTopic.skills,
          variables: extractVariablesFromQuestion(question.question),
          answerFormula: generateAnswerFormula(question.question),
          metadata: {
            topicId: topic.id,
            subTopicId: subTopic.id,
          },
        }))
      )
    );

    // Insert all questions
    await db.insert(mathQuestions).values(dbQuestions as any);
    console.log(`✅ Added ${dbQuestions.length} questions from MATH_TOPICS`);
  } catch (error) {
    console.error('Error seeding problem templates:', error);
    process.exit(1);
  }
}

async function seed() {
  await seedStrands();
  await seedProblems();
  process.exit(0);
}

seed();
