import { NextResponse } from 'next/server';
import { generateProblem } from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const { profile, progress } = await request.json();
    
    const problem = await generateProblem(
      profile.preferences.difficulty,
      profile.preferences.topicsEnabled,
      progress
    );

    if (!problem) {
      return NextResponse.json(
        { error: 'No problem found' },
        { status: 404 }
      );
    }

    return NextResponse.json(problem);
  } catch (error) {
    console.error('Error generating problem:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 