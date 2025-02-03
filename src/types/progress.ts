export interface StudentProgress {
  id: string;
  studentId: string;
  totalProblems: number;
  correctAnswers: number;
  streaks: number;
  categoryProgress: {
    [key: string]: {
      attempts: number;
      success: number;
    };
  };
} 