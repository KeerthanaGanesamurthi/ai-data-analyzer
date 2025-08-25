export const cleanData = (data) => {
  return data.map(row => {
    const cleanedRow = {};
    
    Object.entries(row).forEach(([key, value]) => {
      // Remove any leading/trailing whitespace from keys and values
      const cleanedKey = key.trim();
      let cleanedValue = value;
      
      if (typeof cleanedValue === 'string') {
        cleanedValue = cleanedValue.trim();
        
        // Try to convert string numbers to actual numbers
        if (!isNaN(cleanedValue) && cleanedValue !== '') {
          cleanedValue = parseFloat(cleanedValue);
        }
        
        // Convert boolean strings to actual booleans
        if (cleanedValue.toLowerCase() === 'true') cleanedValue = true;
        if (cleanedValue.toLowerCase() === 'false') cleanedValue = false;
      }
      
      // Skip empty values
      if (cleanedValue !== '' && cleanedValue !== null && cleanedValue !== undefined) {
        cleanedRow[cleanedKey] = cleanedValue;
      }
    });
    
    return cleanedRow;
  }).filter(row => Object.keys(row).length > 0); // Remove empty rows
};