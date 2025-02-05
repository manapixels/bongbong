import { getRandomInt } from '@/lib/utils/math';
import { MathSubStrand, Question, QuestionGenerator } from '@/types/math';

export const numberSenseQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const questionTypes = [
      'ordering',
      'rounding',
      'comparing',
      'estimation'
    ] as const;
    
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    const maxNum = Math.pow(10, Math.min(2 + difficulty, 6));
    
    let questionText = '';
    let answer = '';
    let explanation = '';
    let steps: string[] = [];
    let hints: string[] = [];
    
    switch(type) {
      case 'ordering': {
        const nums = Array.from({length: 4}, () => getRandomInt(0, maxNum));
        questionText = `Order these numbers from least to greatest: ${nums.join(', ')}`;
        const sortedNums = [...nums].sort((a, b) => a - b);
        answer = sortedNums.join(', ');
        steps = [
          'Compare each number',
          'Start with finding the smallest number',
          `Ordered numbers: ${answer}`
        ];
        hints = [
          'Look at the place values',
          'Start by finding the smallest number',
          'Continue finding the next smallest number'
        ];
        break;
      }
      
      case 'rounding': {
        const num = getRandomInt(0, maxNum);
        const places = ['tens', 'hundreds', 'thousands'];
        const placeIndex = getRandomInt(0, Math.min(places.length - 1, difficulty - 1));
        const place = places[placeIndex];
        const roundingFactor = Math.pow(10, placeIndex + 1);
        
        questionText = `Round ${num} to the nearest ${place}`;
        answer = Math.round(num / roundingFactor) * roundingFactor + '';
        steps = [
          `Look at the digit to the right of the ${place} place`,
          `If it's 5 or more, round up; if less, round down`,
          `${num} rounds to ${answer}`
        ];
        hints = [
          `Look at the ${places[placeIndex]} place`,
          '5 or more, raise the score',
          'Less than 5, let it live'
        ];
        break;
      }
      
      default: {
        const num1 = getRandomInt(0, maxNum);
        const num2 = getRandomInt(0, maxNum);
        questionText = `Which number is greater: ${num1} or ${num2}?`;
        answer = Math.max(num1, num2).toString();
        steps = [
          'Compare the digits in each place value',
          `${num1} ${num1 > num2 ? '>' : '<'} ${num2}`,
          `Therefore, ${answer} is greater`
        ];
        hints = [
          'Start by comparing the leftmost digits',
          'Move right until you find different digits',
          'The number with the larger digit is greater'
        ];
      }
    }
    
    return {
      id: `number-sense-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathSubStrand.WHOLE_NUMBERS,
      solution: {
        steps,
        explanation
      },

      hints,
      difficulty
    };
  },
  generateSimilarQuestion: (originalQuestion: Question, variation: 'easier' | 'harder' | 'same' = 'same') => {
    // For now, just generate a new question with the same difficulty
    return numberSenseQuestionGenerator.generateQuestion(
      originalQuestion.difficulty * (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );

  }
}; 