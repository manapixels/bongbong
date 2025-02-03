import { MathTrainer } from '@/components/math-trainer';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

export default function HomePage() {
  // No longer need async since we're not doing server auth
  
  // We'll use default values for a local profile
  const defaultProfile = {
    id: 'local-user',
    name: 'Student',
    grade: 5,
    preferences: {
      difficulty: 'medium',
      topicsEnabled: ['addition', 'subtraction', 'multiplication', 'division']
    }
  };

  const defaultProgress = {
    totalProblems: 0,
    correctAnswers: 0,
    topicStats: {}
  };

  return (
    <div className="flex-1 overflow-auto">
      <MathTrainer 
        studentId="local-user"
        profile={defaultProfile}
        progress={defaultProgress}
      />
    </div>
  );
}
