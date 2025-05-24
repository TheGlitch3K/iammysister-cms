import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { 
  Search, Download, Plus, Eye, Mail, Phone, TrendingUp, Users, 
  CreditCard, Home, Heart, Activity, Target, Sparkles, Building2, 
  Briefcase, HeartHandshake, Award, BarChart3, Calendar, Filter,
  ChevronRight, X, AlertCircle, Check, DollarSign, Menu
} from 'lucide-react';
import { format } from 'date-fns';
import Logo from '../components/Logo';
import QuickView from '../components/QuickView';
import { useSistersData } from '../hooks/useSistersData';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #F9FAFB;
`;

const Header = styled.header`
  background: #111827;
  color: white;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: ${props => props.active ? '#14B8A6' : 'transparent'};
  color: ${props => props.active ? 'white' : '#D1D5DB'};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    color: white;
    background: ${props => props.active ? '#14B8A6' : '#374151'};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #FCD34D;
  color: #111827;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #FDE68A;
    transform: translateY(-1px);
  }
`;

const Main = styled.main`
  padding: 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.125rem;
    opacity: 0.95;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.color || '#14B8A6'};
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
`;

const StatInfo = styled.div`
  h3 {
    color: #6B7280;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .value {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
  }
  
  .change {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #10B981;
  }
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg || '#E0F2FE'};
  color: ${props => props.color || '#14B8A6'};
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  
  input {
    width: 100%;
    max-width: 400px;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;
    
    &:focus {
      outline: none;
      border-color: #14B8A6;
      box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
    }
  }
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.active ? 'transparent' : '#E5E7EB'};
  background: ${props => props.active ? '#14B8A6' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #14B8A6;
    color: ${props => props.active ? 'white' : '#14B8A6'};
  }
`;

const ClientTable = styled.div`
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
  }
`;

const Table = styled.table`
  width: 100%;
  
  thead {
    background: #F9FAFB;
    border-bottom: 1px solid #E5E7EB;
  }
  
  th {
    padding: 0.75rem 1.5rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6B7280;
  }
  
  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #F3F4F6;
  }
  
  tbody tr {
    transition: background 0.2s;
    cursor: pointer;
    
    &:hover {
      background: #F9FAFB;
    }
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'new': return '#DBEAFE';
      case 'contacted': return '#FEF3C7';
      case 'high-priority': return '#FEE2E2';
      case 'in-progress': return '#E0E7FF';
      case 'active': return '#E0F2FE';
      case 'qualified': return '#D1FAE5';
      case 'graduated': return '#DCFCE7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'new': return '#1E40AF';
      case 'contacted': return '#92400E';
      case 'high-priority': return '#DC2626';
      case 'in-progress': return '#4C1D95';
      case 'active': return '#0369A1';
      case 'qualified': return '#065F46';
      case 'graduated': return '#16A34A';
      default: return '#6B7280';
    }
  }};
`;

const ProgramBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch(props.program) {
      case 'Homeownership': return '#FEF3C7';
      case 'Financial Empowerment': return '#CCFBF1';
      case 'Entrepreneurship': return '#EDE9FE';
      default: return '#F3F4F6';
    }
  }};
  border-color: ${props => {
    switch(props.program) {
      case 'Homeownership': return '#FCD34D';
      case 'Financial Empowerment': return '#14B8A6';
      case 'Entrepreneurship': return '#A78BFA';
      default: return '#E5E7EB';
    }
  }};
  color: ${props => {
    switch(props.program) {
      case 'Homeownership': return '#92400E';
      case 'Financial Empowerment': return '#065F46';
      case 'Entrepreneurship': return '#5B21B6';
      default: return '#6B7280';
    }
  }};
`;

const HeartRating = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  margin-top: 0.5rem;
  
  span {
    margin-left: 0.5rem;
    font-weight: 500;
  }
