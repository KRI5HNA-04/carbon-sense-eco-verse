
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Code, Cpu, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface OptimizationResult {
  originalEmission: number;
  optimizedEmission: number;
  savings: number;
  suggestions: {
    type: 'warning' | 'tip';
    message: string;
    impact: number; // Carbon impact in grams
  }[];
  optimizedCode?: string;
  executionTimeImprovement?: number;
}

const CodeOptimizer = () => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  
  // This function analyzes code and calculates carbon emission
  const analyzeCode = async () => {
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
      
      // Calculate code metrics
      const codeMetrics = calculateCodeMetrics(code);
      
      // Calculate carbon emission based on metrics
      const originalEmission = calculateCarbonEmission(codeMetrics);
      
      // Generate optimization suggestions
      const suggestions = generateOptimizationSuggestions(code, codeMetrics);
      
      // Generate optimized code
      const optimizedCode = optimizeCode(code, suggestions);
      
      // Calculate optimized metrics
      const optimizedMetrics = calculateCodeMetrics(optimizedCode);
      
      // Calculate optimized emission
      const optimizedEmission = calculateCarbonEmission(optimizedMetrics);
      
      // Calculate savings
      const savings = originalEmission - optimizedEmission;
      
      // Calculate execution time improvement (estimated)
      const executionTimeImprovement = estimateExecutionTimeImprovement(codeMetrics, optimizedMetrics);
      
      setResult({
        originalEmission,
        optimizedEmission,
        savings,
        suggestions,
        optimizedCode,
        executionTimeImprovement
      });
      
      toast({
        title: "Analysis Complete",
        description: `Your code could save ${savings.toFixed(2)}g CO₂e with optimizations.`,
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };
  
  // Calculate code metrics (complexity, lines, operations)
  const calculateCodeMetrics = (codeSnippet: string) => {
    const lines = codeSnippet.split('\n').length;
    const characters = codeSnippet.length;
    const operations = estimateOperations(codeSnippet);
    const loops = (codeSnippet.match(/for|while|forEach|map|filter|reduce/g) || []).length;
    const conditionals = (codeSnippet.match(/if|else|switch|case|ternary/g) || []).length;
    const functionCalls = (codeSnippet.match(/\w+\(/g) || []).length;
    const domOperations = (codeSnippet.match(/document|querySelector|getElementById|innerHTML|appendChild/g) || []).length;
    
    return {
      lines,
      characters,
      operations,
      loops,
      conditionals,
      functionCalls,
      domOperations
    };
  };
  
  // Estimate operations in the code
  const estimateOperations = (codeSnippet: string) => {
    // Count operators as a proxy for operations
    const operators = (codeSnippet.match(/[+\-*/%=<>!&|^~?:]+/g) || []).length;
    const functionCalls = (codeSnippet.match(/\w+\(/g) || []).length;
    const loops = (codeSnippet.match(/for|while/g) || []).length * 10; // Loops perform multiple operations
    
    return operators + functionCalls + loops;
  };
  
  // Calculate carbon emission based on code metrics
  const calculateCarbonEmission = (metrics: ReturnType<typeof calculateCodeMetrics>) => {
    // Carbon emission factors (in grams CO₂e)
    const factorPerOperation = 0.000002; // Base factor per operation
    const factorPerLoop = 0.00002; // Loops consume more energy
    const factorPerDomOperation = 0.00004; // DOM operations are expensive
    
    // Calculate total emission
    const baseEmission = metrics.operations * factorPerOperation;
    const loopEmission = metrics.loops * factorPerLoop;
    const domEmission = metrics.domOperations * factorPerDomOperation;
    
    return baseEmission + loopEmission + domEmission;
  };
  
  // Generate optimization suggestions based on code analysis
  const generateOptimizationSuggestions = (codeSnippet: string, metrics: ReturnType<typeof calculateCodeMetrics>) => {
    const suggestions: OptimizationResult['suggestions'] = [];
    
    // Check for inefficient loops
    if (codeSnippet.includes('for (') && !codeSnippet.includes('for (let ')) {
      suggestions.push({
        type: 'warning',
        message: 'Use modern loop syntax (for...of, for...in) instead of traditional for loops when possible.',
        impact: 0.002 * metrics.loops
      });
    }
    
    // Check for DOM operations inside loops
    if ((codeSnippet.match(/for.*querySelector|for.*getElementById/s) || []).length > 0) {
      suggestions.push({
        type: 'warning',
        message: 'Cache DOM queries outside loops to reduce redundant operations and energy consumption.',
        impact: 0.005 * metrics.domOperations
      });
    }
    
    // Check for console.log statements
    if (codeSnippet.includes('console.log')) {
      suggestions.push({
        type: 'warning',
        message: 'Remove console.log statements in production code to reduce unnecessary operations.',
        impact: 0.0005 * (codeSnippet.match(/console\.log/g) || []).length
      });
    }
    
    // Check for inefficient array methods
    if (codeSnippet.includes('.forEach') && (codeSnippet.includes('.filter') || codeSnippet.includes('.map'))) {
      suggestions.push({
        type: 'warning',
        message: 'Consider chaining array methods instead of nesting them to reduce iterations.',
        impact: 0.003
      });
    }
    
    // Check for large objects or arrays
    const largeDataStructures = (codeSnippet.match(/\[.*\]/s) || []).join('').length > 500 || 
                               (codeSnippet.match(/\{.*\}/s) || []).join('').length > 500;
    if (largeDataStructures) {
      suggestions.push({
        type: 'tip',
        message: 'Consider pagination or virtual scrolling for large data structures to reduce memory usage.',
        impact: 0.004
      });
    }
    
    // Check for event listeners without removal
    if (codeSnippet.includes('addEventListener') && !codeSnippet.includes('removeEventListener')) {
      suggestions.push({
        type: 'tip',
        message: 'Remember to remove event listeners to prevent memory leaks and reduce energy consumption.',
        impact: 0.002
      });
    }
    
    // Add more tips if we don't have enough
    if (suggestions.length < 3) {
      suggestions.push({
        type: 'tip',
        message: 'Use requestAnimationFrame for animations instead of setInterval for better performance and energy efficiency.',
        impact: 0.001
      });
      
      suggestions.push({
        type: 'tip',
        message: 'Consider using Web Workers for CPU-intensive tasks to avoid blocking the main thread and improve energy efficiency.',
        impact: 0.002
      });
      
      suggestions.push({
        type: 'tip',
        message: 'Implement memoization for expensive calculations to reduce redundant processing and save energy.',
        impact: 0.003
      });
    }
    
    return suggestions;
  };
  
  // Optimize code based on suggestions
  const optimizeCode = (codeSnippet: string, suggestions: OptimizationResult['suggestions']) => {
    let optimizedCode = codeSnippet;
    
    // Remove console.log statements
    if (codeSnippet.includes('console.log')) {
      optimizedCode = optimizedCode.replace(/console\.log\([^)]*\);?\n?/g, '');
    }
    
    // Optimize DOM queries in loops
    if ((codeSnippet.match(/for.*querySelector|for.*getElementById/s) || []).length > 0) {
      // Extract DOM queries and hoist them
      const domQueries = codeSnippet.match(/document\.querySelector\([^)]+\)|document\.getElementById\([^)]+\)/g) || [];
      if (domQueries.length > 0) {
        const uniqueQueries = [...new Set(domQueries)];
        const variableDeclarations = uniqueQueries.map((query, index) => `const el${index} = ${query};`).join('\n');
        
        // Simple replacement - actual implementation would be more sophisticated
        let modifiedCode = variableDeclarations + '\n\n';
        optimizedCode = modifiedCode + optimizedCode;
        
        // Replace occurrences in the code
        uniqueQueries.forEach((query, index) => {
          optimizedCode = optimizedCode.replace(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `el${index}`);
        });
      }
    }
    
    // Optimize for loops
    if (codeSnippet.includes('for (') && !codeSnippet.includes('for (let ')) {
      optimizedCode = optimizedCode.replace(/for \(var /g, 'for (let ');
    }
    
    return optimizedCode;
  };
  
  // Estimate execution time improvement
  const estimateExecutionTimeImprovement = (
    originalMetrics: ReturnType<typeof calculateCodeMetrics>, 
    optimizedMetrics: ReturnType<typeof calculateCodeMetrics>
  ) => {
    // This is a simplified model
    const originalComplexity = originalMetrics.operations + 
                              (originalMetrics.loops * 5) + 
                              (originalMetrics.domOperations * 10);
                              
    const optimizedComplexity = optimizedMetrics.operations + 
                               (optimizedMetrics.loops * 5) + 
                               (optimizedMetrics.domOperations * 10);
    
    if (originalComplexity <= optimizedComplexity) return 0;
    
    // Calculate percentage improvement
    return ((originalComplexity - optimizedComplexity) / originalComplexity) * 100;
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
              placeholder="Paste your JavaScript or TypeScript code here for carbon efficiency analysis..." 
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
                  <h4 className="text-lg font-medium">Carbon Impact</h4>
                  <p className="text-sm text-muted-foreground">Estimated CO₂ emissions</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-muted-foreground text-sm">Original:</span>
                    <span className="font-mono text-sm">{result.originalEmission.toFixed(6)}g CO₂e</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cs-green-600">
                    <span className="text-muted-foreground text-sm">Optimized:</span>
                    <span className="font-mono text-sm font-medium">{result.optimizedEmission.toFixed(6)}g CO₂e</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Carbon Reduction</span>
                  <span className="text-sm font-medium text-cs-green-600">{(result.savings / result.originalEmission * 100).toFixed(1)}%</span>
                </div>
                <Progress value={(result.savings / result.originalEmission) * 100} />
                <p className="text-xs mt-2 text-muted-foreground">
                  Potential saving of {result.savings.toFixed(6)}g CO₂e per execution
                </p>
              </div>
              
              {result.executionTimeImprovement > 0 && (
                <div className="p-3 bg-muted/50 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-cs-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium">Execution Speed</p>
                      <p className="text-xs text-muted-foreground">
                        Estimated {result.executionTimeImprovement.toFixed(1)}% faster runtime
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-medium mb-3">Optimization Suggestions</h4>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex p-3 bg-muted/40 rounded-md">
                      {suggestion.type === 'warning' ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-cs-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm">{suggestion.message}</p>
                        <p className="text-xs text-cs-green-600 mt-1">
                          Potential impact: {suggestion.impact.toFixed(6)}g CO₂e reduction
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {result.optimizedCode && (
                <div>
                  <h4 className="text-lg font-medium mb-3">Optimized Code</h4>
                  <div className="bg-muted/40 p-4 rounded-md">
                    <pre className="text-xs font-mono whitespace-pre-wrap overflow-auto max-h-[200px]">{result.optimizedCode}</pre>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    <span>Copy Optimized Code</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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
