import { db } from '@/lib/db';
import {
  mathQuestions as mathQuestionsTable,
  progress as progressTable,
} from '@/lib/db/schema';
import { MATH_TOPICS } from '@/types/math';
import { selectNextQuestion } from '@/lib/math';
import { getStudentProgress, getOrCreateUser } from '@/lib/db/queries';
import type { Progress } from '@/types/progress';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { profile, progress } = body;

    if (!profile?.id) {
      return new Response('User ID is required', { status: 400 });
    }

    // Get or create user
    await getOrCreateUser(profile.id);

    // Get the user's progress
    let userProgress =
      progress || (await getStudentProgress({ userId: profile.id }));

    if (!userProgress) {
      // Create a default progress record
      userProgress = {
        id: crypto.randomUUID(),
        userId: profile.id,
        questionId: null,
        isCorrect: false,
        timeSpent: null,
        createdAt: new Date(),
        subStrandProgress: [],
      };
    }

    // Filter topics based on user's preferences
    const availableTopics = MATH_TOPICS.filter((topic) =>
      profile.preferences?.topicsEnabled?.includes(topic.subStrand)
    );

    if (availableTopics.length === 0) {
      // If no topics are enabled, use all topics
      availableTopics.push(...MATH_TOPICS);
    }

    // Select a random topic from available ones
    const selectedTopic =
      availableTopics[Math.floor(Math.random() * availableTopics.length)];

    if (!selectedTopic) {
      return new Response('No suitable topic found', { status: 404 });
    }

    // Generate the next question based on the user's progress and selected topic
    const getDefaultDifficulty = () => 3; // Default to middle difficulty (1-5 scale)

    const question = selectNextQuestion(
      userProgress,
      selectedTopic.subStrand,
      typeof profile.preferences?.difficulty === 'number'
        ? Math.min(Math.max(profile.preferences.difficulty, 1), 5) // Clamp between 1-5
        : getDefaultDifficulty()
    );

    // Save the generated problem
    const [savedProblem] = await db
      .insert(mathQuestionsTable)
      .values({
        question: question.question || '',
        answer: String(question.answer ?? ''),
        answerFormula: '',
        explanation: question.explanation || [],
        difficulty:
          typeof profile.preferences?.difficulty === 'number'
            ? Math.min(Math.max(profile.preferences.difficulty, 1), 5) // Clamp between 1-5
            : getDefaultDifficulty(),
        strand: selectedTopic.strand,
        subStrand: selectedTopic.subStrand,
        variables: {},
        createdAt: new Date(),
      })
      .returning();

    // Create an initial progress entry for this problem
    await db.insert(progressTable).values({
      id: crypto.randomUUID(),
      userId: profile.id,
      questionId: savedProblem.id,
      isCorrect: false,
      timeSpent: 0,
      createdAt: new Date(),
      subStrandProgress: [],
    });

    return Response.json({
      ...question,
      id: savedProblem.id,
      strand: selectedTopic.strand,
      subStrand: selectedTopic.subStrand,
      topicId: selectedTopic.id,
    });
  } catch (error) {
    console.error('Error generating problem:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
