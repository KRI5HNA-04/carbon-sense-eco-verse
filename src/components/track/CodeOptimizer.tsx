
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Code, Cpu } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OptimizationResult {
  score: number;
  suggestions: {
    type: 'warning' | 'tip';
    message: string;
  }[];
  optimizedCode?: string;
}

const CodeOptimizer = () => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  
  // This is a simplified analysis function for demo purposes
  // In a real application, this would involve more sophisticated analysis
  const analyzeCode = () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (!code.trim()) {
        toast({
          title: "No Code Provided",
          description: "Please enter some code to analyze.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        return;
      }
      
      // Simple demo analysis
      const suggestions = [];
      let score = 85; // Base score
      
      // Check for common inefficiencies (simplified examples)
      if (code.includes('for (') && !code.includes('for (let ')) {
        suggestions.push({
          type: 'warning',
          message: 'Consider using more specific loop variable declarations with "let" instead of "var".',
        });
        score -= 5;
      }
      
      if (code.includes('getElementById') || code.includes('querySelector')) {
        suggestions.push({
          type: 'tip',
          message: 'Cache DOM selections outside loops to reduce DOM queries and improve performance.',
        });
        score -= 3;
      }
      
      if (code.includes('console.log')) {
        suggestions.push({
          type: 'warning',
          message: 'Remove console.log statements in production code to reduce unnecessary operations.',
        });
        score -= 2;
      }
      
      if (code.length > 500) {
        suggestions.push({
          type: 'tip',
          message: 'Consider breaking down large functions into smaller, reusable components.',
        });
      }
      
      // Add some default tips if we don't have many suggestions
      if (suggestions.length < 2) {
        suggestions.push({
          type: 'tip',
          message: 'Use modern JavaScript features like async/await for more readable asynchronous code.',
        });
        
        suggestions.push({
          type: 'tip',
          message: 'Consider using memoization for expensive calculations to avoid redundant processing.',
        });
      }
      
      // Generate optimized code (simplified for demo)
      let optimizedCode = code;
      if (code.includes('console.log')) {
        optimizedCode = optimizedCode.replace(/console\.log\([^)]*\);?\n?/g, '');
      }
      
      setResult({
        score,
        suggestions,
        optimizedCode: optimizedCode !== code ? optimizedCode : undefined
      });
      
      toast({
        title: "Analysis Complete",
        description: "Your code has been analyzed for carbon efficiency.",
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Code Optimization Tool</CardTitle>
          <CardDescription>Analyze code efficiency from a carbon perspective</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Paste your code here for carbon efficiency analysis..." 
              className="min-h-[300px] font-mono text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button 
              onClick={analyzeCode} 
              disabled={isAnalyzing} 
              className="w-full"
            >
              {isAnalyzing ? (
                <>Analyzing <Cpu className="ml-2 h-4 w-4 animate-spin" /></>
              ) : (
                <>Analyze Carbon Efficiency <Code className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>Efficiency recommendations and improvements</CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
              <Code className="h-16 w-16 mb-4 opacity-20" />
              <p>Enter your code and click analyze to see carbon efficiency results</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">Efficiency Score</h4>
                  <p className="text-sm text-muted-foreground">Based on resource usage patterns</p>
                </div>
                <div className={`text-2xl font-bold ${
                  result.score >= 80 ? 'text-cs-green-600' : 
                  result.score >= 60 ? 'text-amber-500' : 
                  'text-destructive'
                }`}>
                  {result.score}/100
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Suggestions</h4>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex p-3 bg-muted/40 rounded-md">
                      {suggestion.type === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-cs-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm">{suggestion.message}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {result.optimizedCode && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Optimized Code</h4>
                  <div className="bg-muted/40 p-4 rounded-md">
                    <pre className="text-xs font-mono whitespace-pre-wrap">{result.optimizedCode}</pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeOptimizer;
