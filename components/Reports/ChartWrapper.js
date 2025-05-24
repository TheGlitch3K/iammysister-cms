import React from 'react';
import styled from '@emotion/styled';

const ChartContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.borderColor || '#14B8A6'};
  margin-bottom: 1.5rem;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ChartSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6B7280;
  margin: 0.25rem 0 0 0;
`;

const ChartContent = styled.div`
  min-height: ${props => props.height || '300px'};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #F3F4F6;
  color: #374151;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E7EB;
    border-color: #9CA3AF;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #EF4444;
  font-size: 0.875rem;
  padding: 2rem;
  text-align: center;
`;

const ChartWrapper = ({ 
  title, 
  subtitle, 
  children, 
  borderColor = '#14B8A6',
  height = '300px',
  loading = false,
  error = null,
  onExport = null,
  exportLabel = 'Export',
  className = '',
  id
}) => {
  return (
    <ChartContainer borderColor={borderColor} className={className} id={id}>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          {subtitle && <ChartSubtitle>{subtitle}</ChartSubtitle>}
        </div>
        {onExport && (
          <ExportButton onClick={onExport}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {exportLabel}
          </ExportButton>
        )}
      </ChartHeader>
      
      <ChartContent height={height}>
        {loading ? (
          <LoadingIndicator>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading chart data...
          </LoadingIndicator>
        ) : error ? (
          <ErrorMessage>
            <div>
              <svg className="mx-auto h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error loading chart: {error}
            </div>
          </ErrorMessage>
        ) : (
          children
        )}
      </ChartContent>
    </ChartContainer>
  );
};

export default ChartWrapper;
