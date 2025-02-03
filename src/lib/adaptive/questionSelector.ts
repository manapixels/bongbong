import type { StudentProgress } from '@/types/progress';
import { MathTopic, Question } from '@/types/math';
import { generateAdditionQuestion, generateFractionQuestion } from '@/lib/questionGenerators/numberOperations';
import { calculateDifficulty } from '@/lib/utils/math';

export function selectNextQuestion(
  progress: StudentProgress,
  topic: MathTopic
): Question {
  // Calculate success rate for current topic
  const topicStats = progress.topicProgress.find(
    (p) => p.topicId === topic.id
  );

  const successRate = topicStats 
    ? topicStats.correctAnswers / topicStats.questionsAttempted
    : 0.5; // Default to medium difficulty for new topics

  // Determine difficulty based on performance
  const difficulty = calculateDifficulty(topic.level, successRate);

  // Get previous mistakes for this topic
  const previousMistakes = getPreviousMistakes(progress, topic.id);

  // Select appropriate question generator based on topic ID or subtopic
  if (topic.id.includes('addition')) {
    return generateAdditionQuestion(difficulty);
  } else if (topic.id.includes('fraction')) {
    return generateFractionQuestion(difficulty);
  }

  // Default to addition questions for now
  return generateAdditionQuestion(difficulty);
}

function getPreviousMistakes(progress: StudentProgress, topicId: string): string[] {
  const topicProgress = progress.topicProgress.find(p => p.topicId === topicId);
  return topicProgress?.mistakes || [];
} 