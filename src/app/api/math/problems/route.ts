import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { mathProblems, studentProgress } from '@/lib/db/schema';
import { MATH_TOPICS } from '@/types/math';
import { selectNextQuestion } from '@/lib/math/questionGenerators';
import { getStudentProgress } from '@/lib/db/queries';
import type { StudentProgress } from '@/types/progress';

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
      // Create a progress record that matches the schema
      const defaultProgress: StudentProgress = {
        id: crypto.randomUUID(),
        studentId: session.user.id,
        problemId: null,
        isCorrect: false,
        timeSpent: null,
        topicProgress: [],
        createdAt: new Date()
      };

      return Response.json(selectNextQuestion(defaultProgress, topic));
    }

    // No need for transformation since we're using the correct type
    const question = selectNextQuestion(progress, topic);

    // First save the problem
    const [savedProblem] = await db.insert(mathProblems).values({
      id: crypto.randomUUID(),
      question: question.text,
      answer: parseInt(question.correctAnswer.toString()),
      difficulty: topic.level.toString(),
      category: topic.categories[0]
    }).returning();


    // Then create an initial progress entry for this problem
    await db.insert(studentProgress).values({
      id: crypto.randomUUID(),
      studentId: session.user.id,
      problemId: savedProblem.id,
      isCorrect: false,
      timeSpent: 0,
      createdAt: new Date()
    });

    return Response.json(question);
  } catch (error) {
    console.error('Error generating question:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 