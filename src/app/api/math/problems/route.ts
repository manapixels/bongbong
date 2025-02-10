import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import {
  mathQuestions as mathQuestionsTable,
  progress as progressTable,
} from '@/lib/db/schema';
import { MATH_TOPICS } from '@/types/math';
import { selectNextQuestion } from '@/lib/math';
import { getStudentProgress } from '@/lib/db/queries';
import type { Progress } from '@/types/progress';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const topicId = searchParams.get('topicId');

  if (!topicId) {
    return new Response('Topic ID is required', { status: 400 });
  }

  const topic = MATH_TOPICS.find((t) => t.id === topicId);
  if (!topic) {
    return new Response('Topic not found', { status: 404 });
  }

  try {
    let progress = await getStudentProgress({ userId: session.user.id });

    if (!progress) {
      // Create a progress record that matches the schema
      const defaultProgress: Progress = {
        id: crypto.randomUUID(),
        userId: session.user.id,
        questionId: null,
        isCorrect: false,
        timeSpent: null,
        createdAt: new Date(),
        subStrandProgress: [],
      };

      return Response.json(
        selectNextQuestion(defaultProgress, topic.subStrand)
      );
    }

    // No need for transformation since we're using the correct type
    const question = selectNextQuestion(progress, topic.subStrand);

    // First save the problem
    const [savedProblem] = await db
      .insert(mathQuestionsTable)
      .values({
        question: question.question || '',
        answer: String(question.answer ?? ''),
        answerFormula: '',
        explanation: question.explanation || [],
        difficulty: question.difficulty ?? 0,
        strand: topic.strand,
        subStrand: topic.subStrand,
        variables: {},
        createdAt: new Date(),
      })
      .returning();

    // Then create an initial progress entry for this problem
    await db.insert(progressTable).values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      questionId: savedProblem.id,
      isCorrect: false,
      timeSpent: 0,
      createdAt: new Date(),
      subStrandProgress: [],
    });

    return Response.json(question);
  } catch (error) {
    console.error('Error generating question:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
