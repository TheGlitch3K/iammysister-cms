import React from 'react';
import styled from '@emotion/styled';

const FilterBar = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-right: 0.5rem;
  }
`;

const FilterSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background: white;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
  }
`;

export default function SistersFilters({ filters, setFilters, stats }) {
  return (
    <FilterBar>
      <FilterGroup>
        <label>Status:</label>
        <FilterSelect 
          value={filters.status} 
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="">All Status ({stats.total})</option>
          <option value="new">New</option>
          <option value="active">Active ({stats.active})</option>
          <option value="high-priority">High Priority</option>
          <option value="qualified">Qualified</option>
          <option value="graduated">Graduated</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <label>Program:</label>
        <FilterSelect 
          value={filters.program} 
          onChange={(e) => setFilters({...filters, program: e.target.value})}
        >
          <option value="">All Programs</option>
          <option value="Homeownership">Homeownership</option>
          <option value="Financial Empowerment">Financial Empowerment</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <label>Priority:</label>
        <FilterSelect 
          value={filters.priority} 
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
        >
          <option value="">All Priority</option>
          <option value="urgent">Urgent (Immediate Needs)</option>
          <option value="high">High (Mental Health ≤5)</option>
          <option value="normal">Normal (Stable)</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <label>Credit Range:</label>
        <FilterSelect 
          value={filters.creditRange} 
          onChange={(e) => setFilters({...filters, creditRange: e.target.value})}
        >
          <option value="">All Scores</option>
          <option value="300-499">300-499 (Poor)</option>
          <option value="500-599">500-599 (Fair)</option>
          <option value="600-699">600-699 (Good)</option>
          <option value="700-850">700+ (Excellent)</option>
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <label>Income Range:</label>
        <FilterSelect 
          value={filters.incomeRange} 
          onChange={(e) => setFilters({...filters, incomeRange: e.target.value})}
        >
          <option value="">All Income</option>
          <option value="0-2000">Under $2K</option>
          <option value="2000-3500">$2K-$3.5K</option>
          <option value="3500-5000">$3.5K-$5K</option>
          <option value="5000-999999">$5K+</option>
        </FilterSelect>
      </FilterGroup>
    </FilterBar>
  );
}
