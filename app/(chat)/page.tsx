import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function ChatPage() {
  // Use mock user data
  const user = {
    id: 'mock-user-id', 
    email: 'demo@example.com',
    name: 'Demo User'
  };

  return (
    <Chat
      id={nanoid()}
      initialMessages={[]}
      selectedModelId="claude-3-sonnet"
      selectedVisibilityType="private"
      isReadonly={false}
    />
  );
}
