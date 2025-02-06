import type { StudentProgress } from '@/types/progress';
import { MathTopic, Question } from '@/types/math';
import { calculateDifficulty } from '@/lib/utils/math';
import { additionQuestionGenerator } from './additionQuestions';
import { subtractionQuestionGenerator } from './subtractionQuestions';
import { multiplicationQuestionGenerator } from './multiplicationQuestions';
import { divisionQuestionGenerator } from './divisionQuestions';
import { numberSenseQuestionGenerator } from './numberSenseQuestions';
import { fractionQuestionGenerator } from './fractionQuestions';
import { decimalQuestionGenerator } from './decimalQuestions';
import { measurementQuestionGenerator } from './measurementQuestions';
import { geometryQuestionGenerator } from './geometryQuestions';
import { ratioQuestionGenerator } from './ratioQuestions';
import { algebraQuestionGenerator } from './algebraQuestions';
import { moneyQuestionGenerator } from './moneyQuestions';

// Moved from questionSelector.ts
export function selectNextQuestion(
  progress: StudentProgress,
  topic: MathTopic
): Question {
  // Calculate success rate for current topic
  const topicStats = progress.topicProgress?.find(
    (p) => p.topicId === topic.id
  );

  const successRate = topicStats
    ? topicStats.correctAnswers / topicStats.questionsAttempted
    : 0.5; // Default to medium difficulty for new topics

  // Determine difficulty based on performance
  const difficulty = calculateDifficulty(topic.level, successRate);

  // Get previous mistakes for this topic
  const previousMistakes = getPreviousMistakes(progress, topic.id);

  // Generate question using the unified generator
  return generateQuestion(topic, difficulty, previousMistakes);
}

function getPreviousMistakes(
  progress: StudentProgress,
  topicId: string
): string[] {
  const topicProgress = progress.topicProgress?.find(
    (p) => p.topicId === topicId
  );
  return topicProgress?.mistakes || [];
}

export function generateQuestion(
  topic: MathTopic,
  difficulty: number,
  previousMistakes: string[]
): Question {
  switch (topic.id) {
    // Basic Number Operations
    case 'addition': {
      const question = additionQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
      return {
        ...question,
        correctAnswer: String(question.correctAnswer),
      };
    }
    case 'subtraction': {
      const question = subtractionQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
      return {
        ...question,
        correctAnswer: String(question.correctAnswer),
      };
    }
    case 'multiplication': {
      const question = multiplicationQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
      return {
        ...question,
        correctAnswer: String(question.correctAnswer),
      };
    }
    case 'division':
      return divisionQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    // Number Concepts
    case 'number_sense':
      return numberSenseQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    // Fractions & Decimals
    case 'fractions':
      return fractionQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
    case 'decimals':
      return decimalQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    // Measurement & Geometry
    case 'measurement':
      return measurementQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
    case 'geometry':
      return geometryQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    // Advanced Topics
    case 'ratio_proportion':
      return ratioQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );
    case 'algebra':
      return algebraQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    // Money
    case 'money':
      return moneyQuestionGenerator.generateQuestion(
        difficulty,
        previousMistakes
      );

    default:
      throw new Error(`No question generator for topic: ${topic.id}`);
  }
}

export const questionGenerators = {
  // Basic Number Operations
  addition: additionQuestionGenerator,
  subtraction: subtractionQuestionGenerator,
  multiplication: multiplicationQuestionGenerator,
  division: divisionQuestionGenerator,

  // Number Concepts
  number_sense: numberSenseQuestionGenerator,

  // Fractions & Decimals
  fractions: fractionQuestionGenerator,
  decimals: decimalQuestionGenerator,

  // Measurement & Geometry
  measurement: measurementQuestionGenerator,
  geometry: geometryQuestionGenerator,

  // Advanced Topics
  ratio_proportion: ratioQuestionGenerator,
  algebra: algebraQuestionGenerator,

  // Money
  money: moneyQuestionGenerator,
} as const;

export type QuestionType = keyof typeof questionGenerators;
