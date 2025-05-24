import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Search, Download, Plus, Users, CheckCircle, AlertCircle, Home, Send } from 'lucide-react';
import SistersHeader from '../components/Sisters/SistersHeader';
import SistersFilters from '../components/Sisters/SistersFilters';
import SistersViewControls from '../components/Sisters/SistersViewControls';
import SisterCard from '../components/SisterCard';
import QuickView from '../components/QuickView';
import { useSistersData } from '../hooks/useSistersData';

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: white;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #E5E7EB;
  background: white;
  color: #6B7280;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    border-color: #14B8A6;
    color: #14B8A6;
    background: #F0FDFA;
  }
  
  &.primary {
    background: #14B8A6;
    color: white;
    border-color: #14B8A6;
    
    &:hover {
      background: #0F766E;
    }
  }
  
  &.secondary {
    background: #F59E0B;
    color: white;
    border-color: #F59E0B;
    
    &:hover {
      background: #D97706;
    }
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #6B7280;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .value {
    font-weight: 600;
    color: #111827;
  }
`;

const SistersGrid = styled.div`
  display: ${props => props.viewMode === 'list' ? 'flex' : 'grid'};
  ${props => props.viewMode === 'list' ? `
    flex-direction: column;
    gap: 1rem;
  ` : `
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1.5rem;
  `}
  margin-bottom: 2rem;
`;

const SistersListView = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
  
  transition: all 0.2s;
`;

const SisterBasicInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const SisterAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14B8A6, #F59E0B);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
`;

const SisterInfo = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0.25rem 0;
  }
  
  p {
    font-size: 0.875rem;
    color: #6B7280;
    margin: 0;
  }
`;

const SisterStats = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 0.875rem;
`;

const StatGroup = styled.div`
  text-align: center;
  
  .label {
    color: #6B7280;
    display: block;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }
  
  .value {
    color: #111827;
    font-weight: 600;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #6B7280;
  font-size: 1.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  
  .icon {
    color: #D1D5DB;
    margin-bottom: 1rem;
  }
  
  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: #6B7280;
    margin-bottom: 2rem;
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14B8A6, #F59E0B);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default function Sisters() {
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedSister, setSelectedSister] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const {
    filteredSisters,
    loading,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filters,
    setFilters,
    stats,
    formatLastContact,
    getCreditScoreColor,
    sendMessage,
    scheduleFollowUp
  } = useSistersData();

  const openProfile = (sister) => {
    setSelectedSister(sister);
    setShowQuickView(true);
  };

  const renderListItem = (sister) => (
    <SistersListView key={sister.clientId} onClick={() => openProfile(sister)}>
      <SisterBasicInfo>
        <SisterAvatar>
          {(sister.firstName?.[0] || '').toUpperCase()}{(sister.lastName?.[0] || '').toUpperCase()}
        </SisterAvatar>
        <SisterInfo>
          <h3>{sister.firstName} {sister.lastName}</h3>
          <p>{sister.email} • {sister.phone}</p>
        </SisterInfo>
      </SisterBasicInfo>
      
      <SisterStats>
        <StatGroup>
          <span className="label">Credit Score</span>
          <span className="value" style={{ color: getCreditScoreColor(sister.creditScore) }}>
            {sister.creditScore || 'N/A'}
          </span>
        </StatGroup>
        <StatGroup>
          <span className="label">Income</span>
          <span className="value">${(sister.monthlyIncome || 0).toLocaleString()}</span>
        </StatGroup>
        <StatGroup>
          <span className="label">Wellness</span>
          <span className="value">{sister.mentalScore || 0}/10</span>
        </StatGroup>
        <StatGroup>
          <span className="label">Program</span>
          <span className="value">{sister.program || 'N/A'}</span>
        </StatGroup>
      </SisterStats>
    </SistersListView>
  );

  if (loading) {
    return (
      <Container>
        <SistersHeader />
        <MainContent>
          <LoadingState>Loading sisters directory...</LoadingState>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <SistersHeader />

      <MainContent>
        <PageHeader>
          <PageTitle>
            <Users size={24} />
            Sister Directory
          </PageTitle>
          <HeaderActions>
            <SearchBar>
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search sisters by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
            <ActionButton className="secondary">
              <Send size={16} />
              Bulk SMS
            </ActionButton>
            <ActionButton className="primary">
              <Download size={16} />
              Export
            </ActionButton>
          </HeaderActions>
        </PageHeader>

        <SistersFilters 
          filters={filters} 
          setFilters={setFilters} 
          stats={stats} 
        />

        <SistersViewControls
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <StatsBar>
          <StatItem>
            <Users size={16} />
            <span className="value">{filteredSisters.length}</span> of {stats.total} sisters
          </StatItem>
          <StatItem>
            <CheckCircle size={16} />
            <span className="value">{stats.active}</span> active
          </StatItem>
          <StatItem>
            <AlertCircle size={16} />
            <span className="value">{stats.highPriority}</span> high priority
          </StatItem>
          <StatItem>
            <Home size={16} />
            <span className="value">{stats.housingReady}</span> housing ready
          </StatItem>
        </StatsBar>

        {filteredSisters.length > 0 ? (
          <SistersGrid viewMode={viewMode}>
            {viewMode === 'list' 
              ? filteredSisters.map(renderListItem)
              : filteredSisters.map((sister) => (
                  <SisterCard
                    key={sister.clientId}
                    sister={sister}
                    onOpenProfile={openProfile}
                    onSendMessage={sendMessage}
                    onScheduleFollowUp={scheduleFollowUp}
                    formatLastContact={formatLastContact}
                    getCreditScoreColor={getCreditScoreColor}
                  />
                ))
            }
          </SistersGrid>
        ) : (
          <EmptyState>
            <Users className="icon" size={48} />
            <div className="title">No Sisters Found</div>
            <div className="description">
              Try adjusting your search criteria or filters to find sisters.
            </div>
          </EmptyState>
        )}
      </MainContent>

      <FloatingActionButton onClick={() => window.location.href = '/questionnaire'}>
        <Plus size={24} />
      </FloatingActionButton>

      {showQuickView && selectedSister && (
        <QuickView 
          sister={selectedSister} 
          onClose={() => setShowQuickView(false)}
        />
      )}
    </Container>
  );
}
