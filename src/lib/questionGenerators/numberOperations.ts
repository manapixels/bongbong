import { Question, MathCategory } from '@/types/math';

export function generateAdditionQuestion(level: number): Question {
  const max = Math.pow(10, level) - 1;
  const num1 = Math.floor(Math.random() * max);
  const num2 = Math.floor(Math.random() * (max - num1));

  return {
    id: crypto.randomUUID(),
    text: `${num1} + ${num2} = ?`,
    correctAnswer: (num1 + num2).toString(),
    category: MathCategory.ADDITION,
    difficulty: level,
    solution: {
      steps: [`${num1} + ${num2} = ${num1 + num2}`],
      explanation: "Add the numbers together"
    },
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
    solution: {
      steps: [`${numerator} ÷ ${denominator} = ${(numerator / denominator).toFixed(2)}`],
      explanation: "Divide the numerator by the denominator"
    },
    hints: [
      "Divide the numerator by the denominator",
      "Round to 2 decimal places",
      "Use long division if needed"
    ]

  };
} 