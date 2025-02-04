import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';

export const wordProblemQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const problemTypes = ['rate', 'comparison', 'mixture', 'age'] as const;
    const type = problemTypes[getRandomInt(0, problemTypes.length - 1)];
    
    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];
    
    switch(type) {
      case 'rate': {
        const speed = getRandomInt(20, 30 + 10 * difficulty);
        const time = getRandomInt(1, 5);
        const distance = speed * time;
        
        questionText = `A car travels at ${speed} miles per hour. How far will it travel in ${time} hours?`;
        answer = distance.toString();
        
        steps = [
          'Use the formula: distance = speed × time',
          `Distance = ${speed} × ${time}`,
          `Distance = ${distance} miles`
        ];
        hints = [
          'Think about the relationship between distance, speed, and time',
          'Multiply speed by time',
          'Include units in your answer'
        ];
        break;
      }
      
      case 'comparison': {
        const smaller = getRandomInt(20, 50);
        const difference = getRandomInt(5, 15 * difficulty);
        const larger = smaller + difference;
        
        questionText = `John has ${smaller} marbles. Sarah has ${difference} more marbles than John. How many marbles does Sarah have?`;
        answer = larger.toString();
        
        steps = [
          `Start with John's marbles: ${smaller}`,
          `Add the difference: ${smaller} + ${difference}`,
          `Sarah has ${larger} marbles`
        ];
        hints = [
          'Identify what is known',
          'Look for comparison words like "more than"',
          'Add to find the larger amount'
        ];
        break;
      }
      
      case 'mixture': {
        const quantity1 = getRandomInt(2, 5 * difficulty);
        const quantity2 = getRandomInt(2, 5 * difficulty);
        const total = quantity1 + quantity2;
        
        questionText = `A recipe needs ${quantity1} cups of flour and ${quantity2} cups of sugar. How many cups of ingredients are needed in total?`;
        answer = total.toString();
        
        steps = [
          `Add the quantities: ${quantity1} + ${quantity2}`,
          `Total = ${total} cups`
        ];
        hints = [
          'Add all quantities together',
          'Keep track of units',
          'Make sure to include all ingredients'
        ];
        break;
      }
      
      default: {
        // Age problem
        const currentAge = getRandomInt(5, 10);
        const yearsLater = getRandomInt(3, 8);
        const futureAge = currentAge + yearsLater;
        
        questionText = `Tom is ${currentAge} years old now. How old will he be in ${yearsLater} years?`;
        answer = futureAge.toString();
        
        steps = [
          `Start with current age: ${currentAge}`,
          `Add years: ${currentAge} + ${yearsLater}`,
          `Future age = ${futureAge}`
        ];
        hints = [
          'Start with the current age',
          'Add the number of years',
          'Think about how age changes over time'
        ];
      }
    }
    
    return {
      id: `word-problem-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathCategory.WORD_PROBLEMS,
      solution: {
        steps,
        explanation: steps.join('. ')
      },
      hints,
      difficulty
    };
  }
}; 