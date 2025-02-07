import { writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { MATH_TOPICS, MathTopic, SubStrandTopic } from '../src/types/math';

interface UuidMapping {
  [key: string]: string;
}

interface SubTopic {
  id: string;
  name: string;
  [key: string]: any;
}

interface Topic {
  id: string;
  name: string;
  subTopics: SubTopic[];
  [key: string]: any;
}

function generateUuidMappings(): UuidMapping {
  const mappings: UuidMapping = {};

  MATH_TOPICS.forEach((topic: MathTopic) => {
    // Generate UUID for topic
    const oldTopicId = topic.id;
    mappings[oldTopicId] = uuidv4();

    // Generate UUIDs for subtopics
    topic.subStrandTopics.forEach((subtopic: SubStrandTopic) => {
      const oldSubtopicId = subtopic.id;
      mappings[oldSubtopicId] = uuidv4();
    });
  });

  return mappings;
}

function main() {
  const mappings = generateUuidMappings();

  // Save mappings to a JSON file
  writeFileSync(
    'src/data/topic-uuids.json',
    JSON.stringify(mappings, null, 2),
    'utf-8'
  );

  console.log(
    'UUID mappings have been generated and saved to topic-uuids.json'
  );

  // Print example of how to update the topics
  console.log('\nExample of how to update a topic in MATH_TOPICS:');
  const exampleTopic = MATH_TOPICS[0];
  console.log(`{
  id: '${mappings[exampleTopic.id]}', // ${exampleTopic.id}
  name: '${exampleTopic.name}',
  // ... rest of the topic data
  subTopics: [
    {
      id: '${mappings[exampleTopic.subStrandTopics[0].id]}', // ${exampleTopic.subStrandTopics[0].id}
      name: '${exampleTopic.subStrandTopics[0].name}',
      // ... rest of the subtopic data
    }

  ]
}`);
}

main();
