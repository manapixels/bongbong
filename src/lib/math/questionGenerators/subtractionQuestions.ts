import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';

export const subtractionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(100 * difficulty, 1000);
    const num1 = getRandomInt(maxNum / 2, maxNum);
    const num2 = getRandomInt(maxNum / 10, num1); // Ensure num2 < num1
    
    const questionText = `${num1} - ${num2} = ?`;
    const answer = num1 - num2;
    
    return {
      id: `subtraction-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathCategory.SUBTRACTION,
      solution: {
        steps: [
          `Start with ${num1}`,
          `Subtract ${num2}`,
          `${num1} - ${num2} = ${answer}`
        ],
        explanation: `Subtracting ${num2} from ${num1} gives us ${answer}`
      },
      hints: [
        'Align the numbers by place value',
        'Start from the right (ones place)',
        'Remember to borrow if needed'
      ],
      difficulty
    };
  }
}; 