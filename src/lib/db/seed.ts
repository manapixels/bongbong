import { db } from './index';
import { strands } from './schema';
import { MATH_TOPICS, MathTopic } from '@/types/math';

// Seed the topics table with the MathTopic array
async function seedTopics(): Promise<void> {
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
    console.log('Topics seeded successfully');
    process.exit(0);
  } catch (error: unknown) {
    console.error(
      'Error seeding topics:',
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

void seedTopics();
