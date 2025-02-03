import { NextResponse } from 'next/server';
import { auth } from '@/app/(auth)/auth';

function generateProblem(profile: any, progress: any) {
  // Determine which category to focus on based on weak areas
  const weakCategories = Object.entries(progress.categoryProgress)
    .filter(([_, stats]: [string, any]) => stats.success / stats.attempts < 0.7)
    .map(([category]) => category);

  const category = weakCategories.length > 0
    ? weakCategories[Math.floor(Math.random() * weakCategories.length)]
    : ['addition', 'subtraction', 'multiplication', 'division'][
        Math.floor(Math.random() * 4)
      ];

  // Adjust difficulty based on level and success rate
  const difficulty = Math.min(profile.level, 10);
  
  let num1, num2, answer, question;
  
  switch (category) {
    case 'addition':
      num1 = Math.floor(Math.random() * (10 * difficulty));
      num2 = Math.floor(Math.random() * (10 * difficulty));
      answer = num1 + num2;
      question = `${num1} + ${num2} = ?`;
      break;
    case 'subtraction':
      num1 = Math.floor(Math.random() * (10 * difficulty));
      num2 = Math.floor(Math.random() * num1);
      answer = num1 - num2;
      question = `${num1} - ${num2} = ?`;
      break;
    case 'multiplication':
      num1 = Math.floor(Math.random() * (5 * difficulty));
      num2 = Math.floor(Math.random() * (5 * difficulty));
      answer = num1 * num2;
      question = `${num1} × ${num2} = ?`;
      break;
    case 'division':
      num2 = Math.floor(Math.random() * (5 * difficulty)) + 1;
      answer = Math.floor(Math.random() * (5 * difficulty));
      num1 = num2 * answer;
      question = `${num1} ÷ ${num2} = ?`;
      break;
    default:
      throw new Error('Invalid category');
  }

  return {
    id: crypto.randomUUID(),
    question,
    answer,
    difficulty,
    category
  };
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { profile, progress } = await req.json();
  const problem = generateProblem(profile, progress);

  return NextResponse.json(problem);
} 