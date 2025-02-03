import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { mathProblems } from '@/lib/db/schema';
import { MATH_TOPICS } from '@/lib/math/topics';
import { selectNextQuestion } from '@/lib/adaptive/questionSelector';
import { getStudentProgress } from '@/lib/db/queries';
import { StudentProgress } from '@/types/progress';

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
    let progress = await getStudentProgress({ userId: session.user.id });

    if (!progress) {
      // Create default progress if none exists
      const defaultProgress: StudentProgress = {
        studentId: session.user.id,
        totalProblems: 0,
        correctAnswers: 0,
        streaks: 0,
        topicProgress: [],
        updatedAt: new Date(),
        id: crypto.randomUUID()
      };

      // You might want to save this default progress to the database
      return Response.json(selectNextQuestion(defaultProgress, topic));
    }

    const transformedProgress: StudentProgress = {
      ...progress,
      updatedAt: progress.updatedAt || new Date()
    };

    const question = selectNextQuestion(transformedProgress, topic);

    // Save the generated problem
    await db.insert(mathProblems).values({
      id: crypto.randomUUID(),
      studentId: session.user.id,
      question: question.text,
      answer: question.correctAnswer.toString(),
      category: topic.category,
      difficulty: topic.level,
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