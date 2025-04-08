
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Code, Cpu, ArrowRight, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { calculateCodeComplexity, estimateExecutionTime } from '@/utils/codeAnalysis';

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
  complexity: {
    original: number;
    optimized: number;
  };
  estimatedRuntime: {
    original: number; // in ms
    optimized: number; // in ms
  };
}

const CodeOptimizer = () => {
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [sampleCode, setSampleCode] = useState('');
  
  // Load sample code examples
  useEffect(() => {
    const inefficientCodeSample = `// Inefficient code example
function findDuplicates(array) {
  let duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      // Unnecessarily comparing all elements
      if (i !== j && array[i] === array[j] && !duplicates.includes(array[i])) {
        duplicates.push(array[i]);
      }
    }
  }
  
  // Excessive DOM operations in loop
  for (let i = 0; i < duplicates.length; i++) {
    console.log("Found duplicate: " + duplicates[i]);
    document.getElementById("results").innerHTML += duplicates[i] + "<br>";
  }
  
  return duplicates;
}

// Test with a large array
const testArray = Array.from({length: 1000}, () => Math.floor(Math.random() * 100));
findDuplicates(testArray);`;

    setSampleCode(inefficientCodeSample);
  }, []);

  // Calculate code metrics (complexity, lines, operations)
  const calculateCodeMetrics = (codeSnippet: string) => {
    if (!codeSnippet.trim()) return null;
    
    const lines = codeSnippet.split('\n').length;
    const characters = codeSnippet.length;
    const operations = estimateOperations(codeSnippet);
    
    // Count specific operations
    const loops = (codeSnippet.match(/for|while|forEach|map|filter|reduce/g) || []).length;
    const conditionals = (codeSnippet.match(/if|else|switch|case|[\s\(]([^=!]|^)=>/g) || []).length;
    const functionCalls = (codeSnippet.match(/\w+\(/g) || []).length;
    const domOperations = (codeSnippet.match(/document|querySelector|getElementById|innerHTML|appendChild|textContent|createElement/g) || []).length;
    
    // Detect inefficient patterns
    const inefficientPatterns = {
      nestedLoops: (codeSnippet.match(/for.*\s+for|while.*\s+while|for.*\s+while|while.*\s+for/gs) || []).length,
      domInLoops: (codeSnippet.match(/(for|while).*\s+(document|querySelector|getElementById)/gs) || []).length,
      longFunctions: codeSnippet.split(/function\s+\w+\(|const\s+\w+\s*=\s*\(|let\s+\w+\s*=\s*\(/).length - 1,
      memoryLeaks: (codeSnippet.match(/new\s+(Array|Object|Map|Set)/g) || []).length,
      redundantOperations: (codeSnippet.match(/console\.log/g) || []).length
    };
    
    // Estimate the computational complexity
    const complexity = calculateCodeComplexity(codeSnippet);
    
    // Estimate runtime
    const estimatedRuntime = estimateExecutionTime(complexity, lines, operations);
    
    return {
      lines,
      characters,
      operations,
      loops,
      conditionals,
      functionCalls,
      domOperations,
      inefficientPatterns,
      complexity,
      estimatedRuntime
    };
  };
  
  // Estimate operations in the code
  const estimateOperations = (codeSnippet: string) => {
    // Base operations
    const operators = (codeSnippet.match(/[+\-*/%=<>!&|^~?:]+/g) || []).length;
    const functionCalls = (codeSnippet.match(/\w+\(/g) || []).length;
    
    // Operations by construct type
    const loops = (codeSnippet.match(/for|while/g) || []).length * 10; // Loops perform multiple operations
    const conditions = (codeSnippet.match(/if|else|switch|case/g) || []).length * 2; // Conditional checks
    const arrayMethods = (codeSnippet.match(/map|filter|reduce|forEach|some|every|find/g) || []).length * 5; // Array methods
    const domOps = (codeSnippet.match(/document|querySelector|getElementById|innerHTML|appendChild|createElement/g) || []).length * 8; // DOM is expensive
    
    // Detect nested loops (much more expensive)
    const nestedLoops = (codeSnippet.match(/for.*\s+for|while.*\s+while|for.*\s+while|while.*\s+for/gs) || []).length * 50;
    
    return operators + functionCalls + loops + conditions + arrayMethods + domOps + nestedLoops;
  };
  
  // Calculate carbon emission based on code metrics
  const calculateCarbonEmission = (metrics: ReturnType<typeof calculateCodeMetrics>) => {
    if (!metrics) return 0;
    
    // Carbon emission factors (in grams CO₂e)
    const baseOperationFactor = 0.0000002; // Base carbon per operation
    const loopFactor = 0.000002; // Loops consume more energy
    const domOperationFactor = 0.000008; // DOM operations are expensive
    const complexityFactor = 0.000005; // Additional factor based on algorithmic complexity
    
    // Calculate emissions from different components
    const baseEmission = metrics.operations * baseOperationFactor;
    const loopEmission = metrics.loops * loopFactor + (metrics.inefficientPatterns.nestedLoops * loopFactor * 10);
    const domEmission = metrics.domOperations * domOperationFactor;
    const complexityEmission = metrics.complexity * complexityFactor;
    
    // Calculate runtime-based emission (longer runtime = more energy)
    const runtimeEmission = metrics.estimatedRuntime * 0.000001;
    
    // Sum all emissions
    return baseEmission + loopEmission + domEmission + complexityEmission + runtimeEmission;
  };
  
  // Generate optimization suggestions based on code analysis
  const generateOptimizationSuggestions = (codeSnippet: string, metrics: ReturnType<typeof calculateCodeMetrics>) => {
    if (!metrics) return [];
    
    const suggestions: OptimizationResult['suggestions'] = [];
    
    // Check for nested loops (O(n²) or worse)
    if (metrics.inefficientPatterns.nestedLoops > 0) {
      suggestions.push({
        type: 'warning',
        message: 'Replace nested loops with more efficient algorithms or data structures to reduce time complexity.',
        impact: 0.005 * metrics.inefficientPatterns.nestedLoops
      });
    }
    
    // Check for DOM operations inside loops
    if (metrics.inefficientPatterns.domInLoops > 0) {
      suggestions.push({
        type: 'warning',
        message: 'Cache DOM queries outside loops and use document fragments for batch updates to reduce energy consumption.',
        impact: 0.008 * metrics.inefficientPatterns.domInLoops
      });
    }
    
    // Check for console.log statements
    if ((codeSnippet.match(/console\.log/g) || []).length > 0) {
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
        message: 'Chain array methods efficiently or use a single reduce() to minimize iterations.',
        impact: 0.003
      });
    }
    
    // Check for redundant recalculations (missing memoization)
    const functionPattern = /function\s+(\w+)\([^)]*\)\s*{[\s\S]*?\1\([^)]*\)/g;
    if (functionPattern.test(codeSnippet)) {
      suggestions.push({
        type: 'tip',
        message: 'Implement memoization for repetitive function calls to avoid redundant calculations.',
        impact: 0.004
      });
    }
    
    // Check for event listeners without removal
    if (codeSnippet.includes('addEventListener') && !codeSnippet.includes('removeEventListener')) {
      suggestions.push({
        type: 'tip',
        message: 'Always remove event listeners to prevent memory leaks and reduce energy consumption.',
        impact: 0.002
      });
    }
    
    // Check for direct DOM manipulation vs. virtual DOM
    if ((codeSnippet.match(/innerHTML|appendChild|insertBefore|removeChild/g) || []).length > 3) {
      suggestions.push({
        type: 'tip',
        message: 'Consider using a virtual DOM approach for multiple DOM updates to batch rendering operations.',
        impact: 0.003
      });
    }
    
    // Check for long variable chains
    if ((codeSnippet.match(/\.\w+\.\w+\.\w+\.\w+/g) || []).length > 0) {
      suggestions.push({
        type: 'tip',
        message: 'Cache deeply nested object properties to improve access time and reduce energy usage.',
        impact: 0.001
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
        message: 'Consider using Web Workers for CPU-intensive tasks to avoid blocking the main thread.',
        impact: 0.002
      });
    }
    
    return suggestions;
  };
  
  // Optimize code based on suggestions
  const optimizeCode = (codeSnippet: string, metrics: ReturnType<typeof calculateCodeMetrics>) => {
    if (!codeSnippet || !metrics) return codeSnippet;
    
    let optimizedCode = codeSnippet;
    
    // Remove console.log statements
    if ((codeSnippet.match(/console\.log\([^)]*\);?/g) || []).length > 0) {
      optimizedCode = optimizedCode.replace(/console\.log\([^)]*\);?\n?/g, '');
    }
    
    // Optimize DOM queries in loops
    if (metrics.inefficientPatterns.domInLoops > 0) {
      // Extract DOM queries to variables before loops
      const domQueries = optimizedCode.match(/document\.querySelector\([^)]+\)|document\.getElementById\([^)]+\)/g) || [];
      const uniqueQueries = [...new Set(domQueries)];
      
      uniqueQueries.forEach((query, index) => {
        // Check if the query is inside a loop
        const queryInLoop = new RegExp(`(for|while)[^{]*{[\\s\\S]*?${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
        if (queryInLoop.test(optimizedCode)) {
          // Add variable at the top and replace in-loop occurrences
          const varName = `el${index}`;
          const declaration = `const ${varName} = ${query};\n`;
          
          // Add the declaration at the beginning of the nearest function scope or global scope
          const funcStartMatch = optimizedCode.match(/function\s+\w+\([^)]*\)\s*{/);
          if (funcStartMatch && funcStartMatch.index !== undefined) {
            const insertPos = funcStartMatch.index + funcStartMatch[0].length;
            optimizedCode = optimizedCode.substring(0, insertPos) + '\n  ' + declaration + optimizedCode.substring(insertPos);
            
            // Replace occurrences within the function
            optimizedCode = optimizedCode.replace(new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), varName);
          }
        }
      });
    }
    
    // Optimize nested loops for finding duplicates
    if (metrics.inefficientPatterns.nestedLoops > 0 && 
        optimizedCode.includes('duplicates') && 
        /for\s*\([^)]+\)\s*{\s*for\s*\([^)]+\)/.test(optimizedCode)) {
      
      // Replace inefficient nested loop duplicate finding with a Set-based approach
      const nestedLoopPattern = /function\s+findDuplicates\s*\(\s*array\s*\)\s*{[\s\S]*?}/;
      const optimizedFunction = `
function findDuplicates(array) {
  // Using Set for O(n) time complexity instead of nested loops
  const seen = new Set();
  const duplicates = [];
  
  for (const item of array) {
    if (seen.has(item)) {
      if (!duplicates.includes(item)) {
        duplicates.push(item);
      }
    } else {
      seen.add(item);
    }
  }
  
  // Batch DOM operations outside the loop
  const output = document.getElementById("results");
  if (output) {
    const fragment = document.createDocumentFragment();
    for (const duplicate of duplicates) {
      console.log("Found duplicate: " + duplicate);
      const div = document.createElement("div");
      div.textContent = duplicate;
      fragment.appendChild(div);
    }
    output.appendChild(fragment);
  }
  
  return duplicates;
}`;
      
      optimizedCode = optimizedCode.replace(nestedLoopPattern, optimizedFunction);
    }
    
    return optimizedCode;
  };
  
  // This function analyzes code and calculates carbon emission
  const analyzeCode = async () => {
    setIsAnalyzing(true);
    
    try {
      // Validate input
      if (!code.trim()) {
        toast({
          title: "No Code Provided",
          description: "Please enter some code to analyze.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        return;
      }
      
      // Calculate metrics for original code
      const originalMetrics = calculateCodeMetrics(code);
      if (!originalMetrics) {
        throw new Error("Failed to analyze code metrics");
      }
      
      // Calculate carbon emission for original code
      const originalEmission = calculateCarbonEmission(originalMetrics);
      
      // Generate optimization suggestions
      const suggestions = generateOptimizationSuggestions(code, originalMetrics);
      
      // Generate optimized code
      const optimizedCode = optimizeCode(code, originalMetrics);
      
      // Calculate metrics for optimized code
      const optimizedMetrics = calculateCodeMetrics(optimizedCode);
      if (!optimizedMetrics) {
        throw new Error("Failed to analyze optimized code metrics");
      }
      
      // Calculate carbon emission for optimized code
      const optimizedEmission = calculateCarbonEmission(optimizedMetrics);
      
      // Calculate savings
      const savings = originalEmission - optimizedEmission;
      
      // Calculate execution time improvement
      const executionTimeImprovement = 
        (originalMetrics.estimatedRuntime - optimizedMetrics.estimatedRuntime) / 
        originalMetrics.estimatedRuntime * 100;
      
      setResult({
        originalEmission,
        optimizedEmission,
        savings,
        suggestions,
        optimizedCode,
        executionTimeImprovement,
        complexity: {
          original: originalMetrics.complexity,
          optimized: optimizedMetrics.complexity
        },
        estimatedRuntime: {
          original: originalMetrics.estimatedRuntime,
          optimized: optimizedMetrics.estimatedRuntime
        }
      });
      
      toast({
        title: "Analysis Complete",
        description: `Your code could save ${savings.toFixed(6)}g CO₂e with optimizations.`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your code. Please try again with valid JavaScript code.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const useSampleCode = () => {
    setCode(sampleCode);
  };
  
  const copyOptimizedCode = () => {
    if (result?.optimizedCode) {
      navigator.clipboard.writeText(result.optimizedCode);
      toast({
        title: "Code Copied",
        description: "Optimized code has been copied to clipboard",
      });
    }
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
            <div className="flex gap-2">
              <Button 
                onClick={analyzeCode} 
                disabled={isAnalyzing} 
                className="flex-1"
              >
                {isAnalyzing ? (
                  <>Analyzing <Cpu className="ml-2 h-4 w-4 animate-spin" /></>
                ) : (
                  <>Analyze Carbon Efficiency <Code className="ml-2 h-4 w-4" /></>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={useSampleCode}
                className="whitespace-nowrap"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Load Sample
              </Button>
            </div>
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
                    <span className="font-mono text-sm">{result.originalEmission.toFixed(8)}g CO₂e</span>
                  </div>
                  <div className="flex items-center space-x-2 text-cs-green-600">
                    <span className="text-muted-foreground text-sm">Optimized:</span>
                    <span className="font-mono text-sm font-medium">{result.optimizedEmission.toFixed(8)}g CO₂e</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Carbon Reduction</span>
                    <span className="text-sm font-medium text-cs-green-600">
                      {(result.savings / result.originalEmission * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(result.savings / result.originalEmission) * 100} />
                  <p className="text-xs mt-2 text-muted-foreground">
                    Saving {result.savings.toFixed(8)}g CO₂e per execution
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Runtime Improvement</span>
                    <span className="text-sm font-medium text-cs-green-600">
                      {result.executionTimeImprovement?.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={(result.executionTimeImprovement || 0)} />
                  <p className="text-xs mt-2 text-muted-foreground">
                    {result.estimatedRuntime.original.toFixed(2)}ms → {result.estimatedRuntime.optimized.toFixed(2)}ms
                  </p>
                </div>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-cs-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Algorithmic Complexity</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm px-3">
                  <span>Original: {result.complexity.original.toFixed(1)}</span>
                  <span>Optimized: {result.complexity.optimized.toFixed(1)}</span>
                </div>
                <p className="text-xs mt-2 text-muted-foreground px-3">
                  Lower complexity means more efficient algorithms and less energy use
                </p>
              </div>
              
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3 w-full"
                    onClick={copyOptimizedCode}
                  >
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
