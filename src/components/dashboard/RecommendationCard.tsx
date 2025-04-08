
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight } from 'lucide-react';

const recommendations = [
  {
    title: 'Optimize Your Commute',
    description: 'Consider carpooling or using public transport twice a week to reduce your transportation emissions.',
    potential: '11.2 kgCO₂e monthly reduction',
    difficulty: 'Medium',
    color: 'text-cs-blue-600 dark:text-cs-blue-400',
  },
  {
    title: 'Reduce Digital Carbon',
    description: 'Clean up your email and cloud storage to minimize server energy usage and your digital footprint.',
    potential: '1.6 kgCO₂e monthly reduction',
    difficulty: 'Easy',
    color: 'text-cs-green-600 dark:text-cs-green-400',
  },
  {
    title: 'Switch to LED Lighting',
    description: "Replace your home's remaining incandescent bulbs with energy-efficient LED alternatives.",
    potential: '8.3 kgCO₂e monthly reduction',
    difficulty: 'Easy',
    color: 'text-amber-600 dark:text-amber-400',
  }
];

const RecommendationCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Recommendations</CardTitle>
          <Lightbulb className="h-5 w-5 text-cs-green-500" />
        </div>
        <CardDescription>
          Personalized suggestions to reduce your carbon footprint
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-4 bg-muted/40 rounded-lg border border-border">
              <h4 className={`font-medium mb-1 ${rec.color}`}>{rec.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-cs-green-600 dark:text-cs-green-400">
                  {rec.potential}
                </span>
                <span className="bg-muted px-2 py-0.5 rounded">
                  {rec.difficulty} difficulty
                </span>
              </div>
            </div>
          ))}
          
          <div className="pt-2">
            <Button variant="outline" className="w-full" size="sm">
              View All Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
