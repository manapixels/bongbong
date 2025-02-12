'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MATH_TOPICS } from '@/types/math';
import { useUserProgress } from '@/hooks/use-user-progress';
import {
  getAllTopicIds,
  createTopicKey,
  type TopicKey,
} from '@/lib/utils/math';

interface UserPreferences {
  topicsEnabled: TopicKey[];
  difficulty: number;
}

export default function MathPreferencesPage() {
  const router = useRouter();
  const { user, userId, progress } = useUserProgress();
  const [enabledTopics, setEnabledTopics] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.preferences) {
      const prefs = user.preferences as unknown as UserPreferences;
      if (
        Array.isArray(prefs.topicsEnabled) &&
        prefs.topicsEnabled.length > 0
      ) {
        // Check if the array contains TopicKey objects
        if (
          prefs.topicsEnabled.every(
            (t) =>
              typeof t === 'object' &&
              t !== null &&
              'subStrand' in t &&
              'level' in t &&
              typeof t.subStrand === 'string' &&
              typeof t.level === 'number'
          )
        ) {
          // Convert the stored TopicKey objects to strings
          const enabledKeys = prefs.topicsEnabled.map((topic) =>
            createTopicKey(topic.subStrand, topic.level)
          );
          setEnabledTopics(enabledKeys);
          return;
        }
      }
    }

    // If no valid preferences, enable all topics by default
    setEnabledTopics(
      getAllTopicIds().map((topic) =>
        createTopicKey(topic.subStrand, topic.level)
      )
    );
  }, [user]);

  const toggleTopic = (subStrand: string, level: number) => {
    const topicKey = createTopicKey(subStrand, level);
    setEnabledTopics((prev) =>
      prev.includes(topicKey)
        ? prev.filter((t) => t !== topicKey)
        : [...prev, topicKey]
    );
  };

  const getTopicProgress = (subStrand: string, level: number) => {
    if (!progress?.subStrandProgress) return 0;
    const subStrandProgress = progress.subStrandProgress.find(
      (p) => p.subStrand === subStrand && p.level === level
    );
    if (!subStrandProgress || subStrandProgress.questionsAttempted === 0)
      return 0;
    return Math.round(
      (subStrandProgress.correctAnswers /
        subStrandProgress.questionsAttempted) *
        100
    );
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      // Convert the string keys back to TopicKey objects for storage
      const topicObjects: TopicKey[] = enabledTopics.map((key) => {
        const [subStrand, level] = key.split('-');
        return {
          subStrand,
          level: parseInt(level, 10),
        };
      });

      const response = await fetch(`/api/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          preferences: {
            ...user?.preferences,
            topicsEnabled: topicObjects,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      router.push('/math');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Math Topics Preferences</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => router.push('/math')}>
              Cancel
            </Button>
            <Button onClick={savePreferences} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(topicsByLevel)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([level, topics]) => (
              <Card key={level} className="p-6">
                <h2 className="text-xl font-semibold mb-4">Primary {level}</h2>
                <div className="space-y-4">
                  {topics.map((topic) => (
                    <div
                      key={`${topic.id}-${level}`}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{topic.name}</h3>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm text-gray-500">
                            {topic.subStrandTopics.length} subtopics
                          </p>
                          <p className="text-sm text-gray-500">
                            {getTopicProgress(topic.subStrand, Number(level))}%
                            complete
                          </p>
                        </div>
                      </div>
                      <Switch
                        checked={enabledTopics.includes(
                          createTopicKey(topic.subStrand, Number(level))
                        )}
                        onCheckedChange={() =>
                          toggleTopic(topic.subStrand, Number(level))
                        }
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
