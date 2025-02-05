import { auth } from '@/app/(auth)/auth';
import { redirect } from 'next/navigation';
import { PracticeLayout } from '@/components/math/practice-layout';
import { getStudentProfile, getStudentProgress } from '@/lib/db/queries';
import { MATH_TOPICS } from '@/types/math';

export default async function MathPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const studentProfile = await getStudentProfile({ userId: session.user.id });
  const progress = await getStudentProgress({ userId: session.user.id });

  return (
    <PracticeLayout
      studentId={session.user.id}
      topics={MATH_TOPICS}
      studentProgress={progress}
    />
  );
} 