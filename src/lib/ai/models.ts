// Define your models here.

export interface Model {
  id: string;
  name: string;
  apiIdentifier: string;
  description: string;
  contextWindow: number;
}

export const models: Array<Model> = [
  {
    id: 'primary-tutor',
    name: 'Primary School Tutor',
    apiIdentifier: 'gpt-4-turbo',
    description: 'Best for step-by-step explanations and detailed guidance',
    contextWindow: 128000,
  },
  {
    id: 'quick-helper',
    name: 'Quick Helper',
    apiIdentifier: 'gpt-3.5-turbo',
    description: 'Good for quick practice and simple explanations',
    contextWindow: 16000,
  }
] as const;

export const DEFAULT_MODEL_NAME: string = 'primary-tutor';
