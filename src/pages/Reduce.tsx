
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowRight, ThumbsUp, ThumbsDown, Leaf, Home, Car, Laptop, ShoppingBag, Utensils } from 'lucide-react';

const categories = [
  {
    icon: <Home className="h-6 w-6 text-cs-green-500" />,
    title: 'Home Energy',
  },
  {
    icon: <Car className="h-6 w-6 text-cs-green-500" />,
    title: 'Transportation',
  },
  {
    icon: <Utensils className="h-6 w-6 text-cs-green-500" />,
    title: 'Food & Diet',
  },
  {
    icon: <Laptop className="h-6 w-6 text-cs-green-500" />,
    title: 'Digital',
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-cs-green-500" />,
    title: 'Shopping',
  },
];

const recommendations = [
  {
    title: 'Switch to LED Lighting',
    category: 'Home Energy',
    impact: 'High',
    description: 'Replace all incandescent bulbs with LED alternatives to reduce electricity consumption.',
    reduction: '12.6 kgCO₂e monthly reduction',
    effort: 'Low',
    cost: '$-$$',
  },
  {
    title: 'Optimize Your Commute',
    category: 'Transportation',
    impact: 'High',
    description: 'Carpool, use public transport, or bike to work at least twice a week.',
    reduction: '42.8 kgCO₂e monthly reduction',
    effort: 'Medium',
    cost: '$',
  },
  {
    title: 'Reduce Meat Consumption',
    category: 'Food & Diet',
    impact: 'High',
    description: 'Go meatless for 2-3 days per week to significantly lower your carbon footprint.',
    reduction: '34.2 kgCO₂e monthly reduction',
    effort: 'Medium',
    cost: '$',
  },
  {
    title: 'Digital Storage Cleanup',
    category: 'Digital',
    impact: 'Low',
    description: 'Delete unused emails, files and optimize your cloud storage usage.',
    reduction: '1.8 kgCO₂e monthly reduction',
    effort: 'Low',
    cost: 'Free',
  },
  {
    title: 'Buy Second-Hand Electronics',
    category: 'Shopping',
    impact: 'Medium',
    description: 'Purchase refurbished or second-hand electronics instead of new ones.',
    reduction: '23.5 kgCO₂e per purchase',
    effort: 'Low',
    cost: '$$',
  },
];

const Reduce = () => {
  return (
    <Layout>
      <div className="cs-container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Reduce Your Impact</h1>
          <p className="text-muted-foreground">
            Get personalized recommendations to lower your carbon footprint
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-muted/40">
            <TabsTrigger value="all">All Recommendations</TabsTrigger>
            <TabsTrigger value="personalized">Personalized</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            <div className="flex overflow-x-auto pb-4 scrollbar-none gap-3">
              <Button variant="outline" className="rounded-full">All Categories</Button>
              {categories.map((category, index) => (
                <Button key={index} variant="outline" className="rounded-full flex items-center whitespace-nowrap">
                  {category.icon}
                  <span className="ml-2">{category.title}</span>
                </Button>
              ))}
            </div>
            
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="bg-card hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-cs-green-100 dark:bg-cs-green-900/30 text-cs-green-700 dark:text-cs-green-400 text-xs rounded-full px-2 py-0.5">{rec.category}</span>
                          <span className="bg-muted text-xs rounded-full px-2 py-0.5">
                            <Leaf className="h-3 w-3 inline mr-1" />
                            {rec.impact} Impact
                          </span>
                        </div>
                        <h3 className="text-lg font-medium">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                        
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                          <div>
                            <p className="text-sm font-medium text-cs-green-600 dark:text-cs-green-400">{rec.reduction}</p>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <span className="bg-muted px-2 py-1 rounded">{rec.effort} Effort</span>
                            <span className="bg-muted px-2 py-1 rounded">{rec.cost}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col gap-2">
                        <Button size="sm" variant="default" className="flex-1">
                          Implement
                        </Button>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="p-2">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2">
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline">
                Load More Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="personalized">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Based on your activity data and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  Track more activities to get personalized recommendations
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Recommendations</CardTitle>
                <CardDescription>Recommendations you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  You haven't saved any recommendations yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Actions</CardTitle>
                <CardDescription>Recommendations you've successfully implemented</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground py-8 text-center">
                  You haven't completed any recommendations yet
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reduce;
