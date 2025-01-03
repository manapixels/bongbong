import { useState, useEffect } from 'react';
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export function StudentDashboard({ studentId }: { studentId: string }) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange]);

  const fetchAnalytics = async (range: string) => {
    const data = await fetch(`/api/analytics/${studentId}?range=${range}`).then(res => res.json());
    setData(data);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Level {data.level}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={data.xpProgress} />
                <p>{data.xpNeeded}XP to next level</p>
              </CardContent>
            </Card>
            {/* Add more overview cards */}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <div className="space-x-2">
                  <Button
                    variant={timeRange === 'week' ? 'default' : 'outline'}
                    onClick={() => setTimeRange('week')}
                  >
                    Week
                  </Button>
                  {/* Add month/year buttons */}
                </div>
              </CardHeader>
              <CardContent>
                <LineChart width={800} height={400} data={data.performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                  <Line type="monotone" dataKey="speed" stroke="#82ca9d" />
                </LineChart>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart width={800} height={400} data={data.categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#8884d8" />
                  <Bar dataKey="attempts" fill="#82ca9d" />
                </BarChart>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Add other tab contents */}
      </Tabs>
    </div>
  );
} 