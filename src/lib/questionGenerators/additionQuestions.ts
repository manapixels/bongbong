import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/lib/types';

export const additionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(100 * difficulty, 1000);
    const num1 = getRandomInt(maxNum / 10, maxNum);
    const num2 = getRandomInt(maxNum / 10, maxNum);
    
    const wordProblemTemplates = [
      `John has ${num1} marbles and gets ${num2} more. How many marbles does he have now?`,
      `A store sold ${num1} items in the morning and ${num2} items in the afternoon. How many items were sold in total?`,
      `There are ${num1} red flowers and ${num2} blue flowers in a garden. How many flowers are there altogether?`
    ];
    
    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      wordProblemTemplates[getRandomInt(0, wordProblemTemplates.length - 1)] :
      `${num1} + ${num2} = ?`;
    
    const answer = num1 + num2;
    
    return {
      id: `addition-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathCategory.ADDITION,
      solution: {
        steps: [
          `Align the numbers by place value:`,
          `  ${num1}`,
          `+ ${num2}`,
          `------`,
          `  ${answer}`
        ],
        explanation: `Adding ${num1} and ${num2} gives us ${answer}`
      },
      hints: [
        'Align the numbers by their place values',
        'Start adding from the ones place',
        'Remember to carry over when the sum in any place is 10 or more',
        `${num1} + ${num2} can be broken down by place values`
      ],
      difficulty
    };
  },
}; 