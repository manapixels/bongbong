import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { MathTrainer } from '@/components/math-trainer';
import { getStudentProfile, getStudentProgress } from '@/lib/db/queries';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  
  const session = await auth();
  if (!session || !session.user) {
    return notFound();
  }

  const studentProfile = await getStudentProfile({ userId: session.user.id });
  const progress = await getStudentProgress({ userId: session.user.id });

  return (
    <>
      <MathTrainer 
        studentId={session.user.id}
        profile={studentProfile}
        progress={progress}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
