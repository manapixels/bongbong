import { auth } from '@/app/(auth)/auth';
import { redirect } from 'next/navigation';
import { MathTrainer } from '@/components/math-trainer';
import { getStudentProfile, getStudentProgress } from '@/lib/db/queries';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';

export default async function MathPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const studentProfile = await getStudentProfile({ userId: session.user.id });
  const progress = await getStudentProgress({ userId: session.user.id });

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MathTrainer 
            studentId={session.user.id}
            profile={studentProfile}
            progress={progress}
          />
        </div>
        <div className="lg:col-span-1">
          <StudentDashboard studentId={session.user.id} />
        </div>
      </div>
    </div>
  );
} 