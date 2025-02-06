import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const multiplicationQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(12 * difficulty, 100);
    const num1 = getRandomInt(2, maxNum);
    const num2 = getRandomInt(2, maxNum);

    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} has ${num1} boxes of ${randomChoice(singaporeContexts.food)}. Each box contains ${num2} items. How many items are there in total?`,
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} makes ${num1} trips per day to ${randomChoice(singaporeContexts.places)}. If each trip carries ${num2} passengers, how many passengers are carried in total per day?`,
        context: 'transport',
      },
    ];

    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${num1} × ${num2} = ?`;

    const answer = num1 * num2;

    return {
      id: `multiplication-${num1}-${num2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Use multiplication tables or break down into smaller parts:`,
          `${num1} × ${num2} = ${answer}`,
        ],
        explanation: `Multiplying ${num1} by ${num2} gives us ${answer}`,
      },
      hints: [
        'Break down the multiplication into smaller parts if needed',
        'Use multiplication tables if you know them',
        'You can also think of it as repeated addition',
        `${num1} × ${num2} means adding ${num1} to itself ${num2} times`,
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
      .replace('multiplication-', '')
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
    const wasWordProblem = !originalQuestion.text.includes('×');

    // Generate new question with similar structure but different numbers
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} has ${newNum1} boxes of ${randomChoice(singaporeContexts.food)}. Each box contains ${newNum2} items. How many items are there in total?`,
        context: 'shopping',
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} makes ${newNum1} trips per day to ${randomChoice(singaporeContexts.places)}. If each trip carries ${newNum2} passengers, how many passengers are carried in total per day?`,
        context: 'transport',
      },
    ];

    const questionText = wasWordProblem
      ? randomChoice(wordProblemTemplates).template
      : `${newNum1} × ${newNum2} = ?`;

    const answer = newNum1 * newNum2;

    return {
      id: `multiplication-${newNum1}-${newNum2}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Use multiplication tables or break down into smaller parts:`,
          `${newNum1} × ${newNum2} = ${answer}`,
        ],
        explanation: `Multiplying ${newNum1} by ${newNum2} gives us ${answer}`,
      },
      hints: [
        'Break down the multiplication into smaller parts if needed',
        'Use multiplication tables if you know them',
        'You can also think of it as repeated addition',
        `${newNum1} × ${newNum2} means adding ${newNum1} to itself ${newNum2} times`,
      ],
      difficulty:
        originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
    };
  },
};
