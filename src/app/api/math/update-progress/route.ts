import { NextResponse } from 'next/server';
import {
  updateStudentProgress,
  getStudentProfile,
  createUser,
} from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body);
    const { studentId, questionId, topicId, isCorrect, timeSpent } = body;

    // Log individual fields
    console.log('Validation check:', {
      hasStudentId: !!studentId,
      hasQuestionId: !!questionId,
      hasTopicId: !!topicId,
      isCorrectType: typeof isCorrect === 'boolean',
    });

    // Validate required fields
    if (
      !studentId ||
      !questionId ||
      !topicId ||
      typeof isCorrect !== 'boolean'
    ) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          received: {
            studentId,
            questionId,
            topicId,
            isCorrect: typeof isCorrect,
          },
        },
        { status: 400 }
      );
    }

    // First check if the user exists, if not create a new one
    let user = await getStudentProfile(studentId);
    if (!user) {
      // Create a new local user with the studentId as the ID
      user = await createUser(`local_${studentId}@local.dev`, '', studentId);
      console.log('Created new local user:', user);
    }

    await updateStudentProgress({
      userId: studentId,
      problemId: questionId,
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
