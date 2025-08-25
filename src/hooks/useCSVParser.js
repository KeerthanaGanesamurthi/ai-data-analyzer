import { useCallback } from 'react';
import Papa from 'papaparse';
import { cleanData } from '../utils/dataParser';

export const useCSVParser = () => {
  const parseCSV = useCallback((file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV: ' + results.errors[0].message));
            return;
          }
          
          const cleanedData = cleanData(results.data);
          const columns = results.meta.fields || [];
          
          resolve({ data: cleanedData, columns });
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }, []);

  return { parseCSV };
};