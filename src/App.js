import React, { useState } from 'react';
import FileUploader from './components/FileUploader';
import DataTable from './components/DataTable';
import StatisticsPanel from './components/StatisticsPanel';
import VisualizationHub from './components/VisualizationHub';
import InsightsPanel from './components/InsightsPanel';

function App() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('table');

  const handleDataLoaded = (parsedData, parsedColumns) => {
    setData(parsedData);
    setColumns(parsedColumns);
  };

  const renderContent = () => {
    if (data.length === 0) {
      return (
        <div className="welcome-screen">
          <div className="welcome-content">
            <div className="logo-emoji">📊</div>
            <h2>Welcome to AI Data Analyzer</h2>
            <p>Upload a CSV file to begin analyzing your data with AI-powered insights</p>
            <FileUploader onDataLoaded={handleDataLoaded} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </div>
      );
    }

    return (
      <div className="analyzer-container">
        <div className="sidebar">
          <FileUploader onDataLoaded={handleDataLoaded} isLoading={isLoading} setIsLoading={setIsLoading} />
          <StatisticsPanel data={data} columns={columns} />
        </div>
        
        <div className="main-content">
          <div className="tabs">
            <button 
              className={activeTab === 'table' ? 'active' : ''} 
              onClick={() => setActiveTab('table')}
            >
              Data Table
            </button>
            <button 
              className={activeTab === 'visualization' ? 'active' : ''} 
              onClick={() => setActiveTab('visualization')}
            >
              Visualizations
            </button>
            <button 
              className={activeTab === 'insights' ? 'active' : ''} 
              onClick={() => setActiveTab('insights')}
            >
              AI Insights
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'table' && <DataTable data={data} columns={columns} />}
            {activeTab === 'visualization' && <VisualizationHub data={data} columns={columns} />}
            {activeTab === 'insights' && <InsightsPanel data={data} columns={columns} />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1><span className="header-emoji">📊</span> AI Data Analyzer</h1>
      </header>
      {renderContent()}
    </div>
  );
}

export default App;