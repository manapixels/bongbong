import { evaluate } from 'mathjs';
import type {
  ProblemTemplate,
  GeneratedProblem,
  VariableConstraint,
  StudentProblemHistory,
  SkillProgress,
} from '@/types/problem-template';
import { db } from '@/lib/db';
import { studentProblemHistory, problemTemplates } from '@/lib/db/schema';
import { eq, and, inArray, sql } from 'drizzle-orm';
import { MathSubStrand } from '@/types/math';
import {
  singaporeContexts,
  getRandomItems,
  getRandomPrice,
  getContextTemplate,
  type SingaporeContextKey,
} from './singaporeContexts';

interface ProblemContext {
  theme: SingaporeContextKey;
  substitutions: Record<string, string>;
}

const WORD_PROBLEM_CONTEXTS = {
  fruits: ['apples', 'oranges', 'bananas', 'pears', 'mangoes', 'grapes'],
  shopping: ['books', 'pencils', 'toys', 'candies', 'stickers', 'erasers'],
  sports: ['balls', 'goals', 'players', 'teams', 'matches', 'points'],
  transportation: ['cars', 'buses', 'trains', 'bikes', 'scooters'],
  food: ['pizzas', 'sandwiches', 'cookies', 'cakes', 'chocolates'],
  animals: ['dogs', 'cats', 'birds', 'fish', 'rabbits'],
  school: ['students', 'teachers', 'classes', 'books', 'assignments'],
} as const;

const CONTEXT_TEMPLATES = {
  fruits: {
    collection: ['basket', 'box', 'bag', 'crate', 'pile'],
    verbs: ['bought', 'sold', 'picked', 'collected', 'gave away'],
    locations: ['store', 'market', 'garden', 'farm', 'orchard'],
  },
  shopping: {
    collection: ['cart', 'basket', 'shelf', 'box', 'pack'],
    verbs: ['bought', 'sold', 'purchased', 'returned', 'exchanged'],
    locations: ['store', 'shop', 'mall', 'market', 'supermarket'],
  },
  sports: {
    collection: ['team', 'group', 'set', 'pack', 'squad'],
    verbs: ['scored', 'won', 'played', 'lost', 'tied'],
    locations: ['field', 'court', 'stadium', 'gym', 'arena'],
  },
  transportation: {
    collection: ['fleet', 'group', 'line', 'convoy', 'row'],
    verbs: ['traveled', 'moved', 'transported', 'carried', 'delivered'],
    locations: ['station', 'stop', 'terminal', 'depot', 'garage'],
  },
  food: {
    collection: ['plate', 'tray', 'box', 'pack', 'serving'],
    verbs: ['ate', 'served', 'prepared', 'ordered', 'shared'],
    locations: ['restaurant', 'cafe', 'kitchen', 'bakery', 'store'],
  },
  animals: {
    collection: ['group', 'pack', 'herd', 'flock', 'family'],
    verbs: ['saw', 'fed', 'counted', 'watched', 'found'],
    locations: ['park', 'zoo', 'farm', 'shelter', 'pet store'],
  },
  school: {
    collection: ['class', 'group', 'team', 'club', 'grade'],
    verbs: ['studied', 'completed', 'submitted', 'scored', 'achieved'],
    locations: ['classroom', 'library', 'school', 'lab', 'playground'],
  },
} as const;

function randomChoice<T>(array: readonly T[] | T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const WORD_PROBLEM_CONTEXTS_ARRAY = Object.values(WORD_PROBLEM_CONTEXTS);

function generateVariableValue(constraint: VariableConstraint): number {
  const { min, max, step = 1, exclude = [] } = constraint;
  let value: number;
  do {
    value = Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  } while (exclude.includes(value));
  return value;
}

function validateProblem(
  template: ProblemTemplate,
  variables: Record<string, number>,
  answer: number
): boolean {
  const { validationRules } = template;
  if (!validationRules) return true;

  const { maxResult, minResult, mustBeWhole, customValidation } =
    validationRules;

  if (maxResult !== undefined && answer > maxResult) return false;
  if (minResult !== undefined && answer < minResult) return false;
  if (mustBeWhole && !Number.isInteger(answer)) return false;
  if (customValidation) {
    try {
      const isValid = evaluate(customValidation, variables);
      if (!isValid) return false;
    } catch (error) {
      console.error('Custom validation error:', error);
      return false;
    }
  }

  return true;
}

function substituteVariables(
  template: string,
  variables: Record<string, number | string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(variables[key]));
}

