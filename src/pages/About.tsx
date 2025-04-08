
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Heart, Users, LightbulbOff, BarChart2, Leaf } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="cs-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient-green">CarbonSense</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Empowering individuals and businesses to understand and reduce their carbon footprint
              through comprehensive tracking and actionable insights.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-16 md:py-20">
        <div className="cs-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                At CarbonSense, we believe that meaningful climate action starts with awareness.
                Our mission is to make carbon footprint tracking accessible, engaging, and
                actionable for everyone.
              </p>
              <p className="text-lg mb-6">
                By providing comprehensive tools to measure both digital and physical carbon
                emissions, we empower our users to make informed decisions that reduce their
                environmental impact.
              </p>
              <div className="flex items-center mt-8">
                <div className="h-12 w-12 bg-cs-green-100 dark:bg-cs-green-800/30 rounded-full flex items-center justify-center mr-4">
                  <Leaf className="h-6 w-6 text-cs-green-600 dark:text-cs-green-400" />
                </div>
                <div>
                  <p className="font-medium">Carbon Neutral Commitment</p>
                  <p className="text-sm text-muted-foreground">Our platform is built and hosted with sustainability in mind</p>
                </div>
              </div>
            </div>
            <div className="bg-muted p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <Card className="eco-card p-6">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-cs-green-100 dark:bg-cs-green-800/30 rounded-full flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-cs-green-600 dark:text-cs-green-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Environmental Impact</h3>
                    <p className="text-sm text-muted-foreground">Helping reduce global carbon emissions</p>
                  </CardContent>
                </Card>
                <Card className="eco-card p-6">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-cs-blue-100 dark:bg-cs-blue-800/30 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-cs-blue-600 dark:text-cs-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Community Driven</h3>
                    <p className="text-sm text-muted-foreground">Building a network of eco-conscious individuals</p>
                  </CardContent>
                </Card>
                <Card className="eco-card p-6">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-cs-blue-100 dark:bg-cs-blue-800/30 rounded-full flex items-center justify-center mb-4">
                      <LightbulbOff className="h-6 w-6 text-cs-blue-600 dark:text-cs-blue-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Education</h3>
                    <p className="text-sm text-muted-foreground">Raising awareness about carbon footprints</p>
                  </CardContent>
                </Card>
                <Card className="eco-card p-6">
                  <CardContent className="p-0 flex flex-col items-center text-center">
                    <div className="h-12 w-12 bg-cs-green-100 dark:bg-cs-green-800/30 rounded-full flex items-center justify-center mb-4">
                      <BarChart2 className="h-6 w-6 text-cs-green-600 dark:text-cs-green-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Data Driven</h3>
                    <p className="text-sm text-muted-foreground">Science-based approach to carbon tracking</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 md:py-20 bg-muted">
        <div className="cs-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-8">
              CarbonSense was founded by a team of environmentalists, data scientists, and software
              engineers who shared a common vision: to make carbon footprint tracking accessible to everyone.
            </p>
            <p className="text-lg mb-8">
              What started as a simple website carbon calculator has evolved into a comprehensive suite
              of tools designed to help individuals and businesses understand and reduce their
              environmental impact.
            </p>
            <div className="bg-card border rounded-xl p-8 mt-12">
              <h3 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h3>
              <p className="mb-6">
                Together, we can build a more sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/track">Start Tracking <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16 md:py-20">
        <div className="cs-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block p-2 bg-muted rounded-full mb-6">
              <Heart className="h-6 w-6 text-cs-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-6">Thank You</h2>
            <p className="text-lg mb-8">
              We appreciate your interest in CarbonSense. Together, we can make
              a significant impact on our planet's future.
            </p>
            <p className="text-muted-foreground">
              If you have any questions or suggestions, please don't hesitate to reach out.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
