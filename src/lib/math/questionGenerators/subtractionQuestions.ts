import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const subtractionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(100 * difficulty, 1000);
    const num1 = getRandomInt(maxNum / 2, maxNum);
    const num2 = getRandomInt(maxNum / 10, num1); // Ensure num2 < num1
    
    const wordProblems = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} started with ${num1} ${randomChoice(singaporeContexts.food)} and sold ${num2} of them. How many are left?`,
        context: 'shopping'
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} at ${randomChoice(singaporeContexts.places)} had ${num1} passengers. After ${num2} passengers got off, how many remained?`,
        context: 'transport'
      },
      {
        template: `During ${randomChoice(singaporeContexts.festivals)}, a student saved $${num1}. After spending $${num2} at ${randomChoice(singaporeContexts.shopping)}, how much money is left?`,
        context: 'money'
      },
      {
        template: `${randomChoice(singaporeContexts.schools)} ordered ${num1} ${randomChoice(singaporeContexts.drinks)}. If ${num2} were distributed, how many are still available?`,
        context: 'school'
      }
    ];
    
    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      randomChoice(wordProblems).template :
      `${num1} - ${num2} = ?`;
    
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