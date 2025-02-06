import { NextResponse } from 'next/server';
import { updateStudentProgress } from '@/lib/db/queries';
import { auth } from '@/app/(auth)/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { studentId, questionId, topicId, isCorrect, timeSpent } = body;

    // Validate required fields
    if (
      !studentId ||
      !questionId ||
      !topicId ||
      typeof isCorrect !== 'boolean'
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await updateStudentProgress({
      studentId,
      problemId: questionId,
      isCorrect,
      timeSpent: timeSpent || 0,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
