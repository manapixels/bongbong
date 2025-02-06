// import Chat from "@/components/chat";
'use client';

import { useState } from 'react';
import { continueMathTutoring, Message } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconArrowUp } from '@/components/ui/icons';
import GenUICard from '@/components/cards/genuicard';
import { Loader2 } from 'lucide-react';

export const maxDuration = 30;

export default function GenUI() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setConversation((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await continueMathTutoring([
        ...conversation.map(({ role, content }) => ({ role, content })),
        userMessage,
      ]);

      setConversation((prev) => [
        ...prev,
        { role: 'assistant' as const, content: String(response) },
      ]);
    } catch (error) {
      console.error('Error in math tutoring:', error);
      setConversation((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          content:
            'I apologize, but I encountered an error. Please try asking your question again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden pb-10 flex-col">
      <div className="group w-full overflow-auto">
        <div className="max-w-xl mx-auto mt-10 mb-24">
          {conversation.length <= 0 && (
            <div className="space-y-4">
              <GenUICard />
              <Card className="p-4">
                <h3 className="font-semibold mb-2">
                  Example Questions You Can Ask:
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • Can you help me understand how to solve fraction word
                    problems?
                  </li>
                  <li>
                    • Explain the model method for solving PSLE math questions
                  </li>
                  <li>
                    • What&apos;s the difference between ratio and proportion?
                  </li>
                  <li>• Can you give me a practice question about algebra?</li>
                </ul>
              </Card>
            </div>
          )}
          {conversation.map((message, index) => (
            <div key={index} className="whitespace-pre-wrap flex mb-5">
              <div
                className={`${
                  message.role === 'user'
                    ? 'bg-slate-200 ml-auto max-w-[80%] rounded-t-2xl rounded-bl-2xl'
                    : 'bg-primary/5 max-w-[80%] rounded-t-2xl rounded-br-2xl'
                } p-4`}
              >
                <div className="prose prose-sm">{message.content}</div>
                {message.display && (
                  <div className="mt-2 border-t pt-2">{message.display}</div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground p-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
        <div className="fixed inset-x-0 bottom-10 w-full">
          <div className="w-full max-w-xl mx-auto">
            <Card className="p-2 shadow-lg">
              <div className="flex">
                <Input
                  type="text"
                  value={input}
                  onKeyDown={handleKeyDown}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                  disabled={isLoading}
                  className="w-[95%] mr-2 border-0 ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none border-transparent focus:border-transparent focus-visible:ring-none"
                  placeholder={
                    isLoading ? 'Please wait...' : 'Ask me about PSLE math...'
                  }
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="transition-all"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <IconArrowUp />
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
