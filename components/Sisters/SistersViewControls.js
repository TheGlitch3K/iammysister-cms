import React from 'react';
import styled from '@emotion/styled';
import { Grid, List, SortAsc, SortDesc } from 'lucide-react';

const ViewControlsBar = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ViewControls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 0.5rem;
  border: none;
  background: ${props => props.active ? '#14B8A6' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.active ? '#14B8A6' : '#F9FAFB'};
  }
`;

const SortControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }
  
  select {
    padding: 0.5rem 0.75rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    background: white;
    min-width: 140px;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
    }
  }
`;

const SortButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  background: white;
  color: #6B7280;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #14B8A6;
    color: #14B8A6;
  }
`;

export default function SistersViewControls({ 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy, 
  sortOrder, 
  setSortOrder 
}) {
  return (
    <ViewControlsBar>
      <ViewControls>
        <ViewToggle>
          <ViewButton 
            active={viewMode === 'grid'} 
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid size={20} />
          </ViewButton>
          <ViewButton 
            active={viewMode === 'list'} 
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List size={20} />
          </ViewButton>
        </ViewToggle>
      </ViewControls>
      
      <SortControls>
        <label>Sort by:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
          <option value="creditScore">Credit Score</option>
          <option value="income">Monthly Income</option>
          <option value="mentalHealth">Mental Health Score</option>
          <option value="priority">Priority Level</option>
        </select>
        
        <SortButton 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
        >
          {sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />}
        </SortButton>
      </SortControls>
    </ViewControlsBar>
  );
}
