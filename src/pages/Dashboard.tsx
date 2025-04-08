
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Smile } from 'lucide-react';
import CarbonSummary from '@/components/dashboard/CarbonSummary';
import EmissionsChart from '@/components/dashboard/EmissionsChart';
import ActivityLog from '@/components/dashboard/ActivityLog';
import RecommendationCard from '@/components/dashboard/RecommendationCard';

const Dashboard = () => {
  return (
    <Layout>
      <div className="cs-container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your carbon footprint and monitor your progress
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-muted py-2 px-4 rounded-full flex items-center">
            <Award className="h-5 w-5 text-cs-blue-500 mr-2" />
            <span className="text-sm font-medium">Eco Level:</span>
            <span className="text-sm font-bold ml-2 mr-1">Sustainer</span>
            <Smile className="h-4 w-4 text-cs-green-500" />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/40">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <CarbonSummary />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <EmissionsChart />
              </div>
              <div className="md:col-span-1">
                <RecommendationCard />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActivityLog />
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                  <CardDescription>Eco badges and rewards you've earned</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted text-center p-4 rounded-lg hover-lift">
                      <div className="w-12 h-12 bg-cs-green-100 dark:bg-cs-green-800/30 text-cs-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium">Carbon Cutter</p>
                    </div>
                    <div className="bg-muted text-center p-4 rounded-lg hover-lift">
                      <div className="w-12 h-12 bg-cs-blue-100 dark:bg-cs-blue-800/30 text-cs-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-medium">Digital Minimalist</p>
                    </div>
                    <div className="bg-muted text-center p-4 rounded-lg hover-lift">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">Eco Warrior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
                <CardDescription>Track all your recorded carbon activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Your detailed activity content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Carbon Insights</CardTitle>
                <CardDescription>Advanced analytics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Your detailed insights content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Rewards</CardTitle>
                <CardDescription>Your eco-friendly milestones and badges</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Your detailed achievements content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
