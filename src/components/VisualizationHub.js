import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

const VisualizationHub = ({ data, columns }) => {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  const numericColumns = columns.filter(column => {
    return data.some(row => !isNaN(parseFloat(row[column])) && isFinite(row[column]));
  });

  const categoricalColumns = columns.filter(column => 
    !numericColumns.includes(column)
  );

  // Prepare data for charts
  const chartData = data.map(item => {
    const newItem = { ...item };
    numericColumns.forEach(col => {
      newItem[col] = parseFloat(newItem[col]);
    });
    return newItem;
  });

  // For pie chart, we need to aggregate data
  const getPieData = () => {
    if (!xAxis || !yAxis) return [];
    
    const aggregation = {};
    chartData.forEach(item => {
      const key = item[xAxis];
      if (!aggregation[key]) {
        aggregation[key] = 0;
      }
      aggregation[key] += item[yAxis];
    });
    
    return Object.keys(aggregation).map(key => ({
      name: key,
      value: aggregation[key]
    }));
  };

  const pieData = getPieData();

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const renderChart = () => {
    if (!xAxis || !yAxis) {
      return (
        <div className="chart-placeholder">
          <p>Select variables to generate visualization</p>
        </div>
      );
    }

    switch (selectedChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={yAxis} fill={COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke={COLORS[1]} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="visualization-hub">
      <div className="viz-controls">
        <div className="control-group">
          <label>Chart Type:</label>
          <select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)}>
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>X-Axis:</label>
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            <option value="">Select variable</option>
            {selectedChart === 'pie' ? 
              categoricalColumns.map(col => <option key={col} value={col}>{col}</option>) :
              columns.map(col => <option key={col} value={col}>{col}</option>)
            }
          </select>
        </div>
        
        <div className="control-group">
          <label>Y-Axis:</label>
          <select 
            value={yAxis} 
            onChange={(e) => setYAxis(e.target.value)}
            disabled={selectedChart === 'pie'}
          >
            <option value="">Select variable</option>
            {numericColumns.map(col => <option key={col} value={col}>{col}</option>)}
          </select>
        </div>
      </div>
      
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default VisualizationHub;