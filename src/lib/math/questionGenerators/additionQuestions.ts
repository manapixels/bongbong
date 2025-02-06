import { getRandomInt } from '@/lib/utils/math';
import { MathSubStrand, QuestionGenerator, Question } from '@/types/math';
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
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} carried ${num1} passengers in the morning and ${num2} passengers in the evening from ${randomChoice(singaporeContexts.places)}. How many passengers were carried in total?`,
        context: 'transport',
      },
      {
        template: `At ${randomChoice(singaporeContexts.places)}, there are ${num1} ${randomChoice(singaporeContexts.food)} and ${num2} ${randomChoice(singaporeContexts.drinks)} sold. How many items were sold altogether?`,
        context: 'food',
      },
    ];

    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${num1} + ${num2} = ?`;

    const answer = num1 + num2;

    return {
      id: `addition-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Align the numbers by place value:`,

          `  ${num1}`,
          `+ ${num2}`,
          `------`,
          `  ${answer}`,
        ],
        explanation: `Adding ${num1} and ${num2} gives us ${answer}`,
      },
      hints: [
        'Align the numbers by their place values',
        'Start adding from the ones place',
        'Remember to carry over when the sum in any place is 10 or more',
        `${num1} + ${num2} can be broken down by place values`,
      ],
      difficulty,
    };
  },

  generateSimilarQuestion: (
    originalQuestion: Question,
    variation: 'easier' | 'harder' | 'same' = 'same'
  ) => {
    // Extract original numbers from the question ID
    const [num1, num2] = originalQuestion.id
      .replace('addition-', '')
      .split('-')
      .map(Number);

    // Define variation ranges based on the requested variation
    const getVariationRange = () => {
      switch (variation) {
        case 'easier':
          return { min: 0.5, max: 0.8 };
        case 'harder':
          return { min: 1.2, max: 1.5 };
        case 'same':
        default:
          return { min: 0.9, max: 1.1 };
      }
    };

    const { min, max } = getVariationRange();

    // Generate new numbers that are similar but not identical
    const newNum1 = Math.round(num1 * (min + Math.random() * (max - min)));
    const newNum2 = Math.round(num2 * (min + Math.random() * (max - min)));

    // Determine if the original was a word problem
    const wasWordProblem = !originalQuestion.text.includes('+');

    // Generate new question with similar structure but different numbers
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} sold ${newNum1} items in the morning and ${newNum2} items in the afternoon. How many items were sold in total?`,
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} carried ${newNum1} passengers in the morning and ${newNum2} passengers in the evening from ${randomChoice(singaporeContexts.places)}. How many passengers were carried in total?`,
        context: 'transport',
      },
      {
        template: `At ${randomChoice(singaporeContexts.places)}, there are ${newNum1} ${randomChoice(singaporeContexts.food)} and ${newNum2} ${randomChoice(singaporeContexts.drinks)} sold. How many items were sold altogether?`,
        context: 'food',
      },
    ];

    const questionText = wasWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${newNum1} + ${newNum2} = ?`;

    const answer = newNum1 + newNum2;

    return {
      id: `addition-${newNum1}-${newNum2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Align the numbers by place value:`,

          `  ${newNum1}`,
          `+ ${newNum2}`,
          `------`,
          `  ${answer}`,
        ],
        explanation: `Adding ${newNum1} and ${newNum2} gives us ${answer}`,
      },
      hints: [
        'Align the numbers by their place values',
        'Start adding from the ones place',
        'Remember to carry over when the sum in any place is 10 or more',
        `${newNum1} + ${newNum2} can be broken down by place values`,
      ],
      difficulty:
        originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
    };
  },
};
