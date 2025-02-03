import type { StudentProgress } from '@/lib/types/progress';
import type { MathTopic, Question } from '@/components/math/topics';
import { MathCategory } from '@/components/math/topics';
import { generateAdditionQuestion, generateFractionQuestion } from '@/lib/questionGenerators/numberOperations';
import { calculateDifficulty } from '@/lib/utils/math';

export function selectNextQuestion(
  studentProgress: StudentProgress,
  currentTopic: MathTopic
): Question {
  // Calculate success rate for current topic
  const topicStats = studentProgress.topicProgress.find(
    (p) => p.topicId === currentTopic.id
  );

  const successRate = topicStats 
    ? topicStats.correctAnswers / topicStats.questionsAttempted
    : 0.5; // Default to medium difficulty for new topics

  // Determine difficulty based on performance
  const difficulty = calculateDifficulty(currentTopic.level, successRate);

  // Get previous mistakes for this topic
  const previousMistakes = getPreviousMistakes(studentProgress, currentTopic.id);

  // Select appropriate question generator based on topic ID or subtopic
  if (currentTopic.id.includes('addition')) {
    return generateAdditionQuestion(difficulty);
  } else if (currentTopic.id.includes('fraction')) {
    return generateFractionQuestion(difficulty);
  }

  // Default to addition questions for now
  return generateAdditionQuestion(difficulty);
}

function getPreviousMistakes(progress: StudentProgress, topicId: string): string[] {
  const topicProgress = progress.topicProgress.find(p => p.topicId === topicId);
  return topicProgress?.mistakes || [];
} 