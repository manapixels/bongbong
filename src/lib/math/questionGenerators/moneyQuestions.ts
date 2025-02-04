import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

// Helper function
const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const moneyQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const questionTypes = ['make-change', 'total-cost', 'discount'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    
    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];
    
    switch(type) {
      case 'make-change': {
        const cost = getRandomInt(1, 20 * difficulty) + 0.99;
        const payment = Math.ceil(cost) + getRandomInt(0, 20);
        const change = Number((payment - cost).toFixed(2));
        
        const store = randomChoice(singaporeContexts.shopping);
        const item = randomChoice(singaporeContexts.food);
        
        questionText = `At ${store}, a ${item} costs $${cost.toFixed(2)} and you pay with $${payment.toFixed(2)}. How much change should you receive?`;
        answer = change.toFixed(2);
        
        steps = [
          `Start with payment amount: $${payment.toFixed(2)}`,
          `Subtract cost: $${cost.toFixed(2)}`,
          `Change = $${payment.toFixed(2)} - $${cost.toFixed(2)} = $${change.toFixed(2)}`
        ];
        hints = [
          'Subtract the cost from the payment',
          'Remember to keep track of cents',
          'Round to nearest cent (2 decimal places)'
        ];
        break;
      }
      
      case 'total-cost': {
        const quantity = getRandomInt(2, 5 * difficulty);
        const unitPrice = getRandomInt(1, 10) + 0.99;
        const total = Number((quantity * unitPrice).toFixed(2));
        
        const store = randomChoice(singaporeContexts.shopping);
        const item = randomChoice([...singaporeContexts.food, ...singaporeContexts.drinks]);
        
        questionText = `At ${store}, one ${item} costs $${unitPrice.toFixed(2)}. How much will ${quantity} ${item}s cost?`;
        answer = total.toFixed(2);
        
        steps = [
          `Multiply quantity by unit price`,
          `${quantity} × $${unitPrice.toFixed(2)}`,
          `Total = $${total.toFixed(2)}`
        ];
        hints = [
          'Multiply the price by the number of items',
          'Keep track of decimal places',
          'Round to nearest cent'
        ];
        break;
      }
      
      default: {
        // Discount calculation
        const originalPrice = getRandomInt(20, 100 * difficulty);
        const discountPercent = getRandomInt(1, 5) * 10; // 10%, 20%, etc.
        const discount = Number((originalPrice * (discountPercent / 100)).toFixed(2));
        const finalPrice = Number((originalPrice - discount).toFixed(2));
        
        const store = randomChoice(singaporeContexts.shopping);
        const festival = randomChoice(singaporeContexts.festivals);
        
        questionText = `During ${festival}, ${store} is having a ${discountPercent}% discount on an item that costs $${originalPrice.toFixed(2)}. What is the final price?`;
        answer = finalPrice.toFixed(2);
        
        steps = [
          `Calculate ${discountPercent}% of $${originalPrice.toFixed(2)}`,
          `Discount = $${originalPrice.toFixed(2)} × ${discountPercent}/100 = $${discount.toFixed(2)}`,
          `Subtract discount: $${originalPrice.toFixed(2)} - $${discount.toFixed(2)} = $${finalPrice.toFixed(2)}`
        ];
        hints = [
          `First find ${discountPercent}% of the original price`,
          'Subtract the discount from original price',
          'Round to nearest cent'
        ];
      }
    }
    
    return {
      id: `money-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathCategory.MONEY,
      solution: {
        steps,
        explanation: steps.join('. ')
      },
      hints,
      difficulty
    };
  }
}; 