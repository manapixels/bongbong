import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const divisionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxDivisor = Math.min(12 * difficulty, 50);
    const divisor = getRandomInt(2, maxDivisor);
    const quotient = getRandomInt(2, maxDivisor);
    const dividend = divisor * quotient;
    
    // Generate contextual word problems
    const wordProblems = [
      {
        template: `${randomChoice(singaporeContexts.hawkerFood)} costs $${dividend} in total. If it is shared equally among ${divisor} friends at ${randomChoice(singaporeContexts.places)}, how much should each person pay?`,
        context: 'food'
      },
      {
        template: `A class at ${randomChoice(singaporeContexts.schools)} has ${dividend} ${randomChoice(singaporeContexts.food)} to distribute equally among ${divisor} students. How many will each student receive?`,
        context: 'school'
      },
      {
        template: `${randomChoice(singaporeContexts.transport)} carries ${dividend} passengers in total. If each trip can take ${divisor} passengers, how many trips are needed?`,
        context: 'transport'
      }
    ];

    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      randomChoice(wordProblems).template :
      `${dividend} ÷ ${divisor} = ?`;
    
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