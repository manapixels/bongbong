'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { MathTopic } from '@/types/math';
import type { Progress } from '@/types/progress';

interface TopicSelectorProps {
  topics: MathTopic[];
  studentProgress: Progress;
  onSelectTopic: (topic: MathTopic) => void;
}

export function TopicSelector({
  topics,
  studentProgress,
  onSelectTopic,
}: TopicSelectorProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const getTopicProgress = (topicId: string) => {
    if (!studentProgress.subStrandProgress) return 0;
    const progress = studentProgress.subStrandProgress.find(
      (p) => p.subStrand === topicId
    );
    if (!progress) return 0;
    return (progress.correctAnswers / progress.questionsAttempted) * 100;
  };

  const filteredTopics = topics.filter(
    (topic) => topic.level === selectedLevel
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? 'default' : 'outline'}
            onClick={() => setSelectedLevel(level)}
          >
            P{level}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className="p-4 cursor-pointer hover:border-primary transition-colors"
            onClick={() => onSelectTopic(topic)}
          >
            <h3 className="font-medium mb-2">{topic.name}</h3>
            <ProgressBar value={getTopicProgress(topic.id)} className="h-2" />
            <div className="mt-2 text-sm text-muted-foreground">
              {topic.subStrandTopics.length} subtopics
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