function normalizeQuestion(question: string): string {
  return question
    .toLowerCase()
    .replace(/\d+/g, 'X')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function generateProblemFromTemplate(
  template: ProblemTemplate,
  userId: string,
  history?: StudentProblemHistory
): Promise<GeneratedProblem> {
  let variables: Record<string, number>;
  let answer: number = 0;
  let isValid = false;
  let attempts = 0;
  const maxAttempts = 10;

  // Try to generate valid variables and answer
  do {
    variables = {};
    for (const [key, constraint] of Object.entries(template.variables)) {
      variables[key] = generateVariableValue(constraint);
    }

    try {
      answer = evaluate(template.answerFormula, variables);
      isValid = validateProblem(template, variables, answer);
    } catch (error) {
      console.error('Error evaluating formula:', error);
      isValid = false;
    }

    attempts++;
    if (attempts >= maxAttempts) {
      throw new Error(
        'Could not generate valid problem after multiple attempts'
      );
    }
  } while (!isValid);

  // Generate context substitutions if needed
  let context: ProblemContext | undefined;
  if (template.context) {
    const theme = template.context.themes[0] as SingaporeContextKey;
    const contextTemplate = getContextTemplate(theme);

    // Create context-specific substitutions
    const substitutions: Record<string, string> = {};

    // Get random items based on the context
    const [item1, item2] = getRandomItems(theme, 2);
    if (item1) substitutions.item1 = item1;
    if (item2) substitutions.item2 = item2;

    // Add theme-specific templates
    if (contextTemplate) {
      substitutions.collection =
        contextTemplate.collection[
          Math.floor(Math.random() * contextTemplate.collection.length)
        ];
      substitutions.verb =
        contextTemplate.verbs[
          Math.floor(Math.random() * contextTemplate.verbs.length)
        ];
      if (contextTemplate.locations) {
        substitutions.location =
          contextTemplate.locations[
            Math.floor(Math.random() * contextTemplate.locations.length)
          ];
      }

      // Add price-related substitutions if needed
      if (template.structure.includes('{price}')) {
        const price = getRandomPrice(theme);
        substitutions.price = `${singaporeContexts.currencySymbol}${price.toFixed(2)}`;
        variables.price = price;
      }
    }

    context = {
      theme,
      substitutions,
    };
  }

  // Generate explanation with context
  const explanation = template.explanationTemplate.map((line) =>
    substituteVariables(line, { ...variables, ...context?.substitutions })
  );

  return {
    id: crypto.randomUUID(),
    templateId: template.id,
    type: template.type,
    question: substituteVariables(template.structure, {
      ...variables,
      ...context?.substitutions,
    }),
    variables,
    answer,
    explanation,
    difficulty: template.difficulty,
    strand: template.strand,
    subStrand: template.subStrand,
    skills: template.skills.map((skill) => skill.id),
    context,
  };
}

export async function findNextTemplate(
  userId: string,
  skillProgress: SkillProgress[]
): Promise<ProblemTemplate | null> {
  // Get user's problem history
  const history = await db
    .select()
    .from(studentProblemHistory)
    .where(eq(studentProblemHistory.userId, userId));

  // Calculate which skills need practice
  const skillsNeedingPractice = skillProgress
    .filter((sp) => sp.needsReview || sp.proficiency < 0.8)
    .map((sp) => sp.skillId);

  if (skillsNeedingPractice.length === 0) {
    // If no skills need immediate practice, choose a random template
    const [randomTemplate] = await db
      .select()
      .from(problemTemplates)
      .orderBy(sql`RANDOM()`)
      .limit(1);

    // Convert database result to ProblemTemplate
    return randomTemplate
      ? {
          ...randomTemplate,
          context: randomTemplate.context || undefined,
          subStrand: randomTemplate.subStrand as MathSubStrand,
          validationRules:
            randomTemplate.validationRules as ProblemTemplate['validationRules'],
        }
      : null;
  }

  // Find templates that target needed skills
  const templates = await db
    .select()
    .from(problemTemplates)
    .where(
      sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements(${problemTemplates.skills}) skill
        WHERE (skill->>'id')::text = ANY(${skillsNeedingPractice})
      )`
    );

  if (!templates.length) return null;

  // Sort templates by priority
  const sortedTemplates = templates.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Factor 1: Number of needed skills covered
    const skillsA = new Set(a.skills.map((s) => s.id));
    const skillsB = new Set(b.skills.map((s) => s.id));
    const neededSkillsA = skillsNeedingPractice.filter((s) =>
      skillsA.has(s)
    ).length;
    const neededSkillsB = skillsNeedingPractice.filter((s) =>
      skillsB.has(s)
    ).length;
    scoreA += neededSkillsA * 10;
    scoreB += neededSkillsB * 10;

    // Factor 2: Time since last practice
    const lastPracticedA =
      history.find((h) => h.templateId === a.id)?.lastAttempted || new Date(0);
    const lastPracticedB =
      history.find((h) => h.templateId === b.id)?.lastAttempted || new Date(0);
    const timeSinceA = Date.now() - lastPracticedA.getTime();
    const timeSinceB = Date.now() - lastPracticedB.getTime();
    scoreA += Math.min(timeSinceA / (24 * 60 * 60 * 1000), 7) * 5; // Max 7 days
    scoreB += Math.min(timeSinceB / (24 * 60 * 60 * 1000), 7) * 5;

    // Factor 3: Success rate (prefer slightly challenging problems)
    const historyA = history.find((h) => h.templateId === a.id);
    const historyB = history.find((h) => h.templateId === b.id);
    const successRateA = historyA
      ? historyA.correctAttempts / historyA.attempts
      : 0.5;
    const successRateB = historyB
      ? historyB.correctAttempts / historyB.attempts
      : 0.5;
    // Optimal success rate around 70-80%
    scoreA += (1 - Math.abs(0.75 - successRateA)) * 10;
    scoreB += (1 - Math.abs(0.75 - successRateB)) * 10;

    // Factor 4: Difficulty progression
    const avgProficiency =
      skillProgress.reduce((sum, sp) => sum + sp.proficiency, 0) /
      skillProgress.length;
    const difficultyScoreA = 1 - Math.abs(avgProficiency - a.difficulty / 5); // Assuming difficulty 1-5
    const difficultyScoreB = 1 - Math.abs(avgProficiency - b.difficulty / 5);
    scoreA += difficultyScoreA * 15;
    scoreB += difficultyScoreB * 15;

    return scoreB - scoreA; // Higher score first
  });

  // Convert database result to ProblemTemplate in the final return
  return sortedTemplates[0]
    ? {
        ...sortedTemplates[0],
        context: sortedTemplates[0].context || undefined,
        subStrand: sortedTemplates[0].subStrand as MathSubStrand,
        validationRules: sortedTemplates[0]
          .validationRules as ProblemTemplate['validationRules'],
      }
    : null;
}

export function isSimilarProblem(problem1: string, problem2: string): boolean {
  const normalized1 = normalizeQuestion(problem1);
  const normalized2 = normalizeQuestion(problem2);

  // Basic similarity check
  if (normalized1 === normalized2) return true;

  // Check for mathematical expression similarity
  try {
    const expr1 = normalized1.replace(/[^\d+\-*/()]/g, '');
    const expr2 = normalized2.replace(/[^\d+\-*/()]/g, '');
    if (expr1 && expr2 && evaluate(expr1) === evaluate(expr2)) return true;
  } catch (error) {
    // Ignore evaluation errors
  }

  return false;
}
