import React, { useState } from 'react';
import { generateAIInsights } from '../services/aiService';

const InsightsPanel = ({ data, columns }) => {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateInsights = async () => {
    if (data.length === 0) {
      setError('Please upload data first');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Sample the data to avoid sending too much
      const sampleData = data.length > 100 ? data.slice(0, 100) : data;
      const result = await generateAIInsights(sampleData, columns);
      setInsights(result);
    } catch (err) {
      setError('Failed to generate insights. Please check your API key and try again.');
      console.error('Error generating insights:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="insights-panel">
      <div className="insights-header">
        <h3>AI-Powered Insights</h3>
        <button 
          onClick={handleGenerateInsights} 
          disabled={isLoading || data.length === 0}
          className="generate-btn"
        >
          {isLoading ? 'Generating...' : 'Generate Insights'}
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="insights-content">
        {insights ? (
          <div className="insights-result">
            <h4>Data Analysis:</h4>
            <div className="insights-text">{insights}</div>
          </div>
        ) : (
          <div className="insights-placeholder">
            <div className="placeholder-icon"></div>
            <h4>Get AI-Powered Analysis</h4>
            <p>
              Click the "Generate Insights" button to get an AI analysis of your data, 
              including trends, patterns, and potential correlations.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📈</span>
                <span>Trend identification</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔍</span>
                <span>Pattern recognition</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Statistical insights</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💡</span>
                <span>Actionable recommendations</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;