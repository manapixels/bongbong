import { getRandomInt } from '@/lib/utils/math';
import { MathSubStrand, Question, QuestionGenerator } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';

const randomChoice = <T>(arr: T[]): T => arr[getRandomInt(0, arr.length - 1)];

export const measurementQuestionGenerator: QuestionGenerator = {
  generateQuestion: (difficulty: number, previousMistakes: string[]) => {
    const units = {
      length: ['mm', 'cm', 'm', 'km'],
      mass: ['mg', 'g', 'kg'],
      volume: ['ml', 'l'],
      time: ['seconds', 'minutes', 'hours'],
    };

    const questionTypes = ['convert', 'compare', 'calculate'] as const;
    const type = questionTypes[getRandomInt(0, questionTypes.length - 1)];

    // Select random measurement category
    const categories = Object.keys(units) as (keyof typeof units)[];
    const category = categories[getRandomInt(0, categories.length - 1)];

    let questionText = '';
    let answer = '';
    let steps: string[] = [];
    let hints: string[] = [];

    switch (type) {
      case 'convert': {
        const unitList = units[category];
        const fromIndex = getRandomInt(0, unitList.length - 2);
        const toIndex = getRandomInt(fromIndex + 1, unitList.length - 1);

        const value = getRandomInt(1, 10 * difficulty);
        const fromUnit = unitList[fromIndex];
        const toUnit = unitList[toIndex];

        const context = randomChoice([
          `traveling from ${randomChoice(singaporeContexts.places)} to ${randomChoice(singaporeContexts.places)}`,
          `measuring ingredients for ${randomChoice(singaporeContexts.food)}`,
          `distance between ${randomChoice(singaporeContexts.neighborhoods)} and ${randomChoice(singaporeContexts.neighborhoods)}`,
        ]);

        questionText = `When ${context}, you need to convert ${value}${fromUnit} to ${toUnit}`;

        // Simplified conversion factor (would need proper conversion logic in real implementation)
        const factor = Math.pow(
          10,
          (toIndex - fromIndex) * (category === 'time' ? 60 : 1000)
        );
        answer = (value * factor).toString();

        steps = [
          `Identify the conversion factor from ${fromUnit} to ${toUnit}`,
          `Multiply ${value} by ${factor}`,
          `${value}${fromUnit} = ${answer}${toUnit}`,
        ];
        hints = [
          `Think about the relationship between ${fromUnit} and ${toUnit}`,
          'Consider whether to multiply or divide',
          `Remember the conversion factors for ${category} units`,
        ];
        break;
      }

      case 'calculate': {
        const unit =
          units[category][getRandomInt(0, units[category].length - 1)];
        const value1 = getRandomInt(1, 10 * difficulty);
        const value2 = getRandomInt(1, 10 * difficulty);

        const context = randomChoice([
          `preparing ${randomChoice(singaporeContexts.food)}`,
          `${randomChoice(singaporeContexts.transport)} journey`,
          `${randomChoice(singaporeContexts.activities)}`,
        ]);

        questionText = `While ${context}, you use ${value1}${unit} and then another ${value2}${unit}. What is the total?`;
        answer = (value1 + value2).toString();

        steps = [
          `Add ${value1}${unit} and ${value2}${unit}`,
          `${value1} + ${value2} = ${answer}${unit}`,
        ];
        hints = [
          'Make sure the units are the same',
          'Add the numbers',
          'Keep the same unit in the answer',
        ];
        break;
      }

      default: {
        const unit =
          units[category][getRandomInt(0, units[category].length - 1)];
        const value1 = getRandomInt(1, 10 * difficulty);
        const value2 = getRandomInt(1, 10 * difficulty);

        const context = randomChoice([
          `${randomChoice(singaporeContexts.hawkerFood)} portions`,
          `${randomChoice(singaporeContexts.drinks)} servings`,
          `${randomChoice(singaporeContexts.transport)} distances`,
        ]);

        questionText = `Comparing ${context}, which is greater: ${value1}${unit} or ${value2}${unit}?`;
        answer = Math.max(value1, value2) + unit;

        steps = [
          `Compare ${value1}${unit} and ${value2}${unit}`,
          `${value1} ${value1 > value2 ? '>' : '<'} ${value2}`,
          `${answer} is greater`,
        ];
        hints = [
          'Make sure units are the same',
          'Compare the numbers',
          'Include the unit in your answer',
        ];
      }
    }

    return {
      id: `measurement-${category}-${type}-${Date.now()}`,
      text: questionText,
      correctAnswer: answer,
      category: MathSubStrand.MEASUREMENT,
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
    return measurementQuestionGenerator.generateQuestion(
      originalQuestion.difficulty *
        (variation === 'harder' ? 1.2 : variation === 'easier' ? 0.8 : 1),
      []
    );
  },
};
