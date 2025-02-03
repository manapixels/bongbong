export function calculateDifficulty(baseLevel: number, successRate: number): number {
  // Adjust difficulty based on success rate
  // successRate of 0.8+ increases difficulty
  // successRate below 0.6 decreases difficulty
  if (successRate > 0.8) {
    return Math.min(baseLevel + 1, 5);
  } else if (successRate < 0.6) {
    return Math.max(baseLevel - 1, 1);
  }
  return baseLevel;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
} 