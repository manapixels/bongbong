import { MathQuestion, MathSubStrand, SubStrandTopic } from '@/types/math';
import { calculateDifficulty } from '@/lib/utils/math';
import { MATH_TOPICS } from '@/types/math';
import { singaporeContexts } from './singaporeContexts';
import crypto from 'crypto';
import { Progress } from '@/types';

interface VariableRange {
  min: number;
  max: number;
  step?: number;
}

interface QuestionTemplate {
  question: string;
  answer: number | string | number[] | null;
  explanation: string[];
  variables?: {
    questionText: string;
    min: number;
    max: number;
  }[];
  type?: string;
  generateOptions?: (answer: number) => string[];
}

interface GeneratedQuestion extends MathQuestion {
  metadata?: {
    skillId: string;
    skillDescription: string;
    subTopicId: string;
  };
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

function evaluateExpression(
  expression: string,
  variables: Record<string, number> = {}
): number {
  try {
    // Create a function with the variables in scope
    const varNames = Object.keys(variables);
    const varValues = Object.values(variables);
    const fn = new Function(
      ...varNames,
      `"use strict"; return (${expression})`
    );

    const result = fn(...varValues);

    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Expression evaluation resulted in invalid number');
    }

    return result;
  } catch (error) {
    console.error('Failed to evaluate expression:', expression, error);
    throw new Error(`Invalid mathematical expression: ${expression}`);
  }
}

// Helper to substitute Singapore context
function substituteContext(template: string): [string, Record<string, string>] {
  const contextVars: Record<string, string> = {};

  // Replace context placeholders with actual values
  const processedTemplate = template.replace(
    /{(\w+):(\w+)}/g,
    (_, contextType, varName) => {
      if (contextType in singaporeContexts) {
        const contextArray =
          singaporeContexts[contextType as keyof typeof singaporeContexts];
        const value = Array.isArray(contextArray)
          ? randomChoice(contextArray)
          : randomChoice(Object.values(contextArray));
        contextVars[varName] = value;
        return value;
      }
      return _;
    }
  );

  return [processedTemplate, contextVars];
}

function findSubtopicById(st: string): SubStrandTopic | null {
  for (const topic of MATH_TOPICS) {
    const subtopic = topic.subStrandTopics.find((s) => s.id === st);
    if (subtopic) {
      const { id, name, difficulty, skills } = subtopic;
      return {
        id,
        name,
        difficulty,
        skills,
      };
    }
  }
  return null;
}

function generateQuestionImpl(
  subStrand: MathSubStrand,
  level: number,
  previousMistakes: string[] = []
): MathQuestion {
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

  // Get all questions from all skills in all subtopics
  const allQuestions = topic.subStrandTopics.flatMap((subTopic) =>
    subTopic.skills.flatMap((skill) =>
      skill.questions.map((question) => ({
        ...question,
        skillId: skill.id,
        skillDescription: skill.description,
        subTopicId: subTopic.id,
      }))
    )
  );

  if (!allQuestions || allQuestions.length === 0) {
    throw new Error(`No questions found for topic ${topic.id}`);
  }

  // Select a random question
  const template = randomChoice(allQuestions) as QuestionTemplate & {
    skillId: string;
    skillDescription: string;
    subTopicId: string;
  };

  // Generate variables if template has them
  const variables: Record<string, number> = {};
  if (template.variables) {
    Object.entries(template.variables).forEach(([key, range]) => {
      variables[key] = getRandomNumber(range.min, range.max, 1);
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
      substituteVariables(template.answer, variables),
      variables
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
    subject: 'mathematics',
    type: template.type || 'standard',
    question,
    answer: answer.toString(),
    explanation,
    difficulty: topic.level,
    strand: topic.strand,
    subStrand,
    answerFormula: template.answer?.toString() ?? '',
    variables: variables as unknown as Record<string, string>,
    createdAt: new Date(),
    metadata: {
      skillId: template.skillId,
      skillDescription: template.skillDescription,
      subTopicId: template.subTopicId,
    },
  } as GeneratedQuestion;
}

export function selectNextQuestion(
  progress: Progress,
  subStrand: MathSubStrand,
  preferredDifficulty?: number
): MathQuestion {
  // Calculate success rate for current topic
  const topicStats = progress.subStrandProgress?.find(
    (p: { subStrand: string }) => p.subStrand === subStrand
  );

  // If preferred difficulty is provided, use it
  if (typeof preferredDifficulty === 'number') {
    return generateQuestionImpl(subStrand, preferredDifficulty);
  }

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
