import { NextResponse } from 'next/server';
import { updateStudentProgress } from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const { 
      studentId, 
      questionId, 
      topicId, 
      isCorrect, 
      timeSpent 
    } = await request.json();

    await updateStudentProgress({
      studentId,
      problemId: questionId,
      isCorrect,
      timeSpent,
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