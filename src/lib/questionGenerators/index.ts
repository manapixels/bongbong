import { MathCategory, QuestionGenerator, Question, MathTopic } from '@/lib/types/math';
import { ratioQuestionGenerator } from './ratioQuestions';
import { placeValueQuestionGenerator } from './placeValueQuestions';
import { additionQuestionGenerator } from './additionQuestions';
import { fractionQuestionGenerator } from './fractionQuestions';

export function generateQuestion(
  topic: MathTopic,
  difficulty: number,
  previousMistakes: string[]
): Question {
  switch (topic.id) {
    case 'addition-within-1000': {
      const question = additionQuestionGenerator.generateQuestion(difficulty, previousMistakes);
      return {
        ...question,
        correctAnswer: String(question.correctAnswer)
      };
    }
    case 'equivalent-fractions': {
      const question = fractionQuestionGenerator.generateQuestion(difficulty, previousMistakes);
      return {
        ...question,
        correctAnswer: String(question.correctAnswer)
      };
    }
    case 'ratio-proportion':
      return ratioQuestionGenerator.generateQuestion(difficulty, previousMistakes);
    default:
      throw new Error(`No question generator for topic: ${topic.id}`);
  }
}

export const questionGenerators = {
  'place-values': placeValueQuestionGenerator,
  'addition-within-1000': additionQuestionGenerator,
  'equivalent-fractions': fractionQuestionGenerator,
  'ratio-proportion': ratioQuestionGenerator,
} as const;

export type QuestionType = keyof typeof questionGenerators; 