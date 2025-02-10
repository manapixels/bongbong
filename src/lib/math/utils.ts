export function extractVariablesFromQuestion(
  question: string
): Record<string, { min: number; max: number }> {
  // Find all numbers in the question

  const numbers = question.match(/\d+/g)?.map(Number) || [];
  if (numbers.length < 2) return { a: { min: 1, max: 10 } }; // Default range if no numbers found

  // For arithmetic operations, use the numbers to determine ranges
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  // If it's a basic arithmetic question, use a and b as variables
  if (
    question.includes('+') ||
    question.includes('-') ||
    question.includes('×') ||
    question.includes('÷')
  ) {
    return {
      a: { min: Math.max(1, min - 5), max: max + 5 },
      b: { min: Math.max(1, min - 5), max: max + 5 },
    };
  }

  // For other types of questions, use more specific variable names
  if (question.toLowerCase().includes('length')) {
    return { length: { min, max: max * 2 } };
  }
  if (question.toLowerCase().includes('width')) {
    return { width: { min, max: max * 2 } };
  }
  if (question.toLowerCase().includes('radius')) {
    return { radius: { min, max: max * 2 } };
  }

  // Default case
  return { n: { min, max: max * 2 } };
}

export function generateAnswerFormula(question: string): string {
  if (question.includes('+')) return 'a + b';
  if (question.includes('-')) return 'a - b';
  if (question.includes('×')) return 'a * b';
  if (question.includes('÷')) return 'a / b';
  if (question.includes('area') && question.includes('rectangle'))
    return 'length * width';
  if (question.includes('area') && question.includes('circle'))
    return 'Math.PI * radius * radius';
  return 'a'; // Default case
}
