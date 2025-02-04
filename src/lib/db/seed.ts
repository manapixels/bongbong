import { db } from './index';
import { topics } from './schema';
import { MathTopics } from '@/types/math';

// Seed the topics table with the MathTopics array
async function seedTopics() {
  try {
    await db.insert(topics).values(MathTopics.map(topic => ({
      name: topic.name,
      category: topic.category,
      level: topic.level,
      description: topic.description
    })));
    console.log('Topics seeded successfully');
  } catch (error) {
    console.error('Error seeding topics:', error);
  }

}

seedTopics();