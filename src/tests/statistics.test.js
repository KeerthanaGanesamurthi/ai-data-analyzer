import {
  calculateStats,
  calculatePercentile,
  calculateCorrelation,
  detectOutliers,
  calculateFrequency
} from '../utils/statistics';

describe('Statistics Utilities', () => {
  const testData = [
    { name: 'John', age: 30, salary: 50000, department: 'Engineering' },
    { name: 'Jane', age: 25, salary: 60000, department: 'Marketing' },
    { name: 'Bob', age: 35, salary: 55000, department: 'Engineering' },
    { name: 'Alice', age: 28, salary: 70000, department: 'Marketing' },
    { name: 'Charlie', age: 40, salary: 80000, department: 'Sales' },
    { name: 'Diana', age: 22, salary: 45000, department: 'Engineering' },
    { name: 'Eve', age: 45, salary: 90000, department: 'Sales' },
    { name: 'Frank', age: 33, salary: 52000, department: 'Engineering' },
    { name: 'Grace', age: 29, salary: 58000, department: 'Marketing' },
    { name: 'Henry', age: 50, salary: 95000, department: 'Sales' }
  ];

  describe('calculateStats', () => {
    test('returns empty object for empty data', () => {
      expect(calculateStats([])).toEqual({});
    });

    test('calculates correct statistics for numeric columns', () => {
      const stats = calculateStats(testData);
      
      expect(stats.age).toBeDefined();
      expect(stats.salary).toBeDefined();
      expect(stats.name).toBeUndefined(); // Non-numeric column
      
      // Test age statistics
      expect(stats.age.count).toBe(10);
      expect(stats.age.mean).toBeCloseTo(33.7);
      expect(stats.age.median).toBe(31.5);
      expect(stats.age.min).toBe(22);
      expect(stats.age.max).toBe(50);
      expect(stats.age.stdDev).toBeCloseTo(8.77, 1);
      
      // Test salary statistics
      expect(stats.salary.count).toBe(10);
      expect(stats.salary.mean).toBe(65000);
      expect(stats.salary.median).toBe(56500);
      expect(stats.salary.min).toBe(45000);
      expect(stats.salary.max).toBe(95000);
    });

    test('handles data with missing values', () => {
      const incompleteData = [
        { age: 30, salary: 50000 },
        { age: 25 }, // Missing salary
        { age: 35, salary: 55000 },
        { salary: 70000 } // Missing age
      ];
      
      const stats = calculateStats(incompleteData);
      
      expect(stats.age.count).toBe(3);
      expect(stats.salary.count).toBe(3);
    });
  });

  describe('calculatePercentile', () => {
    const sortedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    test('calculates median (50th percentile)', () => {
      expect(calculatePercentile(sortedValues, 50)).toBe(5.5);
    });
    
    test('calculates first quartile (25th percentile)', () => {
      expect(calculatePercentile(sortedValues, 25)).toBe(3.25);
    });
    
    test('calculates third quartile (75th percentile)', () => {
      expect(calculatePercentile(sortedValues, 75)).toBe(7.75);
    });
    
    test('returns null for empty array', () => {
      expect(calculatePercentile([], 50)).toBeNull();
    });
  });

  describe('calculateCorrelation', () => {
    test('calculates perfect positive correlation', () => {
      const perfectData = [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 4 },
        { x: 5, y: 5 }
      ];
      
      expect(calculateCorrelation(perfectData, 'x', 'y')).toBeCloseTo(1, 5);
    });
    
    test('calculates perfect negative correlation', () => {
      const perfectData = [
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 3 },
        { x: 4, y: 2 },
        { x: 5, y: 1 }
      ];
      
      expect(calculateCorrelation(perfectData, 'x', 'y')).toBeCloseTo(-1, 5);
    });
    
    test('calculates no correlation', () => {
      const noCorrelationData = [
        { x: 1, y: 1 },
        { x: 2, y: 5 },
        { x: 3, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 3 }
      ];
      
      const correlation = calculateCorrelation(noCorrelationData, 'x', 'y');
      expect(Math.abs(correlation)).toBeLessThan(0.5);
    });
    
    test('returns null for insufficient data', () => {
      expect(calculateCorrelation([{ x: 1, y: 1 }], 'x', 'y')).toBeNull();
    });
    
    test('returns null when denominator is zero', () => {
      const zeroVarianceData = [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 }
      ];
      
      expect(calculateCorrelation(zeroVarianceData, 'x', 'y')).toBeNull();
    });
  });

  describe('detectOutliers', () => {
    test('detects outliers in data', () => {
      const dataWithOutliers = [
        { value: 10 },
        { value: 12 },
        { value: 11 },
        { value: 13 },
        { value: 10 },
        { value: 50 }, // Outlier
        { value: 9 },
        { value: 100 } // Outlier
      ];
      
      const outliers = detectOutliers(dataWithOutliers, 'value');
      expect(outliers).toEqual([50, 100]);
    });
    
    test('returns empty array for data with no outliers', () => {
      const dataWithoutOutliers = [
        { value: 10 },
        { value: 12 },
        { value: 11 },
        { value: 13 },
        { value: 10 },
        { value: 9 }
      ];
      
      const outliers = detectOutliers(dataWithoutOutliers, 'value');
      expect(outliers).toEqual([]);
    });
    
    test('returns empty array for insufficient data', () => {
      const insufficientData = [
        { value: 10 },
        { value: 12 },
        { value: 11 }
      ];
      
      const outliers = detectOutliers(insufficientData, 'value');
      expect(outliers).toEqual([]);
    });
  });

  describe('calculateFrequency', () => {
    test('calculates frequency distribution', () => {
      const frequency = calculateFrequency(testData, 'department');
      
      expect(frequency).toEqual([
        { value: 'Engineering', count: 4 },
        { value: 'Marketing', count: 3 },
        { value: 'Sales', count: 3 }
      ]);
    });
    
    test('handles empty values', () => {
      const dataWithEmpty = [
        { department: 'Engineering' },
        { department: '' },
        { department: 'Marketing' },
        { department: null },
        { department: 'Engineering' }
      ];
      
      const frequency = calculateFrequency(dataWithEmpty, 'department');
      
      expect(frequency).toEqual([
        { value: 'Engineering', count: 2 },
        { value: 'Marketing', count: 1 }
      ]);
    });
    
    test('returns empty array for non-existent column', () => {
      const frequency = calculateFrequency(testData, 'nonExistentColumn');
      expect(frequency).toEqual([]);
    });
  });
});