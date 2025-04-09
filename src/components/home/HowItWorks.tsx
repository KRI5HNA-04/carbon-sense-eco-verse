
import React from 'react';
import { Activity, Lightbulb, BarChart, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: <Activity className="h-8 w-8 text-white" />,
    title: 'Track Your Activities',
    description: 'Input your daily activities, website usage, and purchases to calculate your carbon footprint.',
    color: 'bg-cs-green-500',
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: 'Visualize Your Impact',
    description: 'See detailed breakdowns and analytics of your carbon emissions across different categories.',
    color: 'bg-cs-blue-500',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-white" />,
    title: 'Get Recommendations',
    description: 'Receive personalized suggestions to reduce your environmental impact based on your data.',
    color: 'bg-cs-green-600',
  },
  {
    icon: <ThumbsUp className="h-8 w-8 text-white" />,
    title: 'Improve & Earn Rewards',
    description: 'Implement changes, track your progress, and earn badges and points for your achievements.',
    color: 'bg-cs-blue-600',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="cs-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How CarbonSense Works</h2>
          <p className="text-muted-foreground text-lg">
            Our simple four-step process helps you understand, track, and reduce your carbon footprint.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cs-green-300 via-cs-blue-300 to-cs-green-300 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center z-10 bg-background">
                <div className={`relative ${step.color} p-4 rounded-full mb-6 animate-float`}>
                  {step.icon}
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 bg-muted rounded-full z-[-1]"></div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
