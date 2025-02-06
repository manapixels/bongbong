import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';

export const fractionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxDenom = Math.min(6 + difficulty * 2, 12);
    const denominator = getRandomInt(2, maxDenom);
    const numerator = getRandomInt(1, denominator - 1);

    // Generate multiplier for equivalent fraction
    const multiplier = getRandomInt(2, 4);

    const questionText = `Find an equivalent fraction for ${numerator}/${denominator}`;
    const equivNum = numerator * multiplier;
    const equivDenom = denominator * multiplier;

    return {
      id: `equivalent-fraction-${numerator}-${denominator}-${multiplier}`,
      text: questionText,
      correctAnswer: `${equivNum}/${equivDenom}`,
      category: MathSubStrand.FRACTIONS,
      solution: {
        steps: [
          `Start with the fraction ${numerator}/${denominator}`,
          `Multiply both top and bottom by ${multiplier}`,
          `(${numerator} × ${multiplier})/(${denominator} × ${multiplier})`,
          `${equivNum}/${equivDenom}`,
        ],
        explanation: `To find an equivalent fraction, multiply both numerator and denominator by ${multiplier}`,
      },
      hints: [
        'Equivalent fractions represent the same amount',
        'Multiply or divide both top and bottom by the same number',
        `Try multiplying both numbers by ${multiplier}`,
      ],
      difficulty,
    };
  },

  generateSimilarQuestion: (
    originalQuestion: Question,
    variation: 'easier' | 'harder' | 'same' = 'same'
  ) => {
    // For now, just generate a new question with the same difficulty
    return fractionQuestionGenerator.generateQuestion(
      originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );
  },
};
