import { getRandomInt } from '@/lib/utils/math';
import { MathCategory, QuestionGenerator } from '@/types/math';

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
        
        if (type === 'area') {
          questionText = `Find the area of a square with side length ${side} units.`;
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
          questionText = `Find the perimeter of a square with side length ${side} units.`;
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
        
        if (type === 'area') {
          questionText = `Find the area of a rectangle with length ${length} units and width ${width} units.`;
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
          questionText = `Find the perimeter of a rectangle with length ${length} units and width ${width} units.`;
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
        
        if (type === 'area') {
          questionText = `Find the area of a circle with radius ${radius} units (use π ≈ 3.14, round to nearest whole number).`;
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
          questionText = `Find the circumference of a circle with radius ${radius} units (use π ≈ 3.14, round to nearest whole number).`;
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
      category: MathCategory.GEOMETRY,
      solution: {
        steps,
        explanation: steps.join('. ')
      },
      hints,
      difficulty
    };
  }
}; 