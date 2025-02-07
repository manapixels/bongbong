import type { StudentProgress } from '@/types/progress';
import { MathSubStrand, MathTopic, Question } from '@/types/math';
import { calculateDifficulty } from '@/lib/utils/math';
import { MATH_TOPICS } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';
import crypto from 'crypto';

interface VariableRange {
  min: number;
  max: number;
  step?: number;
}

interface QuestionTemplate {
  question: string;
  answer: number | string | number[] | null;
  explanation: string[];
  type: string;
  variables?: Record<string, VariableRange>;
  generateOptions?: (answer: number) => string[];
}

interface SubTopic {
  id: string;
  name: string;
  difficulty: number;
  objectives: string[];
  sampleQuestions: Question[];
}

// Helper functions
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number, step: number = 1): number {
  const range = (max - min) / step;
  return min + Math.floor(Math.random() * range) * step;
}

function substituteVariables(
  template: string,
  variables: Record<string, number | string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => variables[key].toString());
}

function evaluateExpression(expression: string): number {
  return eval(expression);
}

// Helper to substitute Singapore context
function substituteContext(template: string): [string, Record<string, string>] {
  const contextVars: Record<string, string> = {};

  // Replace context placeholders with actual values
  const processedTemplate = template.replace(
    /{(\w+):(\w+)}/g,
    (_, contextType, varName) => {
      if (contextType in singaporeContexts) {
        const value = randomChoice(
          singaporeContexts[
            contextType as keyof typeof singaporeContexts
          ] as string[]
        );
        contextVars[varName] = value;
        return value;
      }
      return _;
    }
  );

  return [processedTemplate, contextVars];
}

function findSubtopicById(st: string): SubTopic | null {
  for (const topic of MATH_TOPICS) {
    const subtopic = topic.subStrandTopics.find((s) => s.id === st);
    if (subtopic) {
      const { id, name, difficulty, objectives, sampleQuestions } = subtopic;
      return {
        id,
        name,
        difficulty,
        objectives,
        sampleQuestions: [...sampleQuestions] as Question[],
      };
    }
  }
  return null;
}

function generateQuestionImpl(
  subStrand: MathSubStrand,
  level: number,
  previousMistakes: string[] = []
): Question {
  if (!subStrand) {
    throw new Error(`No subStrand found for id: ${subStrand}`);
  }

  // Find subtopics matching difficulty
  const eligibleTopics = MATH_TOPICS.filter(
    (st) => st.subStrand === subStrand && st.level === level
  );
  if (eligibleTopics.length === 0) {
    throw new Error(
      `No topics found for subStrand ${subStrand} with difficulty ${level}`
    );
  }

  // Randomly select a topic
  const topic =
    eligibleTopics[Math.floor(Math.random() * eligibleTopics.length)];

  // Get sample questions
  const sampleQuestions = topic.subStrandTopics.flatMap(
    (s) => s.sampleQuestions
  );
  if (!sampleQuestions || sampleQuestions.length === 0) {
    throw new Error(`No sample questions found for subtopic ${topic.id}`);
  }

  // Select a random sample question
  const template = randomChoice(sampleQuestions) as QuestionTemplate;

  // Generate variables if template has them
  const variables: Record<string, number> = {};
  if (template.variables) {
    Object.entries(template.variables).forEach(([key, range]) => {
      variables[key] = getRandomNumber(range.min, range.max, range.step);
    });
  }

  // Handle Singapore context and variables
  const [questionWithContext, contextVars] = substituteContext(
    template.question
  );

  // Generate the question
  const question = template.variables
    ? substituteVariables(questionWithContext, { ...variables, ...contextVars })
    : questionWithContext;

  // Calculate the answer
  let answer: string | number;
  if (typeof template.answer === 'string' && template.variables) {
    answer = evaluateExpression(
      substituteVariables(template.answer, variables)
    );
  } else if (
    typeof template.answer === 'string' ||
    typeof template.answer === 'number'
  ) {
    answer = template.answer;
  } else if (Array.isArray(template.answer)) {
    // For array answers, join them with commas
    answer = template.answer.join(',');
  } else if (template.answer === null) {
    throw new Error('answer cannot be null');
  } else {
    throw new Error('Invalid answer type: must be string, number, or array');
  }

  // Generate explanation
  const explanation = template.explanation.map((exp) =>
    template.variables
      ? substituteVariables(exp, { ...variables, ...contextVars })
      : exp
  );

  return {
    id: crypto.randomUUID(),
    type: template.type,
    question,
    answer,
    explanation: explanation as string[],
    difficulty: topic.level,
    strand: topic.strand,
    subStrand,
  };
}

function generateSimilarQuestionImpl(
  originalQuestion: Question,
  variation: 'easier' | 'harder' | 'same' = 'same'
): Question {
  const difficultyAdjustment = {
    easier: -1,
    harder: 1,
    same: 0,
  };

  const newDifficulty = Math.max(
    1,
    Math.min(
      6,
      (originalQuestion.difficulty ?? 0) + difficultyAdjustment[variation]
    )
  );

  if (!originalQuestion.subStrand) {
    throw new Error(`No subStrand found for question ${originalQuestion.id}`);
  }

  return generateQuestionImpl(originalQuestion.subStrand, newDifficulty);
}

export function selectNextQuestion(
  progress: StudentProgress,
  subStrand: MathSubStrand
): Question {
  // Calculate success rate for current topic
  const topicStats = progress.subStrandProgress?.find(
    (p) => p.subStrand === subStrand
  );

  const successRate = topicStats
    ? topicStats.correctAnswers / topicStats.questionsAttempted
    : 0.5; // Default to medium difficulty for new topics

  // Determine difficulty based on performance
  const difficulty = calculateDifficulty(topicStats?.level ?? 0, successRate);

  // Generate question
  return generateQuestionImpl(subStrand, difficulty);
}

// Export the functions
export const generateQuestion = generateQuestionImpl;
export const generateSimilarQuestion = generateSimilarQuestionImpl;
