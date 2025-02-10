'use client';

import { useState } from 'react';
import { TopicSelector } from './topic-selector';
import { PracticeSession } from './practice-session';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { MathTopic } from '@/types/math';
import type { Progress } from '@/types/progress';

interface PracticeLayoutProps {
  studentId: string;
  topics: MathTopic[];
  studentProgress: Progress;
}

export function PracticeLayout({
  studentId,
  topics,
  studentProgress,
}: PracticeLayoutProps) {
  const [selectedTopic, setSelectedTopic] = useState<MathTopic | null>(null);

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedTopic ? (
            <PracticeSession
              topic={selectedTopic}
              studentId={studentId}
              onComplete={() => setSelectedTopic(null)}
            />
          ) : (
            <TopicSelector
              topics={topics}
              studentProgress={studentProgress}
              onSelectTopic={setSelectedTopic}
            />
          )}
        </div>
        <div className="lg:col-span-1">
          <StudentDashboard studentId={studentId} />
        </div>
      </div>
    </div>
  );
}
