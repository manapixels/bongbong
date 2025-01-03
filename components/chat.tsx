'use client';

import type { Message } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/schema';
import { fetcher } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';

// Define our own Attachment type since it's not exported from 'ai'
interface Attachment {
  name: string;
  type: string;
  size: number;
  url: string;
}

// Create a type for the chat request options
interface ChatRequestOptions {
  options?: {
    body?: any;
    headers?: Record<string, string>;
  };
}

// Add this interface to properly type the chat options
interface ChatOptions {
  body?: {
    id: string;
    modelId: string;
  };
  headers?: Record<string, string>;
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly = false
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly?: boolean;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    onFinish: () => {
      mutate('/api/history');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    `/api/vote?chatId=${id}`,
    fetcher,
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  // Wrap setMessages to match the expected type
  const handleSetMessages = (newMessages: Message[] | ((prev: Message[]) => Message[])) => {
    setMessages(newMessages as any);
  };

  // Wrap handleSubmit to match the expected type
  const handleSubmitWrapper = (
    event?: { preventDefault?: () => void } | undefined,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    handleSubmit(event as any, chatRequestOptions as any);
  };

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedModelId}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <Messages
          chatId={id}
          isLoading={isLoading}
          votes={votes}
          messages={messages}
          setMessages={handleSetMessages}
          reload={reload}
          isReadonly={isReadonly}
          isBlockVisible={isBlockVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmitWrapper}
              isLoading={isLoading}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={handleSetMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmitWrapper}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={handleSetMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
