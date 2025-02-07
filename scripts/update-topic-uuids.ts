import { readFileSync, writeFileSync } from 'fs';
import { MATH_TOPICS } from '../src/types/math';

interface UuidMapping {
  [key: string]: string;
}

function updateTopicUuids() {
  // Read the UUID mappings
  const mappings: UuidMapping = JSON.parse(
    readFileSync('src/data/topic-uuids.json', 'utf-8')
  );

  // Create a new array with updated UUIDs
  const updatedTopics = MATH_TOPICS.map((topic) => {
    const updatedTopic = {
      ...topic,
      id: mappings[topic.id],
      subStrandTopics: topic.subStrandTopics.map((subtopic) => ({
        ...subtopic,
        id: mappings[subtopic.id],
      })),
    };
    return updatedTopic;
  });

  // Generate the new file content
  const fileContent = `import type { InferSelectModel } from 'drizzle-orm';
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

// ... rest of the type definitions ...

export const MATH_TOPICS = ${JSON.stringify(updatedTopics, null, 2)} as const;

// ... rest of the exports ...
`;

  // Write the updated file
  writeFileSync('src/types/math.ts', fileContent, 'utf-8');
  console.log('Updated MATH_TOPICS with new UUIDs');
}

updateTopicUuids();
