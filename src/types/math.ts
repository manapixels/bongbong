export interface Question {
  id: string;
  text: string;
  correctAnswer: string | number;
  options?: string[];
  hints?: string[];
  solution?: string;
  difficulty: number;
  category: string;
}

export interface MathTopic {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  prerequisites?: string[];
} 