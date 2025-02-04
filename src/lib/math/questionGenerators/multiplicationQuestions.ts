import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const multiplicationQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(12 * difficulty, 50);
    const num1 = getRandomInt(2, maxNum);
    const num2 = getRandomInt(2, maxNum);
    
    const wordProblems = [
      {
        template: `Each ${randomChoice(singaporeContexts.activities)} costs $${num1}. How much will ${num2} sessions cost in total?`,
        context: 'activities'
      },
      {
        template: `At ${randomChoice(singaporeContexts.shopping)}, each ${randomChoice(singaporeContexts.drinks)} costs $${num1}. How much will ${num2} drinks cost?`,
        context: 'shopping'
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} from ${randomChoice(singaporeContexts.neighborhoods)} to ${randomChoice(singaporeContexts.places)} costs $${num1}. How much will ${num2} trips cost?`,
        context: 'transport'
      }
    ];
    
    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      randomChoice(wordProblems).template :
      `${num1} × ${num2} = ?`;
    
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