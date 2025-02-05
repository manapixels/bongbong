import { getRandomInt } from '@/lib/utils/math';
import { QuestionGenerator, Question, MathSubStrand } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const geometryQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const shapes = {
      2: ['square', 'rectangle', 'triangle', 'circle'],
      3: ['cube', 'cuboid', 'sphere', 'cylinder']
    };

    const questionTypes = ['area', 'perimeter', 'volume'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];
    const dimension = type === 'volume' ? 3 : 2;
    
    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];
    
    // Select a random shape based on dimension
    const shape = shapes[dimension][getRandomInt(0, shapes[dimension].length - 1)];
    
    switch(shape) {
      case 'square': {
        const side = getRandomInt(1, 10 * difficulty);
        const area = side * side;
        const perimeter = 4 * side;
        
        const place = randomChoice(singaporeContexts.places);
        const location = randomChoice([
          `playground at ${place}`,
          `garden at ${place}`,
          `courtyard at ${randomChoice(singaporeContexts.schools)}`,
          `activity area at ${randomChoice(singaporeContexts.schools)}`
        ]);
        
        if (type === 'area') {
          questionText = `The ${location} is a square with side length ${side} meters. What is its area?`;
          answer = area.toString();
          steps = [
            'For a square, area = side × side',
            `Area = ${side} × ${side}`,
            `Area = ${area} square units`
          ];
          hints = [
            'Area of a square is side length squared',
            'Multiply the side length by itself',
            `${side} × ${side}`
          ];
        } else {
          questionText = `A square ${location} has sides of ${side} meters each. What is its perimeter?`;
          answer = perimeter.toString();
          steps = [
            'For a square, perimeter = 4 × side',
            `Perimeter = 4 × ${side}`,
            `Perimeter = ${perimeter} units`
          ];
          hints = [
            'Perimeter is the total distance around the shape',
            'A square has 4 equal sides',
            'Multiply the side length by 4'
          ];
        }
        break;
      }
      
      case 'rectangle': {
        const length = getRandomInt(2, 10 * difficulty);
        const width = getRandomInt(1, length - 1);
        const area = length * width;
        const perimeter = 2 * (length + width);
        
        const place = randomChoice(singaporeContexts.places);
        const location = randomChoice([
          `classroom at ${randomChoice(singaporeContexts.schools)}`,
          `study area at ${place}`,
          `food court at ${place}`,
          `swimming pool at ${randomChoice(singaporeContexts.neighborhoods)}`
        ]);
        
        if (type === 'area') {
          questionText = `A rectangular ${location} is ${length} meters long and ${width} meters wide. What is its area?`;
          answer = area.toString();
          steps = [
            'For a rectangle, area = length × width',
            `Area = ${length} × ${width}`,
            `Area = ${area} square units`
          ];
          hints = [
            'Area is the space inside the shape',
            'Multiply length by width',
            `${length} × ${width}`
          ];
        } else {
          questionText = `A rectangular ${location} has length ${length} meters and width ${width} meters. What is its perimeter?`;
          answer = perimeter.toString();
          steps = [
            'For a rectangle, perimeter = 2 × (length + width)',
            `Perimeter = 2 × (${length} + ${width})`,
            `Perimeter = 2 × ${length + width}`,
            `Perimeter = ${perimeter} units`
          ];
          hints = [
            'Add length and width',
            'Multiply their sum by 2',
            'Remember: 2 lengths + 2 widths'
          ];
        }
        break;
      }
      
      default: {
        // Circle as default case
        const radius = getRandomInt(1, 5 * difficulty);
        const area = Math.round(Math.PI * radius * radius);
        const circumference = Math.round(2 * Math.PI * radius);
        
        const place = randomChoice(singaporeContexts.places);
        const location = randomChoice([
          `fountain at ${place}`,
          `circular garden at ${place}`,
          `roundabout near ${place}`,
          `circular plaza at ${randomChoice(singaporeContexts.neighborhoods)}`
        ]);
        
        if (type === 'area') {
          questionText = `The ${location} has a radius of ${radius} meters. What is its area? (use π ≈ 3.14, round to nearest whole number)`;
          answer = area.toString();
          steps = [
            'For a circle, area = π × radius²',
            `Area = 3.14 × ${radius}²`,
            `Area = 3.14 × ${radius * radius}`,
            `Area ≈ ${area} square units`
          ];
          hints = [
            'Use the formula A = πr²',
            'Square the radius first',
            'Multiply by π (3.14)'
          ];
        } else {
          questionText = `The ${location} has a radius of ${radius} meters. What is its circumference? (use π ≈ 3.14, round to nearest whole number)`;
          answer = circumference.toString();
          steps = [
            'For a circle, circumference = 2 × π × radius',
            `Circumference = 2 × 3.14 × ${radius}`,
            `Circumference ≈ ${circumference} units`
          ];
          hints = [
            'Use the formula C = 2πr',
            'Multiply radius by 2π',
            'Remember π ≈ 3.14'
          ];
        }
      }
    }
    
    return {
      id: `geometry-${shape}-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathSubStrand.GEOMETRY,
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
    return geometryQuestionGenerator.generateQuestion(
      originalQuestion.difficulty * (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );
  }
}; 