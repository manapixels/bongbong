import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';

interface ProblemGenerationRequest {
  profile: {
    preferences: {
      difficulty: string;
      topicsEnabled: string[];
    };
  };
  progress: {
    totalProblems: number;
    correctAnswers: number;
    topicStats: Record<string, { total: number; correct: number }>;
  };
}

function generateMathProblem(difficulty: string, topics: string[]) {
  // Select a random topic from enabled topics
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  // Generate numbers based on difficulty
  const max = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 50 : 100;
  
  let question: string;
  let answer: number;
  let num1: number;
  let num2: number;
  
  // Generate different types of problems based on the topic
  switch (topic) {
    case 'addition':
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      question = `What is ${num1} + ${num2}?`;
      answer = num1 + num2;
      break;
    case 'subtraction':
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * num1) + 1; // Ensure num2 is smaller than num1
      question = `What is ${num1} - ${num2}?`;
      answer = num1 - num2;
      break;
    case 'multiplication':
      // Use smaller numbers for multiplication
      const multMax = Math.floor(max / 5);
      num1 = Math.floor(Math.random() * multMax) + 1;
      num2 = Math.floor(Math.random() * multMax) + 1;
      question = `What is ${num1} × ${num2}?`;
      answer = num1 * num2;
      break;
    case 'division':
      // Generate division problems that result in whole numbers
      num2 = Math.floor(Math.random() * (max / 10)) + 1;
      answer = Math.floor(Math.random() * (max / 10)) + 1;
      num1 = num2 * answer;
      question = `What is ${num1} ÷ ${num2}?`;
      break;
    default:
      num1 = Math.floor(Math.random() * max) + 1;
      num2 = Math.floor(Math.random() * max) + 1;
      question = `What is ${num1} + ${num2}?`;
      answer = num1 + num2;
  }
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    question,
    answer,
    category: topic,
  };
}

export async function POST(request: Request) {
  try {
    const body: ProblemGenerationRequest = await request.json();
    
    const { difficulty, topicsEnabled } = body.profile.preferences;
    
    // If no topics are enabled, use default topics
    const topics = topicsEnabled.length > 0 
      ? topicsEnabled 
      : ['addition', 'subtraction', 'multiplication'];
    
    const problem = generateMathProblem(difficulty, topics);
    
    return NextResponse.json(problem);
  } catch (error) {
    console.error('Error generating problem:', error);
    return NextResponse.json(
      { error: 'Failed to generate problem' },
      { status: 500 }
    );
  }
} 