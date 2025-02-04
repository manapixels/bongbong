import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';

export const multiplicationQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(12 * difficulty, 50);
    const num1 = getRandomInt(2, maxNum);
    const num2 = getRandomInt(2, maxNum);
    
    const questionText = `${num1} × ${num2} = ?`;
    const answer = num1 * num2;
    
    return {
      id: `multiplication-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathCategory.MULTIPLICATION,
      solution: {
        steps: [
          `Break down ${num1} × ${num2}`,
          `Multiply each place value`,
          `${num1} × ${num2} = ${answer}`
        ],
        explanation: `Multiplying ${num1} by ${num2} gives us ${answer}`
      },
      hints: [
        'Break the problem into smaller parts',
        'Use the multiplication table',
        'Remember to add place holders for larger numbers'
      ],
      difficulty
    };
  }
}; 