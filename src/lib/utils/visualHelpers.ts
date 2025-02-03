export function generatePlaceValueChart(number: number): string {
  const digits = number.toString().split('').reverse();
  const places = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands'];
  
  return digits.map((digit, i) => 
    `${places[i]}: ${digit}`
  ).reverse().join('\n');
}

export function generateFractionVisual(numerator: number, denominator: number): string {
  const total = '□'.repeat(denominator);
  const filled = '■'.repeat(numerator) + '□'.repeat(denominator - numerator);
  return `${total}\n${filled}`;
}

export function generateBarModel(parts: number[], labels: string[]): string {
  const total = parts.reduce((a, b) => a + b, 0);
  const maxWidth = 20;
  
  return parts.map((part, i) => {
    const width = Math.round((part / total) * maxWidth);
    return `${labels[i]}: ${'█'.repeat(width)} (${part})`;
  }).join('\n');
} 