import React, { useRef } from 'react';
import { useCSVParser } from '../hooks/useCSVParser';

const FileUploader = ({ onDataLoaded, isLoading, setIsLoading }) => {
  const fileInputRef = useRef(null);
  const { parseCSV } = useCSVParser();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    parseCSV(file)
      .then(({ data, columns }) => {
        onDataLoaded(data, columns);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error parsing CSV:', error);
        alert('Failed to parse CSV file. Please make sure it\'s a valid CSV.');
        setIsLoading(false);
      });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="file-uploader">
      <div 
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".csv"
          style={{ display: 'none' }}
        />
        
        {isLoading ? (
          <div className="upload-content">
            <div className="spinner"></div>
            <p>Processing your data...</p>
          </div>
        ) : (
          <div className="upload-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/>
            </svg>
            <h3>Upload CSV File</h3>
            <p>Drag and drop your file here or click to browse</p>
            <div className="upload-hint">Supports: .csv files</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;