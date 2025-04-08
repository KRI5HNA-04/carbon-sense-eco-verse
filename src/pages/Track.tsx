
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarbonActivityForm from '@/components/track/CarbonActivityForm';
import WebsiteCalculator from '@/components/track/WebsiteCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CodeOptimizer from '@/components/track/CodeOptimizer';

const Track = () => {
  const [activities, setActivities] = useState([
    {
      type: 'Car trip to office',
      details: '20 km • Today, 9:15 AM',
      emission: 4.2
    },
    {
      type: 'Electricity usage',
      details: '3.5 kWh • Yesterday, 8:30 PM',
      emission: 1.8
    },
    {
      type: 'Ordered new headphones',
      details: '1 item • Yesterday, 3:45 PM',
      emission: 5.3
    }
  ]);

  const handleNewActivity = (activity: { type: string, details: string, emission: number }) => {
    setActivities(prev => [activity, ...prev]);
  };

  return (
    <Layout>
      <div className="cs-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Carbon Footprint</h1>
          <p className="text-muted-foreground">
            Record your activities and calculate their environmental impact
          </p>
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList className="bg-muted/40">
            <TabsTrigger value="activity">Daily Activity</TabsTrigger>
            <TabsTrigger value="website">Website Calculator</TabsTrigger>
            <TabsTrigger value="code">Code Optimizer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CarbonActivityForm onActivitySaved={handleNewActivity} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recently recorded carbon activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.type}</p>
                          <p className="text-xs text-muted-foreground">{activity.details}</p>
                        </div>
                        <span className="text-sm font-medium">{activity.emission.toFixed(1)} kgCO₂e</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="website">
            <div className="grid grid-cols-1 gap-6">
              <WebsiteCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="code">
            <CodeOptimizer />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Track;
