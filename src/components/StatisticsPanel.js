import React from 'react';
import { calculateStatistics } from '../utils/statistics';

const StatisticsPanel = ({ data, columns }) => {
  if (!data.length || !columns.length) {
    return (
      <div className="statistics-panel">
        <h3>Statistics</h3>
        <div className="no-stats">Upload data to see statistics</div>
      </div>
    );
  }

  const numericColumns = columns.filter(column => {
    return data.some(row => !isNaN(parseFloat(row[column])) && isFinite(row[column]));
  });

  const stats = calculateStatistics(data, numericColumns);

  return (
    <div className="statistics-panel">
      <h3>Statistics Summary</h3>
      <div className="stats-container">
        {numericColumns.length > 0 ? (
          numericColumns.map(column => (
            <div key={column} className="stat-card">
              <h4>{column}</h4>
              <div className="stat-values">
                <div className="stat-row">
                  <span className="stat-label">Count:</span>
                  <span className="stat-value">{stats[column]?.count || 0}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Mean:</span>
                  <span className="stat-value">{stats[column]?.mean?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Median:</span>
                  <span className="stat-value">{stats[column]?.median?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Min:</span>
                  <span className="stat-value">{stats[column]?.min?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Max:</span>
                  <span className="stat-value">{stats[column]?.max?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Std Dev:</span>
                  <span className="stat-value">{stats[column]?.stdDev?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-numeric">No numeric columns found for statistical analysis</div>
        )}
      </div>
    </div>
  );
};

export default StatisticsPanel;