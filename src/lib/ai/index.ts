import { openai } from '@ai-sdk/openai';
import { wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string) =>
  wrapLanguageModel({
    model: openai(apiIdentifier),
    middleware: customMiddleware,
  });
