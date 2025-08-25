// Application configuration constants
export const CONFIG = {
  // CSV parsing options
  CSV: {
    DEFAULT_DELIMITER: ',',
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_TYPES: ['text/csv', 'application/vnd.ms-excel']
  },

  // Visualization options
  VISUALIZATION: {
    DEFAULT_CHART_TYPE: 'bar',
    COLORS: [
      '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
      '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4',
      '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'
    ],
    MAX_DATA_POINTS: 1000
  },

  // AI Service configuration
  AI: {
    MAX_TOKENS: 1000,
    TEMPERATURE: 0.7,
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3
  },

  // Table configuration
  TABLE: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZES: [5, 10, 20, 50, 100],
    MAX_ROWS_FOR_SORT: 10000
  },

  // Application settings
  APP: {
    NAME: 'AI Data Analyzer',
    VERSION: '1.0.0',
    DESCRIPTION: 'A React application for analyzing CSV data with AI-powered insights',
    SUPPORT_EMAIL: 'support@aidataanalyzer.com'
  }
};

// Default Hugging Face model configuration
export const HF_MODELS = {
  DEFAULT: 'microsoft/DialoGPT-large',
  ALTERNATIVES: [
    'facebook/blenderbot-400M-distill',
    'google/flan-t5-base',
    'microsoft/DialoGPT-medium',
    'microsoft/DialoGPT-small'
  ]
};

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB',
  INVALID_FILE_TYPE: 'Please upload a valid CSV file',
  EMPTY_FILE: 'The CSV file appears to be empty',
  PARSE_ERROR: 'Error parsing CSV file. Please check the format',
  AI_SERVICE_ERROR: 'Unable to generate insights at this time. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection and try again'
};

// Success messages
export const SUCCESS_MESSAGES = {
  FILE_UPLOADED: 'File uploaded successfully',
  INSIGHTS_GENERATED: 'AI insights generated successfully'
};

export default CONFIG;