import { auth } from '@/app/(auth)/auth';
import { redirect } from 'next/navigation';
import { PracticeLayout } from '@/components/math/practice-layout';
import { getStudentProfile, getStudentProgress } from '@/lib/db/queries';
import { MATH_TOPICS } from '@/types/math';

export default async function MathPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login');
  }

  const studentProfile = await getStudentProfile(session.user.id);
  const progress = await getStudentProgress({ userId: session.user.id });

  if (!progress) {
    // Create a default progress object that matches the schema
    const defaultProgress = {
      id: crypto.randomUUID(),
      userId: session.user.id,
      problemId: null,
      isCorrect: false,
      timeSpent: null,
      createdAt: null,
      topicProgress: null,
    };

    return (
      <PracticeLayout
        studentId={session.user.id}
        topics={MATH_TOPICS}
        studentProgress={defaultProgress}
      />
    );
  }

  return (
    <PracticeLayout
      studentId={session.user.id}
      topics={MATH_TOPICS}
      studentProgress={progress}
    />
  );
}
