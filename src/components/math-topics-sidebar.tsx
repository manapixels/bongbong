'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Topic {
  id: string;
  name: string;
  subtopics: {
    id: string;
    name: string;
  }[];
}

interface Level {
  name: string;
  topics: Topic[];
}

const MATH_SYLLABUS: Level[] = [
  {
    name: 'Primary 1',
    topics: [
      {
        id: 'p1-numbers',
        name: 'Numbers to 100',
        subtopics: [
          { id: 'p1-counting', name: 'Counting to 100' },
          { id: 'p1-place-value', name: 'Place Values' },
          { id: 'p1-comparing', name: 'Comparing Numbers' }
        ]
      },
      {
        id: 'p1-addition',
        name: 'Addition & Subtraction',
        subtopics: [
          { id: 'p1-add-within-100', name: 'Addition within 100' },
          { id: 'p1-sub-within-100', name: 'Subtraction within 100' }
        ]
      }
    ]
  },
  // Add more levels and topics based on the PSLE syllabus
];

export function MathTopicsSidebar() {
  const [expandedLevels, setExpandedLevels] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);

  const toggleLevel = (levelName: string) => {
    setExpandedLevels(prev => 
      prev.includes(levelName) 
        ? prev.filter(l => l !== levelName)
        : [...prev, levelName]
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
          {MATH_SYLLABUS.map((level) => (
            <div key={level.name} className="space-y-1">
              <button
                onClick={() => toggleLevel(level.name)}
                className="flex items-center w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                {expandedLevels.includes(level.name) ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                {level.name}
              </button>
              
              {expandedLevels.includes(level.name) && (
                <div className="ml-4 space-y-1">
                  {level.topics.map((topic) => (
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
                          {topic.subtopics.map((subtopic) => (
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