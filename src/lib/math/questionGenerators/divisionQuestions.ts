import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const divisionQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const maxNum = Math.min(12 * difficulty, 100);
    const divisor = getRandomInt(2, maxNum / 2);
    const quotient = getRandomInt(2, maxNum / divisor);
    const dividend = divisor * quotient; // Ensure clean division
    
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} has ${dividend} ${randomChoice(singaporeContexts.food)} to pack into ${divisor} boxes equally. How many items should be in each box?`,
        context: 'shopping'
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} needs to transport ${dividend} passengers from ${randomChoice(singaporeContexts.places)}. If each trip can carry ${divisor} passengers, how many trips are needed?`,
        context: 'transport'
      }
    ];
    
    const useWordProblem = difficulty > 1 && Math.random() > 0.5;
    const questionText = useWordProblem ? 
      randomChoice(wordProblemTemplates).template :
      `${dividend} ÷ ${divisor} = ?`;
    
    const answer = quotient;
    
    return {
      id: `division-${dividend}-${divisor}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Use division or multiplication facts:`,
          `${dividend} ÷ ${divisor} = ${answer}`,
          `Because ${divisor} × ${answer} = ${dividend}`
        ],
        explanation: `Dividing ${dividend} by ${divisor} gives us ${answer}`
      },
      hints: [
        'Think about multiplication facts',
        'What number times the divisor gives us the dividend?',
        'You can also think of it as sharing equally',
        `${dividend} ÷ ${divisor} means sharing ${dividend} items into ${divisor} equal groups`
      ],
      difficulty
    };
  },

  generateSimilarQuestion: (originalQuestion: Question, variation: 'easier' | 'harder' | 'same' = 'same') => {
    // Extract original numbers from the question ID
    const [dividend, divisor] = originalQuestion.id
      .replace('division-', '')
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
    // For division, we need to ensure clean division
    const newDivisor = Math.round(divisor * (min + Math.random() * (max - min)));
    const quotient = Math.round((dividend / divisor) * (min + Math.random() * (max - min)));
    const newDividend = newDivisor * quotient;
    
    // Determine if the original was a word problem
    const wasWordProblem = !originalQuestion.text.includes('÷');
    
    // Generate new question with similar structure but different numbers
    const wordProblemTemplates = [
      {
        template: `${randomChoice(singaporeContexts.shopping)} has ${newDividend} ${randomChoice(singaporeContexts.food)} to pack into ${newDivisor} boxes equally. How many items should be in each box?`,
        context: 'shopping'
      },
      {
        template: `A ${randomChoice(singaporeContexts.transport)} needs to transport ${newDividend} passengers from ${randomChoice(singaporeContexts.places)}. If each trip can carry ${newDivisor} passengers, how many trips are needed?`,
        context: 'transport'
      }
    ];
    
    const questionText = wasWordProblem ? 
      randomChoice(wordProblemTemplates).template :
      `${newDividend} ÷ ${newDivisor} = ?`;
    
    const answer = quotient;
    
    return {
      id: `division-${newDividend}-${newDivisor}`,
      text: questionText,
      correctAnswer: answer.toString(),
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps: [
          `Use division or multiplication facts:`,
          `${newDividend} ÷ ${newDivisor} = ${answer}`,
          `Because ${newDivisor} × ${answer} = ${newDividend}`
        ],
        explanation: `Dividing ${newDividend} by ${newDivisor} gives us ${answer}`
      },
      hints: [
        'Think about multiplication facts',
        'What number times the divisor gives us the dividend?',
        'You can also think of it as sharing equally',
        `${newDividend} ÷ ${newDivisor} means sharing ${newDividend} items into ${newDivisor} equal groups`
      ],
      difficulty: originalQuestion.difficulty * (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1)
    };
  }
}; 