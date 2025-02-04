import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const additionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(100 * difficulty, 1000);
    const num1 = getRandomInt(maxNum / 10, maxNum);
    const num2 = getRandomInt(maxNum / 10, maxNum);
    
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} sold ${num1} items in the morning and ${num2} items in the afternoon. How many items were sold in total?`,
        context: 'shopping'
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} carried ${num1} passengers in the morning and ${num2} passengers in the evening from ${randomChoice(singaporeContexts.places)}. How many passengers were carried in total?`,
        context: 'transport'
      },
      {
        template: `At ${randomChoice(singaporeContexts.places)}, there are ${num1} ${randomChoice(singaporeContexts.food)} and ${num2} ${randomChoice(singaporeContexts.drinks)} sold. How many items were sold altogether?`,
        context: 'food'
      }
    ];
    
    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      randomChoice(wordProblemTemplates).template :
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