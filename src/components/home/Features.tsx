
import React from 'react';
import { Globe, Code, ShoppingBag, Search, Map, BarChart2, Award, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Globe className="h-10 w-10 text-cs-green-500" />,
    title: 'Website Carbon Calculator',
    description: 'Analyze websites to estimate their carbon footprint and get optimization suggestions.',
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-cs-blue-500" />,
    title: 'Daily Carbon Tracker',
    description: 'Track your daily activities and see their environmental impact with detailed metrics.',
  },
  {
    icon: <Map className="h-10 w-10 text-cs-green-500" />,
    title: 'Geographic Carbon Mapping',
    description: 'Interactive map of India showing regions with highest carbon emissions and trends over time.',
  },
  {
    icon: <FileText className="h-10 w-10 text-cs-blue-500" />,
    title: 'Reduction Recommendations',
    description: 'Get personalized suggestions to reduce your carbon footprint based on your activities.',
  },
  {
    icon: <Code className="h-10 w-10 text-cs-green-500" />,
    title: 'Code Optimization Tool',
    description: 'Analyze and optimize your code to reduce computational resources and carbon emissions.',
  },
  {
    icon: <ShoppingBag className="h-10 w-10 text-cs-blue-500" />,
    title: 'Shopping Assistant',
    description: 'Browser extension that helps you make eco-friendly choices while shopping online.',
  },
  {
    icon: <Search className="h-10 w-10 text-cs-green-500" />,
    title: 'Eco-Alternative Finder',
    description: 'Find environmentally friendly alternatives to everyday products with comparative insights.',
  },
  {
    icon: <Award className="h-10 w-10 text-cs-blue-500" />,
    title: 'Gamification System',
    description: 'Earn points, badges, and compete in challenges to make sustainability fun and engaging.',
  },
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="cs-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Comprehensive Carbon Management</h2>
          <p className="text-muted-foreground text-lg">
            Our suite of tools helps you understand and reduce your carbon footprint across both digital and physical activities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="eco-card hover-lift">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
