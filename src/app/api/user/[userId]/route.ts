import { NextResponse } from 'next/server';
import { getOrCreateUser } from '@/lib/db/queries';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await getOrCreateUser(params.userId);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
