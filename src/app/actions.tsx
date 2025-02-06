'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { createStreamableUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  display?: ReactNode;
}

// Streaming Math Tutor Chat
export async function continueMathTutoring(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
    temperature: 0.7,
    system: `You are a friendly and patient math tutor specializing in the Singapore PSLE mathematics syllabus.
Your goal is to help students understand mathematical concepts deeply through the Singapore method.
Always:
1. Break down complex problems into simpler parts
2. Use visual models and diagrams when helpful
3. Encourage students to think through problems step-by-step
4. Provide positive reinforcement
5. Focus on understanding rather than just getting the right answer
6. Use real-world examples from Singapore context when relevant`,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
}

// Generate Practice Questions
export async function generateMathPractice(
  topic: string,
  difficulty: 'easy' | 'medium' | 'hard'
) {
  const stream = createStreamableUI();

  const { text } = await generateText({
    model: openai('gpt-4-turbo'),
    system: `You are a mathematics question generator for PSLE students.
Generate questions that:
1. Follow Singapore math curriculum standards
2. Are appropriate for the given difficulty level
3. Include step-by-step solutions
4. Use practical, real-world contexts when possible`,
    messages: [
      {
        role: 'user',
        content: `Generate a ${difficulty} level practice question for ${topic} with detailed solution steps.`,
      },
    ],
  });

  return {
    question: text,
    display: stream.value,
  };
}

// Utils
export async function checkAIAvailability() {
  const envVarExists = !!process.env.OPENAI_API_KEY;
  return envVarExists;
}
