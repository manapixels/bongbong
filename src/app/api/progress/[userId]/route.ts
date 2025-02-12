import { NextResponse } from 'next/server';
import { getStudentProgress } from '@/lib/db/queries';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const progress = await getStudentProgress({ userId: params.userId });
    return NextResponse.json(progress || { subStrandProgress: [] });
  } catch (error) {
    console.error('Error getting progress:', error);
    return NextResponse.json(
      { error: 'Failed to get progress' },
      { status: 500 }
    );
  }
}
