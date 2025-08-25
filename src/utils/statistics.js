export const calculateStatistics = (data, columns) => {
  const stats = {};
  
  columns.forEach(column => {
    const values = data
      .map(row => parseFloat(row[column]))
      .filter(value => !isNaN(value));
    
    if (values.length === 0) {
      stats[column] = null;
      return;
    }
    
    // Basic statistics
    const count = values.length;
    const sum = values.reduce((a, b) => a + b, 0);
    const mean = sum / count;
    
    // Median
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 
      ? sorted[mid] 
      : (sorted[mid - 1] + sorted[mid]) / 2;
    
    // Min and Max
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Standard deviation
    const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
    const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / count;
    const stdDev = Math.sqrt(avgSquaredDiff);
    
    stats[column] = {
      count,
      mean,
      median,
      min,
      max,
      stdDev,
      range: max - min
    };
  });
  
  return stats;
};