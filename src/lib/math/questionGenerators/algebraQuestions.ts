import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';

export const algebraQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const questionTypes = ['solve', 'simplify', 'evaluate'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    
    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];
    
    switch(type) {
      case 'solve': {
        // Generate a simple linear equation
        const x = getRandomInt(1, 10 * difficulty);
        const coefficient = getRandomInt(2, 5);
        const constant = getRandomInt(1, 20);
        
        questionText = `Solve for x: ${coefficient}x + ${constant} = ${coefficient * x + constant}`;
        answer = x.toString();
        
        steps = [
          `Subtract ${constant} from both sides`,
          `${coefficient}x = ${coefficient * x}`,
          `Divide both sides by ${coefficient}`,
          `x = ${x}`
        ];
        hints = [
          'Move constant terms to one side',
          'Collect like terms',
          'Divide to isolate x'
        ];
        break;
      }
      
      case 'simplify': {
        // Generate algebraic expression to simplify
        const a = getRandomInt(2, 5);
        const b = getRandomInt(1, 5);
        const c = getRandomInt(2, 5);
        
        questionText = `Simplify: ${a}x + ${b}x + ${c}`;
        answer = `${a + b}x + ${c}`;
        
        steps = [
          `Combine like terms: ${a}x and ${b}x`,
          `${a}x + ${b}x = ${a + b}x`,
          `Final expression: ${a + b}x + ${c}`
        ];
        hints = [
          'Look for like terms (terms with same variable)',
          'Add coefficients of like terms',
          'Keep constants separate'
        ];
        break;
      }
      
      default: {
        // Evaluate expression
        const x = getRandomInt(1, 5);
        const coefficient = getRandomInt(2, 5);
        const constant = getRandomInt(1, 10);
        
        questionText = `Evaluate ${coefficient}x + ${constant} when x = ${x}`;
        answer = (coefficient * x + constant).toString();
        
        steps = [
          `Replace x with ${x}`,
          `${coefficient}(${x}) + ${constant}`,
          `${coefficient * x} + ${constant}`,
          `${coefficient * x + constant}`
        ];
        hints = [
          `Substitute ${x} for x`,
          'Multiply first',
          'Then add the constant'
        ];
      }
    }
    
    return {
      id: `algebra-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathSubStrand.ALGEBRA,
      solution: {
        steps,
        explanation: steps.join('. ')
      },
      hints,
      difficulty
    };
  },

  generateSimilarQuestion: (originalQuestion: Question, variation: 'easier' | 'harder' | 'same' = 'same') => {
    // For now, just generate a new question with the same difficulty
    return algebraQuestionGenerator.generateQuestion(
      originalQuestion.difficulty * (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );
  }
}; 