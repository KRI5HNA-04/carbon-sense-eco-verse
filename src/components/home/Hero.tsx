
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Globe, Leaf } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="cs-container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Track & Reduce Your{' '}
              <span className="text-gradient-green">Carbon Footprint</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              CarbonSense helps you understand and minimize your environmental impact through comprehensive tracking and actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/track">Start Tracking <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-cs-green-100 dark:bg-cs-green-800/30 rounded-full">
                  <Leaf className="h-5 w-5 text-cs-green-600 dark:text-cs-green-400" />
                </div>
                <div>
                  <p className="font-medium">Eco-friendly</p>
                  <p className="text-sm text-muted-foreground">Tools for sustainability</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-cs-blue-100 dark:bg-cs-blue-800/30 rounded-full">
                  <Globe className="h-5 w-5 text-cs-blue-600 dark:text-cs-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Global Impact</p>
                  <p className="text-sm text-muted-foreground">See your contribution</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 p-2 bg-cs-green-100 dark:bg-cs-green-800/30 rounded-full">
                  <BarChart2 className="h-5 w-5 text-cs-green-600 dark:text-cs-green-400" />
                </div>
                <div>
                  <p className="font-medium">Data Insights</p>
                  <p className="text-sm text-muted-foreground">Visualize your progress</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cs-green-500/20 to-cs-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card border rounded-3xl shadow-xl overflow-hidden">
                <div className="px-6 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs bg-muted px-2 py-1 rounded-md">Dashboard Preview</div>
                  </div>
                  <div className="relative bg-muted/50 rounded-t-lg p-4">
                    <h3 className="text-center font-semibold mb-4">Your Carbon Footprint</h3>
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray="283"
                            strokeDashoffset="70"
                            className="text-cs-green-500 transform -rotate-90 origin-center"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeOpacity="0.2"
                            className="text-cs-green-200 dark:text-cs-green-800"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl font-bold">75%</span>
                          <span className="text-xs">Reduction</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-background p-3 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Daily Average</p>
                        <p className="font-semibold">4.8 kgCO₂e</p>
                      </div>
                      <div className="bg-background p-3 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">Monthly Total</p>
                        <p className="font-semibold">142 kgCO₂e</p>
                      </div>
                    </div>
                    <div className="bg-background p-3 rounded-md">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">Transport</span>
                        <span className="text-xs font-medium">45%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-cs-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 px-6 pb-6">
                  <div className="h-24 flex items-center justify-center border-t border-border">
                    <p className="text-sm text-muted-foreground text-center">
                      Track daily activities to see your full dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
