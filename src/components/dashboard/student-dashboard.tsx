'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AchievementDisplay } from '@/components/achievements/achievement-display';

interface StudentDashboardProps {
  studentId: string;
}

export function StudentDashboard({ studentId }: StudentDashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);

  const fetchAnalytics = useCallback(async () => {
    const response = await fetch(`/api/analytics/${studentId}`);
    const data = await response.json();
    setAnalytics(data);
  }, [studentId]);

  useEffect(() => {
    fetchAnalytics();
  }, [studentId, fetchAnalytics]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Level {analytics.level}</span>
            <span>{analytics.xpNeeded} XP to next level</span>
          </div>
          <Progress value={analytics.xpProgress} />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Performance</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={analytics.performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <AchievementDisplay
        achievements={analytics.achievements}
        newAchievements={analytics.newAchievements}
      />

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc pl-4 space-y-1">
          {analytics.recommendations.map((rec: string, i: number) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
