import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';

export const decimalQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const questionTypes = ['compare', 'order', 'convert'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];

    // Adjust decimal places based on difficulty
    const decimalPlaces = Math.min(difficulty, 3);
    const multiplier = Math.pow(10, decimalPlaces);

    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];

    switch (type) {
      case 'compare': {
        const num1 = getRandomInt(1, 100) / multiplier;
        const num2 = getRandomInt(1, 100) / multiplier;
        questionText = `Which decimal is greater: ${num1} or ${num2}?`;
        answer = Math.max(num1, num2).toString();
        steps = [
          'Line up the decimal points',
          'Compare digits from left to right',
          `${num1} ${num1 > num2 ? '>' : '<'} ${num2}`,
        ];
        hints = [
          'Make sure decimal points are aligned',
          'Start comparing from the left',
          'Add zeros if needed to make lengths equal',
        ];
        break;
      }

      case 'convert': {
        const wholeNumber = getRandomInt(1, 100);
        const decimal = wholeNumber / multiplier;
        questionText = `Convert ${decimal} to a fraction in its simplest form.`;
        answer = `${wholeNumber}/${multiplier}`;
        steps = [
          `Multiply ${decimal} by ${multiplier} to get ${wholeNumber}`,
          `Write as fraction: ${wholeNumber}/${multiplier}`,
          'Simplify if possible',
        ];
        hints = [
          'Move the decimal point right until you have a whole number',
          'Count how many places you moved',
          'Write as a fraction over a power of 10',
        ];
        break;
      }

      default: {
        const decimals = Array.from(
          { length: 3 },
          () => getRandomInt(1, 100) / multiplier
        );
        questionText = `Order these decimals from least to greatest: ${decimals.join(', ')}`;
        answer = [...decimals].sort((a, b) => a - b).join(', ');
        steps = [
          'Line up the decimal points',
          'Compare digits from left to right',
          `Ordered numbers: ${answer}`,
        ];
        hints = [
          'Make sure decimal points are aligned',
          'Add zeros if needed to make lengths equal',
          'Compare one place value at a time',
        ];
      }
    }

    return {
      id: `decimal-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathSubStrand.DECIMALS,
      solution: {
        steps,
        explanation: steps.join('. '),
      },
      hints,
      difficulty,
    };
  },

  generateSimilarQuestion: (
    originalQuestion: Question,
    variation: 'easier' | 'harder' | 'same' = 'same'
  ) => {
    // For now, just generate a new question with the same difficulty
    return decimalQuestionGenerator.generateQuestion(
      originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );
  },
};
