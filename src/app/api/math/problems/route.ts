import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import {
  mathQuestions as mathQuestionsTable,
  progress as progressTable,
} from '@/lib/db/schema';
import { MATH_TOPICS } from '@/types/math';
import { selectNextQuestion } from '@/lib/math';
import { getStudentProgress, getOrCreateUser } from '@/lib/db/queries';
import type { Progress } from '@/types/progress';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const searchParams = new URL(request.url).searchParams;
  const topicId = searchParams.get('topicId');

  if (!topicId) {
    return new Response('Topic ID is required', { status: 400 });
  }

  const topic = MATH_TOPICS.find((t) => t.id === topicId);
  if (!topic) {
    return new Response('Invalid topic ID', { status: 400 });
  }

  try {
    // Ensure user exists first
    await getOrCreateUser(session.user.id);

    let progress = await getStudentProgress({ userId: session.user.id });

    if (!progress) {
      // Create a progress record that matches the schema
      const [newProgress] = await db
        .insert(progressTable)
        .values({
          userId: session.user.id,
          isCorrect: false,
          timeSpent: 0,
          subStrandProgress: [],
        })
        .returning();

      progress = newProgress;
    }

    // Generate the question
    const question = selectNextQuestion(progress, topic.subStrand);

    // Save the problem
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

    // Update the progress with the new question
    await db
      .update(progressTable)
      .set({
        questionId: savedProblem.id,
      })
      .where(eq(progressTable.userId, session.user.id));

    return NextResponse.json(question);
  } catch (error) {
    console.error('Error generating question:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
