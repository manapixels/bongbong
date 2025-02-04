import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

// Helper function to get random item from array
const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

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
        
        // Use Singapore transport context
        const transport = randomChoice(singaporeContexts.transport);
        const destination = randomChoice(singaporeContexts.places);
        
        questionText = `A ${transport} travels at ${speed} kilometers per hour from ${randomChoice(singaporeContexts.places)} to ${destination}. How far will it travel in ${time} hours?`;
        answer = distance.toString();
        
        steps = [
          'Use the formula: distance = speed × time',
          `Distance = ${speed} × ${time}`,
          `Distance = ${distance} kilometers`
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
        
        // Use Singapore shopping/food context
        const item = randomChoice([...singaporeContexts.food]);
        const location = randomChoice(singaporeContexts.shopping);
        const price = getRandomInt(5, 15);
        
        questionText = `${location} sold ${smaller} plates of ${item} in the morning. They sold ${difference} more plates in the evening. How many plates did they sell in the evening?`;
        answer = larger.toString();
        
        steps = [
          `Start with morning sales: ${smaller} plates`,
          `Add the difference: ${smaller} + ${difference}`,
          `Evening sales = ${larger} plates`
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
        
        // Use Singapore food context
        const food1 = randomChoice(singaporeContexts.food);
        const food2 = randomChoice(singaporeContexts.food.filter(f => f !== food1));
        const location = randomChoice(singaporeContexts.places);
        
        questionText = `A food stall at ${location} prepared ${quantity1} servings of ${food1} and ${quantity2} servings of ${food2}. How many total servings did they prepare?`;
        answer = total.toString();
        
        steps = [
          `Add the quantities: ${quantity1} + ${quantity2}`,
          `Total servings = ${total}`
        ];
        hints = [
          'Add all quantities together',
          'Keep track of the total servings',
          'Make sure to count both types of food'
        ];
        break;
      }
      
      default: {
        // Age problem with Singapore context
        const currentAge = getRandomInt(5, 10);
        const yearsLater = getRandomInt(3, 8);
        const futureAge = currentAge + yearsLater;
        
        const location = randomChoice([...singaporeContexts.schools]);
        
        questionText = `Ming is ${currentAge} years old and goes to ${location}. How old will he be in ${yearsLater} years?`;
        answer = futureAge.toString();
        
        steps = [
          `Start with Ming's current age: ${currentAge}`,
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