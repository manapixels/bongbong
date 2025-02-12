import { NextResponse } from 'next/server';
import { updateStudentProgress, getOrCreateUser } from '@/lib/db/queries';
import {
  MathSubStrand,
  getValidSubStrands,
  isValidSubStrand,
} from '@/types/math';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    const { studentId, questionId, topicId, isCorrect, timeSpent, category } =
      body;

    // Log individual fields
    console.log('Validation check:', {
      hasStudentId: !!studentId,
      hasQuestionId: !!questionId,
      hasTopicId: !!topicId,
      isCorrectType: typeof isCorrect === 'boolean',
      category,
    });

    // Validate required fields
    if (
      !studentId ||
      !questionId ||
      !topicId ||
      typeof isCorrect !== 'boolean' ||
      !category
    ) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          received: {
            studentId,
            questionId,
            topicId,
            isCorrect: typeof isCorrect,
            category,
          },
        },
        { status: 400 }
      );
    }

    // Validate that category is a valid MathSubStrand
    if (!isValidSubStrand(category)) {
      return NextResponse.json(
        {
          error: 'Invalid category',
          received: category,
          validCategories: getValidSubStrands(),
        },
        { status: 400 }
      );
    }

    // Get or create user
    await getOrCreateUser(studentId);

    await updateStudentProgress({
      userId: studentId,
      questionId,
      isCorrect,
      timeSpent: timeSpent || 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
