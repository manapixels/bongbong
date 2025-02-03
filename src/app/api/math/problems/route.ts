import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { mathProblems } from '@/lib/db/schema';
import { MATH_TOPICS } from '@/lib/math/topics';
import { selectNextQuestion } from '@/lib/adaptive/questionSelector';
import { getStudentProgress } from '@/lib/db/queries';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get('topicId');
  
  if (!topicId) {
    return new Response('Topic ID is required', { status: 400 });
  }

  const topic = MATH_TOPICS.find(t => t.id === topicId);
  if (!topic) {
    return new Response('Topic not found', { status: 404 });
  }

  try {
    const progress = await getStudentProgress({ userId: session.user.id });
    const question = selectNextQuestion(progress, topic);

    // Save the generated problem
    await db.insert(mathProblems).values({
      id: question.id,
      studentId: session.user.id,
      category: topic.id,
      difficulty: topic.level,
      question: question.text,
      answer: question.correctAnswer.toString(),
      attemptedAt: new Date(),
      isCorrect: false,
      timeSpent: 0
    });

    return Response.json(question);
  } catch (error) {
    console.error('Error generating question:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 