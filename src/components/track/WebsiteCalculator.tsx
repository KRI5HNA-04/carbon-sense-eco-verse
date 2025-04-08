
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, ArrowRight, CheckCircle2, AlertTriangle, FileCode, Cloud, Zap } from 'lucide-react';

const WebsiteCalculator = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    emissions: number;
    energy: number;
    dataTransfer: number;
    cleaner: number;
  }>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result data
      setResult({
        emissions: 0.83,
        energy: 1.65,
        dataTransfer: 2.4,
        cleaner: 76,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Website Carbon Calculator</CardTitle>
          <Globe className="h-5 w-5 text-cs-blue-500" />
        </div>
        <CardDescription>
          Analyze a website to estimate its carbon footprint and get optimization suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="Enter website URL"
                className="pl-10"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isAnalyzing}>
              {isAnalyzing ? 'Analyzing...' : 'Calculate'}
            </Button>
          </div>
        </form>

        {result && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-muted/40 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Zap className="h-4 w-4 text-cs-green-500 mr-2" />
                  <h4 className="font-medium text-sm">CO₂ Per Visit</h4>
                </div>
                <p className="text-2xl font-bold">{result.emissions}g</p>
                <p className="text-xs text-muted-foreground">of CO₂ equivalent</p>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Cloud className="h-4 w-4 text-cs-blue-500 mr-2" />
                  <h4 className="font-medium text-sm">Data Transfer</h4>
                </div>
                <p className="text-2xl font-bold">{result.dataTransfer}MB</p>
                <p className="text-xs text-muted-foreground">per page view</p>
              </div>
              
              <div className="bg-muted/40 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FileCode className="h-4 w-4 text-cs-green-500 mr-2" />
                  <h4 className="font-medium text-sm">Energy Usage</h4>
                </div>
                <p className="text-2xl font-bold">{result.energy}Wh</p>
                <p className="text-xs text-muted-foreground">per page view</p>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-3">Performance Analysis</h3>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Cleaner than {result.cleaner}% of websites tested</p>
                  <span className={result.cleaner > 70 ? "text-cs-green-500 text-sm" : "text-amber-500 text-sm"}>
                    {result.cleaner > 70 ? "Good" : "Needs Improvement"}
                  </span>
                </div>
                <div className="w-full bg-muted-foreground/20 h-2 rounded-full">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-cs-green-500 to-cs-blue-400" 
                    style={{ width: `${result.cleaner}%` }}
                  ></div>
                </div>
              </div>
              
              <h3 className="font-medium mt-4 mb-2">Optimization Opportunities</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-cs-green-500 mt-0.5 mr-2" />
                  <span className="text-sm">Compress images to reduce page size</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                  <span className="text-sm">Reduce JavaScript bundle size</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2" />
                  <span className="text-sm">Implement lazy loading for below-the-fold content</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter className="flex justify-end border-t pt-4">
          <Button variant="outline" size="sm">
            View Detailed Report <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default WebsiteCalculator;
