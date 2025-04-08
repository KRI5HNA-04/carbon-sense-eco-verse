
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarbonActivityForm from '@/components/track/CarbonActivityForm';
import WebsiteCalculator from '@/components/track/WebsiteCalculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Track = () => {
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
            <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CarbonActivityForm />
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your recently recorded carbon activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Car trip to office</p>
                        <p className="text-xs text-muted-foreground">20 km • Today, 9:15 AM</p>
                      </div>
                      <span className="text-sm font-medium">4.2 kgCO₂e</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Electricity usage</p>
                        <p className="text-xs text-muted-foreground">3.5 kWh • Yesterday, 8:30 PM</p>
                      </div>
                      <span className="text-sm font-medium">1.8 kgCO₂e</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                      <div className="flex-1">
                        <p className="font-medium text-sm">Ordered new headphones</p>
                        <p className="text-xs text-muted-foreground">1 item • Yesterday, 3:45 PM</p>
                      </div>
                      <span className="text-sm font-medium">5.3 kgCO₂e</span>
                    </div>
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
            <Card>
              <CardHeader>
                <CardTitle>Code Optimization Tool</CardTitle>
                <CardDescription>Analyze code efficiency from a carbon perspective</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Code optimization tool content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Import</CardTitle>
                <CardDescription>Upload data from other sources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Bulk import tool content will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Track;
