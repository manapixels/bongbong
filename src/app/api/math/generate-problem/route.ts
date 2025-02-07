import { NextResponse } from 'next/server';
import { generateProblem } from '@/lib/db/queries';
import { createUser, getStudentProfile } from '@/lib/db/queries';

export async function POST(request: Request) {
  try {
    const { profile, progress } = await request.json();

    // For local profiles, we need to ensure there's a userId
    let userId = progress.userId;
    if (!userId) {
      // Generate a local user ID if none exists
      userId = crypto.randomUUID();
      // Create a local user profile
      await createUser(`local_${userId}@local.dev`, '', userId);
    }

    // Add userId to progress object
    const progressWithUser = {
      ...progress,
      userId,
    };

    const problem = await generateProblem(
      profile.preferences.difficulty,
      profile.preferences.topicsEnabled,
      progressWithUser
    );

    if (!problem) {
      return NextResponse.json({ error: 'No problem found' }, { status: 404 });
    }

    return NextResponse.json({ ...problem, userId }); // Return userId for client to store
  } catch (error) {
    console.error('Error generating problem:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
