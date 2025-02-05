'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MATH_TOPICS } from '@/types/math';

export function MathTopicsSidebar() {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  // Group topics by level
  const topicsByLevel = MATH_TOPICS.reduce((acc, topic) => {
    if (!acc[topic.level]) {
      acc[topic.level] = [];
    }
    acc[topic.level].push(topic);
    return acc;
  }, {} as Record<number, typeof MATH_TOPICS>);

  const toggleLevel = (level: number) => {
    setExpandedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(t => t !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Math Topics</h2>
        <div className="space-y-2">
          {Object.entries(topicsByLevel).sort(([a], [b]) => Number(a) - Number(b)).map(([level, topics]) => (
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
                        {expandedTopics.includes(topic.id) ? (
                          <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-2" />
                        )}
                        {topic.name}
                      </button>
                      
                      {expandedTopics.includes(topic.id) && (
                        <div className="ml-6 space-y-1">
                          {topic.subTopics.map((subtopic) => (
                            <Link
                              key={subtopic.id}
                              href={`/math/practice/${subtopic.id}`}
                              className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-sm"
                            >
                              {subtopic.name}
                            </Link>
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