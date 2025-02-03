import { Question, MathCategory } from '@/components/math/topics';

export function generateAdditionQuestion(level: number): Question {
  const max = Math.pow(10, level) - 1;
  const num1 = Math.floor(Math.random() * max);
  const num2 = Math.floor(Math.random() * (max - num1));

  return {
    id: crypto.randomUUID(),
    text: `${num1} + ${num2} = ?`,
    correctAnswer: num1 + num2,
    category: MathCategory.ADDITION,
    difficulty: level,
    solution: `${num1} + ${num2} = ${num1 + num2}`,
    hints: [
      "Try breaking down the numbers",
      "Start with the ones column"
    ]
  };
}

export function generateFractionQuestion(level: number): Question {
  const denominator = Math.floor(Math.random() * 10) + 2;
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;

  return {
    id: crypto.randomUUID(),
    text: `What is ${numerator}/${denominator} as a decimal?`,
    correctAnswer: (numerator / denominator).toFixed(2),
    category: MathCategory.FRACTIONS,
    difficulty: level,
    solution: `${numerator} ÷ ${denominator} = ${(numerator / denominator).toFixed(2)}`,
    hints: [
      "Divide the numerator by the denominator",
      "Round to 2 decimal places",
      "Use long division if needed"
    ]
  };
} 