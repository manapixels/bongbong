'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MATH_TOPICS } from '@/types/math';
import { Progress } from '@/components/ui/progress';
import { Progress as UserProgress } from '@/types';

interface MathTopicsSidebarProps {
  progress?: UserProgress;
}

export function MathTopicsSidebar({ progress }: MathTopicsSidebarProps) {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([]);
  const [expandedStrands, setExpandedStrands] = useState<string[]>([]);

  // Group topics by level
  const topicsByLevel = MATH_TOPICS.reduce(
    (acc, topic) => {
      if (!acc[topic.level]) {
        acc[topic.level] = [];
      }
      acc[topic.level].push(topic);
      return acc;
    },
    {} as Record<number, typeof MATH_TOPICS>
  );

  const toggleLevel = (level: number) => {
    setExpandedLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedStrands((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  const getSubStrandProgress = (subStrand: string) => {
    if (!progress?.subStrandProgress) return 0;
    const subStrandProgress = progress.subStrandProgress.find(
      (p) => p.subStrand === subStrand
    );
    if (!subStrandProgress || subStrandProgress.questionsAttempted === 0)
      return 0;
    return Math.round(
      (subStrandProgress.correctAnswers /
        subStrandProgress.questionsAttempted) *
        100
    );
  };

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Math Topics</h2>
          <Link
            href="/math/preferences"
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Edit Topics
          </Link>
        </div>
        <div className="space-y-2">
          {Object.entries(topicsByLevel)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, topics]) => (
              <div key={level} className="space-y-1">
                <button
                  onClick={() => toggleLevel(Number(level))}
                  className="flex items-center w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  {expandedLevels.includes(Number(level)) ? (
                    <ChevronDown className="w-4 h-4 mr-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2" />
                  )}
                  Primary {level}
                </button>

                {expandedLevels.includes(Number(level)) && (
                  <div className="ml-4 space-y-1">
                    {topics.map((topic) => (
                      <div key={topic.id}>
                        <button
                          onClick={() => toggleTopic(topic.id)}
                          className="flex items-center w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          {expandedStrands.includes(topic.id) ? (
                            <ChevronDown className="w-4 h-4 mr-2" />
                          ) : (
                            <ChevronRight className="w-4 h-4 mr-2" />
                          )}
                          {topic.name}
                        </button>

                        {expandedStrands.includes(topic.id) && (
                          <div className="ml-6 space-y-2">
                            {topic.subStrandTopics.map((subtopic) => (
                              <div key={subtopic.id} className="space-y-1">
                                <Link
                                  href={`/math/practice/${subtopic.id}`}
                                  className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm"
                                >
                                  {subtopic.name}
                                </Link>
                                <div className="px-2">
                                  <Progress
                                    value={getSubStrandProgress(
                                      topic.subStrand
                                    )}
                                    className="h-1"
                                  />
                                  <div className="text-xs text-gray-500 mt-1">
                                    {getSubStrandProgress(topic.subStrand)}%
                                    complete
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