`;

// Main Component
export default function Dashboard() {
  const router = useRouter();
  const { 
    sisters, 
    filteredSisters, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    stats,
    filters,
    setFilters
  } = useSistersData();
  
  const [selectedClient, setSelectedClient] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');

  // Calculate enhanced stats from sisters data
  const enhancedStats = useMemo(() => {
    if (!Array.isArray(sisters) || sisters.length === 0) {
      return {
        total: 0,
        newClients: 0,
        housingReady: 0,
        avgMentalHealth: 0,
        totalSavings: 0
      };
    }

    const total = sisters.length;
    const newClients = sisters.filter(s => s.status === 'new').length;
    const housingReady = sisters.filter(s => 
      (s.creditScore || 0) >= 620 && (s.monthlyIncome || 0) >= 3000
    ).length;
    const avgMentalHealth = total > 0 ? 
      (sisters.reduce((sum, s) => sum + (s.mentalScore || s.mentalHealthScore || 5), 0) / total).toFixed(1) 
      : 0;
    const totalSavings = sisters.reduce((sum, s) => sum + (s.savingsAmount || 0), 0);

    return {
      total,
      newClients,
      housingReady,
      avgMentalHealth,
      totalSavings
    };
  }, [sisters]);

  const filteredClients = useMemo(() => {
    let filtered = sisters;

    if (searchTerm) {
      filtered = filtered.filter(client => 
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(client => {
        const clientStatus = (client.status || '').toLowerCase().trim();
        const filterStatus = statusFilter.toLowerCase().trim();
        return clientStatus === filterStatus;
      });
    }

    return filtered;
  }, [sisters, searchTerm, statusFilter]);

  const handleExport = () => {
    const headers = ['Name', 'Email', 'Phone', 'Program', 'Credit Score', 'Monthly Income', 'Status', 'Applied'];
    const rows = filteredClients.map(c => [
      `${c.firstName} ${c.lastName}`,
      c.email,
      c.phone,
      c.program,
      c.creditScore,
      c.monthlyIncome,
      c.status,
      formatDate(c.timestamp)
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sisters_export.csv';
    a.click();
  };

  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMM d, yyyy');
    } catch {
      return 'N/A';
    }
  };

  const getCreditScoreColor = (score) => {
    if (score >= 700) return '#10B981';
    if (score >= 600) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusCount = (status) => {
    if (!Array.isArray(sisters)) return 0;
    if (status === 'all') return sisters.length;
    return sisters.filter(c => {
      const clientStatus = (c.status || '').toLowerCase().trim();
      return clientStatus === status.toLowerCase().trim();
    }).length;
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedClient(null);
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo size="small" />
          <Nav>
            <NavButton active onClick={() => navigateTo('/')}>
              Dashboard
            </NavButton>
            <NavButton onClick={() => navigateTo('/sisters')}>
              Sisters
            </NavButton>
            <NavButton onClick={() => navigateTo('/programs')}>
              Programs
            </NavButton>
            <NavButton onClick={() => navigateTo('/reports')}>
              Reports
            </NavButton>
          </Nav>
          <AddButton onClick={() => window.open('/questionnaire', '_blank')}>
            <Plus size={20} />
            New Sister
          </AddButton>
        </HeaderContent>
      </Header>

      <Main>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <Activity size={48} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', color: '#6B7280' }}>Loading sisters data...</p>
          </div>
        ) : (
          <>
            <WelcomeBanner>
              <h1>Welcome to Sister Success Dashboard</h1>
              <p>Empowering {enhancedStats.total} women on their journey to financial independence and homeownership</p>
            </WelcomeBanner>

            <StatsGrid>
              <StatCard color="#14B8A6">
                <StatHeader>
                  <StatInfo>
                    <h3>Total Sisters</h3>
                    <div className="value">{enhancedStats.total}</div>
                    <div className="change">
                      <Sparkles size={16} />
                      {enhancedStats.newClients} new this week
                    </div>
                  </StatInfo>
                  <IconWrapper bg="#CCFBF1" color="#14B8A6">
                    <Users size={24} />
                  </IconWrapper>
                </StatHeader>
              </StatCard>

              <StatCard color="#FCD34D">
                <StatHeader>
                  <StatInfo>
                    <h3>Housing Ready</h3>
                    <div className="value">{enhancedStats.housingReady}</div>
                    <div className="change">
                      <Home size={16} />
                      Credit & income qualified
                    </div>
                  </StatInfo>
                  <IconWrapper bg="#FEF3C7" color="#F59E0B">
                    <Home size={24} />
                  </IconWrapper>
                </StatHeader>
              </StatCard>

              <StatCard color="#A78BFA">
                <StatHeader>
                  <StatInfo>
                    <h3>Wellness Score</h3>
                    <div className="value">{enhancedStats.avgMentalHealth}/10</div>
                    <div className="change">
                      <Heart size={16} />
                      Mental & emotional health
                    </div>
                  </StatInfo>
                  <IconWrapper bg="#EDE9FE" color="#A78BFA">
                    <HeartHandshake size={24} />
                  </IconWrapper>
                </StatHeader>
              </StatCard>

              <StatCard color="#10B981">
                <StatHeader>
                  <StatInfo>
                    <h3>Collective Savings</h3>
                    <div className="value">${((enhancedStats.totalSavings) / 1000).toFixed(0)}K</div>
                    <div className="change">
                      <TrendingUp size={16} />
                      Building wealth together
                    </div>
                  </StatInfo>
                  <IconWrapper bg="#D1FAE5" color="#10B981">
                    <DollarSign size={24} />
                  </IconWrapper>
                </StatHeader>
              </StatCard>
            </StatsGrid>

            <SearchBar>
              <Search />
              <input
                type="text"
                placeholder="Search sisters by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>

            <FilterSection>
              <span style={{ fontWeight: 500, color: '#6B7280' }}>Status:</span>
              <FilterButton active={statusFilter === ''} onClick={() => setStatusFilter('')}>
                All ({getStatusCount('all')})
              </FilterButton>
              <FilterButton active={statusFilter === 'new'} onClick={() => setStatusFilter('new')}>
                New ({getStatusCount('new')})
              </FilterButton>
              <FilterButton active={statusFilter === 'contacted'} onClick={() => setStatusFilter('contacted')}>
                Contacted ({getStatusCount('contacted')})
              </FilterButton>
              <FilterButton active={statusFilter === 'in-progress'} onClick={() => setStatusFilter('in-progress')}>
                In Progress ({getStatusCount('in-progress')})
              </FilterButton>
              <FilterButton active={statusFilter === 'qualified'} onClick={() => setStatusFilter('qualified')}>
                Qualified ({getStatusCount('qualified')})
              </FilterButton>
              
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleExport}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    background: 'white',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#6B7280'
                  }}
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </FilterSection>

            <ClientTable>
              <TableHeader>
                <h2>Recent Sisters</h2>
              </TableHeader>
              <Table>
                <thead>
                  <tr>
                    <th>Sister</th>
                    <th>Program</th>
                    <th>Financial Health</th>
                    <th>Well-being</th>
                    <th>Status</th>
                    <th>Applied</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.slice(0, 10).map((client) => (
                    <tr key={client.id} onClick={() => handleClientClick(client)}>
                      <td>
                        <ClientInfo>
                          <Avatar>
                            {client.firstName?.[0] || ''}{client.lastName?.[0] || ''}
                          </Avatar>
                          <div>
                            <div style={{ fontWeight: 500 }}>
                              {client.firstName} {client.lastName}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                              {client.email}
                            </div>
                          </div>
                        </ClientInfo>
                      </td>
                      <td>
                        <ProgramBadge program={client.program}>
                          {client.program}
                        </ProgramBadge>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.875rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={16} color="#6B7280" />
                            <span style={{ fontWeight: 500, color: getCreditScoreColor(client.creditScore) }}>
                              {client.creditScore}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                            <DollarSign size={16} color="#6B7280" />
                            <span style={{ color: '#6B7280' }}>
                              ${(client.monthlyIncome || 0).toLocaleString()}/mo
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <HeartRating>
                          {[...Array(10)].map((_, i) => (
                            <Heart
                              key={i}
                              size={16}
                              fill={i < (client.mentalScore || client.mentalHealthScore || 5) ? '#EC4899' : 'none'}
                              color={i < (client.mentalScore || client.mentalHealthScore || 5) ? '#EC4899' : '#E5E7EB'}
                            />
                          ))}
                          <span>{client.mentalScore || client.mentalHealthScore || 5}/10</span>
                        </HeartRating>
                      </td>
                      <td>
                        <StatusBadge status={client.status}>
                          {client.status === 'high-priority' ? 'High Priority' :
                           (client.status || 'unknown').charAt(0).toUpperCase() + (client.status || 'unknown').slice(1).replace('-', ' ')}
                        </StatusBadge>
                      </td>
                      <td style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                        {formatDate(client.timestamp)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.75rem' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleClientClick(client)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#14B8A6',
                              padding: '0.25rem'
                            }}
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#6B7280',
                              padding: '0.25rem'
                            }}
                          >
                            <Mail size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ClientTable>
          </>
        )}
      </Main>

      {/* Quick View Component */}
      {showQuickView && selectedClient && (
        <QuickView 
          sister={selectedClient}
          onClose={handleCloseQuickView}
          onUpdate={(sisterId, updates) => {
            // This will be handled by the useSistersData hook
            console.log('Update sister:', sisterId, updates);
          }}
        />
      )}
    </Container>
  );
}
