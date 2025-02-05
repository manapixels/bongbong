import { getRandomInt } from '@/lib/utils/math';
import crypto from 'crypto';
import { MathSubStrand, Question, QuestionGenerator } from '@/types/math';

export const ratioQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    // Adjust number ranges based on difficulty
    const maxNum = Math.min(12 + difficulty * 4, 30);
    const questionTypes = ['equivalent', 'simplify', 'compare'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];

    // Generate two random numbers for the base ratio
    const num1 = getRandomInt(1, maxNum);
    const num2 = getRandomInt(1, maxNum);

    // Initialize variables with default values
    let question = '';
    let answer = '';
    let explanation = '';
    let hints: string[] = [];
    let multiplier: number;

    switch (type) {
      case 'equivalent':
        multiplier = getRandomInt(2, 5);
        question = `If the ratio is ${num1}:${num2}, what numbers would make an equivalent ratio when the first number is ${num1 * multiplier}?`;
        answer = `${num1 * multiplier}:${num2 * multiplier}`;
        explanation = `To find an equivalent ratio, multiply both numbers by the same value. In this case, multiplying by ${multiplier} gives us ${num1 * multiplier}:${num2 * multiplier}`;
        hints = [
          'Equivalent ratios maintain the same relationship between numbers',
          'If one number in the ratio is multiplied by a number, the other must be multiplied by the same number',
          `The first number was multiplied by ${multiplier}, so...`
        ];
        break;

      case 'simplify':
        // Ensure the numbers share a common factor
        const factor = getRandomInt(2, 4);
        const simplifiedNum1 = num1 * factor;
        const simplifiedNum2 = num2 * factor;
        question = `Simplify the ratio ${simplifiedNum1}:${simplifiedNum2}`;
        answer = `${num1}:${num2}`;
        explanation = `To simplify ${simplifiedNum1}:${simplifiedNum2}, divide both numbers by ${factor} to get ${num1}:${num2}`;
        hints = [
          'Look for the largest number that divides evenly into both numbers',
          'Try dividing both numbers by 2, 3, or 4',
          `Both numbers are divisible by ${factor}`
        ];
        break;

      case 'compare':
        const ratio2Num1 = getRandomInt(1, maxNum);
        const ratio2Num2 = getRandomInt(1, maxNum);
        question = `Which ratio is larger: ${num1}:${num2} or ${ratio2Num1}:${ratio2Num2}?`;
        const ratio1Value = num1 / num2;
        const ratio2Value = ratio2Num1 / ratio2Num2;
        answer = ratio1Value > ratio2Value ? 
          `${num1}:${num2}` : 
          `${ratio2Num1}:${ratio2Num2}`;
        explanation = `Converting both ratios to decimals: ${num1}:${num2} = ${ratio1Value.toFixed(2)}, ${ratio2Num1}:${ratio2Num2} = ${ratio2Value.toFixed(2)}. Therefore, ${answer} is larger.`;
        hints = [
          'Convert each ratio to a decimal by dividing the first number by the second',
          'Compare the decimal values to find the larger ratio',
          `${num1} ÷ ${num2} = ${ratio1Value.toFixed(2)}, ${ratio2Num1} ÷ ${ratio2Num2} = ${ratio2Value.toFixed(2)}`
        ];
        break;

      default:
        // Fallback to equivalent ratio question if something goes wrong
        multiplier = getRandomInt(2, 5);
        question = `If the ratio is ${num1}:${num2}, what numbers would make an equivalent ratio when the first number is ${num1 * multiplier}?`;
        answer = `${num1 * multiplier}:${num2 * multiplier}`;
        explanation = `To find an equivalent ratio, multiply both numbers by the same value. In this case, multiplying by ${multiplier} gives us ${num1 * multiplier}:${num2 * multiplier}`;
        hints = [
          'Equivalent ratios maintain the same relationship between numbers',
          'If one number in the ratio is multiplied by a number, the other must be multiplied by the same number',
          `The first number was multiplied by ${multiplier}, so...`
        ];
    }

    return {
      id: crypto.randomUUID(),
      text: question,
      correctAnswer: answer,
      category: MathSubStrand.FRACTIONS,
      solution: {
        steps: [explanation],
        explanation: explanation
      },

      hints,
      difficulty
    };
  },
  generateSimilarQuestion: (originalQuestion: Question, variation: 'easier' | 'harder' | 'same' = 'same') => {
    // For now, just generate a new question with the same difficulty
    return ratioQuestionGenerator.generateQuestion(
      originalQuestion.difficulty * (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );

  }
}; 