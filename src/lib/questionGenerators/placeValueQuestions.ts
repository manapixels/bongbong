import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/lib/types';

export const placeValueQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    // Adjust max number based on difficulty
    const maxDigits = Math.min(3 + difficulty, 6);
    const number = getRandomInt(Math.pow(10, maxDigits - 1), Math.pow(10, maxDigits) - 1);
    const numStr = number.toString();
    
    const places = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];
    const placeIndex = getRandomInt(0, numStr.length - 1);
    
    const questionText = `In the number ${number}, what is the value of the digit in the ${places[placeIndex]} place?`;
    const digit = numStr[numStr.length - 1 - placeIndex];
    const value = parseInt(digit) * Math.pow(10, placeIndex);
    
    return {
      id: `place-value-${number}-${places[placeIndex]}`,
      text: questionText,
      correctAnswer: value.toString(),
      category: MathCategory.PLACE_VALUE,
      solution: {
        steps: [
          `Identify the digit in the ${places[placeIndex]} place: ${digit}`,
          `Multiply ${digit} by ${Math.pow(10, placeIndex)} (the place value)`,
          `${digit} × ${Math.pow(10, placeIndex)} = ${value}`
        ],
        explanation: `The digit ${digit} is in the ${places[placeIndex]} place, so its value is ${digit} × ${Math.pow(10, placeIndex)} = ${value}`
      },
      hints: [
        `Look at the position from right to left`,
        `Each position represents a power of 10`,
        `The ${places[placeIndex]} place means multiply by ${Math.pow(10, placeIndex)}`
      ],
      difficulty
    };
  },
}; 