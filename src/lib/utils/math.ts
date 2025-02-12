import { MATH_TOPICS } from '@/types/math';

export function calculateDifficulty(
  baseLevel: number,
  successRate: number
): number {
  // Adjust difficulty based on success rate
  // successRate of 0.8+ increases difficulty
  // successRate below 0.6 decreases difficulty
  if (successRate > 0.8) {
    return Math.min(baseLevel + 1, 5);
  } else if (successRate < 0.6) {
    return Math.max(baseLevel - 1, 1);
  }
  return baseLevel;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function simplifyFraction(
  numerator: number,
  denominator: number
): [number, number] {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

export function generateModelMethod(problem: string) {
  return `
    1. Draw a bar model:
       - Whole bar represents: [total/main quantity]
       - Divide into parts: [show known/unknown quantities]
       
    2. Label the parts:
       - Known values: [fill in given numbers]
       - Unknown values: [mark with '?']
       
    3. Write equations:
       - Based on bar model relationships
       - Show step-by-step calculations
  `;
}

export function checkDifficulty(
  studentLevel: string,
  problemType: string
): number {
  // Returns difficulty level 1-5 based on student's current level and problem type
  // Used for adaptive learning
  return 1; // Implement proper difficulty calculation
}

export function generateHints(problem: string, step: number): string {
  // Returns progressive hints for each step of problem solving
  return ''; // Implement hint generation
}

export interface TopicKey {
  subStrand: string;
  level: number;
}

export function getAllTopicIds(): TopicKey[] {
  return MATH_TOPICS.map((topic) => ({
    subStrand: topic.subStrand,
    level: topic.level,
  }));
}

export function getDefaultPreferences() {
  return {
    difficulty: 1,
    topicsEnabled: getAllTopicIds().map(
      (topic) => `${topic.subStrand}-${topic.level}`
    ),
  };
}

export function createTopicKey(subStrand: string, level: number): string {
  return `${subStrand}-${level}`;
}
