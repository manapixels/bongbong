import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';

export const divisionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    // Generate divisor and quotient first to ensure clean division
    const maxDivisor = Math.min(12 * difficulty, 50);
    const divisor = getRandomInt(2, maxDivisor);
    const quotient = getRandomInt(2, maxDivisor);
    
    // Calculate dividend
    const dividend = divisor * quotient;
    
    const questionText = `${dividend} ÷ ${divisor} = ?`;
    
    return {
      id: `division-${dividend}-${divisor}`,
      text: questionText,
      correctAnswer: quotient.toString(),
      category: MathCategory.DIVISION,
      solution: {
        steps: [
          `Identify that ${dividend} ÷ ${divisor} is asking how many groups of ${divisor} make ${dividend}`,
          `${divisor} × ${quotient} = ${dividend}`,
          `Therefore, ${dividend} ÷ ${divisor} = ${quotient}`
        ],
        explanation: `When we divide ${dividend} by ${divisor}, we get ${quotient}`
      },
      hints: [
        'Think of division as making equal groups',
        'Look for multiplication facts you know',
        `What number times ${divisor} equals ${dividend}?`
      ],
      difficulty
    };
  }
}; 