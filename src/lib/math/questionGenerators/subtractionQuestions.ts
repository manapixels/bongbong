import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const subtractionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(100 * difficulty, 1000);
    const num1 = getRandomInt(maxNum / 2, maxNum);
    const num2 = getRandomInt(maxNum / 10, num1); // Ensure num2 is less than num1

    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} had ${num1} items. After selling ${num2} items, how many items were left?`,
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} started with ${num1} passengers. After ${num2} passengers got off at ${randomChoice(singaporeContexts.places)}, how many passengers were left?`,
        context: 'transport',
      },
      {
        template: `During ${randomChoice(singaporeContexts.festivals)}, a student saved $${num1}. After spending $${num2} at ${randomChoice(singaporeContexts.shopping)}, how much money is left?`,
        context: 'money',
      },
      {
        template: `${randomChoice(singaporeContexts.schools)} ordered ${num1} ${randomChoice(singaporeContexts.drinks)}. If ${num2} were distributed, how many are still available?`,
        context: 'school',
      },
    ];

    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${num1} - ${num2} = ?`;

    const answer = num1 - num2;

    return {
      id: `subtraction-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Align the numbers by place value:`,
          `  ${num1}`,
          `- ${num2}`,
          `------`,
          `  ${answer}`,
        ],
        explanation: `Subtracting ${num2} from ${num1} gives us ${answer}`,
      },
      hints: [
        'Align the numbers by their place values',
        'Start subtracting from the ones place',
        'Remember to borrow if needed',
        `${num1} - ${num2} can be broken down by place values`,
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
      .replace('subtraction-', '')
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
    const wasWordProblem = !originalQuestion.text.includes('-');

    // Generate new question with similar structure but different numbers
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} had ${newNum1} items. After selling ${newNum2} items, how many items were left?`,
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} started with ${newNum1} passengers. After ${newNum2} passengers got off at ${randomChoice(singaporeContexts.places)}, how many passengers were left?`,
        context: 'transport',
      },
    ];

    const questionText = wasWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${newNum1} - ${newNum2} = ?`;

    const answer = newNum1 - newNum2;

    return {
      id: `subtraction-${newNum1}-${newNum2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Align the numbers by place value:`,
          `  ${newNum1}`,
          `- ${newNum2}`,
          `------`,
          `  ${answer}`,
        ],
        explanation: `Subtracting ${newNum2} from ${newNum1} gives us ${answer}`,
      },
      hints: [
        'Align the numbers by their place values',
        'Start subtracting from the ones place',
        'Remember to borrow if needed',
        `${newNum1} - ${newNum2} can be broken down by place values`,
      ],
      difficulty:
        originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
    };
  },
};
