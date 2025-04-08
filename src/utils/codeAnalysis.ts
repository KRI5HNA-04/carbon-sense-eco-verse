
/**
 * Utility functions for code analysis and carbon footprint estimation
 */

/**
 * Calculate code complexity based on various factors
 * Higher number = more complex code = higher energy usage
 */
export function calculateCodeComplexity(code: string): number {
  // Start with base complexity
  let complexity = 1.0;
  
  // Count control structures and add to complexity
  const loops = (code.match(/for|while|do\s+{/g) || []).length;
  const recursion = (code.match(/function\s+\w+\([^)]*\)[^{]*{[\s\S]*?\1\s*\(/g) || []).length;
  const conditionals = (code.match(/if|else|switch|case|[^=!]=>/g) || []).length;
  
  // Add complexity for each control structure
  complexity += loops * 1.5;
  complexity += recursion * 3.0; // Recursion is more complex
  complexity += conditionals * 0.8;
  
  // Check for nested loops (O(n²) or worse)
  const nestedLoops = (code.match(/for.*\s+for|while.*\s+while|for.*\s+while|while.*\s+for/gs) || []).length;
  complexity += nestedLoops * 5.0;
  
  // Check for expensive operations
  const domOperations = (code.match(/document|querySelector|getElementById|innerHTML|appendChild/g) || []).length;
  const networkCalls = (code.match(/fetch|XMLHttpRequest|axios|ajax/g) || []).length;
  const regexOps = (code.match(/new RegExp|\/.*\/[gimuy]*/g) || []).length;
  
  complexity += domOperations * 0.7;
  complexity += networkCalls * 2.0;
  complexity += regexOps * 0.8;
  
  // Analyze algorithm patterns
  if (
    code.includes('sort') && 
    !code.includes('quicksort') && 
    !code.includes('mergesort') &&
    (code.match(/for.*\s+for/g) || []).length > 0
  ) {
    // Likely using a naive sort algorithm
    complexity += 3.0;
  }
  
  // Check for memory-intensive operations
  const arrayCreations = (code.match(/new Array|Array\(|Array\.from|\[\]/g) || []).length;
  const objectCreations = (code.match(/new Object|\{\}/g) || []).length;
  const stringManipulations = (code.match(/\+\s*"|'\s*\+|`.*\${/g) || []).length;
  
  complexity += (arrayCreations + objectCreations) * 0.3;
  complexity += stringManipulations * 0.2;
  
  return complexity;
}

/**
 * Estimate execution time based on code metrics
 * @returns Estimated time in milliseconds
 */
export function estimateExecutionTime(
  complexity: number, 
  lines: number, 
  operations: number
): number {
  // Basic calculation - these are just estimates
  const baseTime = 0.01; // Base execution time in ms
  const timePerLine = 0.005; // Time per line of code
  const timePerOperation = 0.001; // Time per operation
  const complexityFactor = 0.5; // Multiplier for complexity
  
  // Calculate estimated time
  return baseTime + 
         (lines * timePerLine) + 
         (operations * timePerOperation) + 
         (complexity * complexityFactor);
}

/**
 * Convert estimated energy usage to carbon emissions
 * @param energyUsage Energy in joules
 * @returns Carbon emissions in grams of CO2
 */
export function energyToCarbonEmissions(energyUsage: number): number {
  // Average carbon intensity of electricity (gCO2/kWh)
  const carbonIntensity = 475;
  
  // Convert joules to kWh
  const kWh = energyUsage / 3600000;
  
  // Calculate carbon emissions in grams
  return kWh * carbonIntensity;
}
