import type { LanguageModelV1Middleware } from 'ai';
import { type NextRequest, NextResponse } from 'next/server';
import { MATH_TOPICS } from '@/types/math';

export const customMiddleware: LanguageModelV1Middleware = {};

export async function educationMiddleware(req: NextRequest) {
  // Add type safety for headers
  const studentLevel = req.headers.get('x-student-level') as string | null;
  const topicArea = req.headers.get('x-topic-area') as string | null;

  // Add validation
  if (studentLevel && !isValidLevel(studentLevel)) {
    return NextResponse.json(
      { error: 'Invalid student level' },
      { status: 400 }
    );
  }

  // Validate against PSLE curriculum
  if (topicArea && !isValidTopic(topicArea)) {
    return NextResponse.json(
      { error: 'Topic not in PSLE syllabus' },
      { status: 400 }
    );
  }

  // Add learning context
  const context = {
    level: studentLevel ?? 'default',
    topic: topicArea ?? 'default',
    curriculum: MATH_TOPICS,
    adaptiveLevel: calculateAdaptiveLevel(
      studentLevel ?? 'default',
      topicArea ?? 'default'
    ),
  };

  // Attach to request for AI processing
  const newRequest = new Request(req.url, {
    ...req,
    headers: {
      ...req.headers,
      'x-education-context': JSON.stringify(context),
    },
  });

  return NextResponse.next({
    request: newRequest,
  });
}

function isValidTopic(topic: string): boolean {
  // Validate topic against PSLE syllabus
  return true; // Implement proper validation
}

function calculateAdaptiveLevel(level: string, topic: string): number {
  // Calculate appropriate difficulty based on student performance
  return 1; // Implement proper calculation
}

// Add proper validation function
function isValidLevel(level: string): boolean {
  // Implement proper validation
  return ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].includes(level.toLowerCase());
}
