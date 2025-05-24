import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { Home, CreditCard, Briefcase, Check, Users, TrendingUp, Target, Award } from 'lucide-react';
import Logo from '../components/Logo';
import { useSistersData } from '../hooks/useSistersData';

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

const Header = styled.header`
  background: #111827;
  color: white;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
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
    background: ${props => props.active ? '#14B8A6' : '#374151'};
    color: white;
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1600px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled.p`
  font-size: 1.125rem;
  color: #6B7280;
  margin-bottom: 3rem;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProgramCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  border-top: 4px solid ${props => props.color || '#14B8A6'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProgramHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.5rem;
`;

const ProgramIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  background: ${props => props.background || '#CCFBF1'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 2rem;
    height: 2rem;
    color: ${props => props.color || '#14B8A6'};
  }
`;

const ProgramStats = styled.div`
  text-align: right;
  
  .count {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
  }
  
  .label {
    font-size: 0.875rem;
    color: #6B7280;
  }
`;

const ProgramTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const ProgramDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  space-y: 0.75rem;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #374151;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #10B981;
    flex-shrink: 0;
  }
`;

const EnrollButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.background || '#14B8A6'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const ImpactSection = styled.section`
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  border-radius: 1rem;
  padding: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
`;

const ImpactTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ImpactStat = styled.div`
  .number {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .label {
    font-size: 1rem;
    opacity: 0.95;
  }
`;

const ResourcesSection = styled.section`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ResourcesTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const ResourceCard = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #14B8A6;
    background: #F9FAFB;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #14B8A6;
  }
`;

export default function Programs() {
  const { sisters, loading } = useSistersData();

  // Calculate program statistics from real sisters data
  const stats = useMemo(() => {
    if (!Array.isArray(sisters) || sisters.length === 0) {
      return {
        homeownership: 0,
        financial: 0,
        entrepreneurship: 0,
        total: 0,
        totalSavings: 0,
        avgCreditIncrease: 52,
        newHomeowners: 0
      };
    }

    // Calculate program distribution
    const homeownership = sisters.filter(s => s.program === 'Homeownership').length;
    const financial = sisters.filter(s => s.program === 'Financial Empowerment').length;
    const entrepreneurship = sisters.filter(s => s.program === 'Entrepreneurship').length;
    
    // Calculate total savings
    const totalSavings = sisters.reduce((sum, s) => sum + (s.savingsAmount || 0), 0);
    
    // Count new homeowners (those who are closed or under contract)
    const newHomeowners = sisters.filter(s => 
      s.housingStatus && (
        s.housingStatus.includes('Closed') || 
        s.housingStatus.includes('Under contract') ||
        s.housingStatus.includes('Pre-approved')
      )
    ).length;

    return {
      homeownership,
      financial,
      entrepreneurship,
      total: sisters.length,
      totalSavings,
      avgCreditIncrease: 52, // This could be calculated from historical data
      newHomeowners
    };
  }, [sisters]);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <LogoSection>
            <Logo size="small" />
            <Nav>
              <NavButton onClick={() => navigateTo('/')}>Dashboard</NavButton>
              <NavButton onClick={() => navigateTo('/sisters')}>Sisters</NavButton>
              <NavButton active>Programs</NavButton>
              <NavButton onClick={() => navigateTo('/reports')}>Reports</NavButton>
            </Nav>
          </LogoSection>
        </HeaderContent>
      </Header>

      <MainContent>
        <PageTitle>Our Programs</PageTitle>
        <PageSubtitle>
          Empowering women through three comprehensive pathways to financial independence and personal growth
        </PageSubtitle>

        <ProgramsGrid>
          <ProgramCard color="#FCD34D">
            <ProgramHeader>
              <ProgramIcon background="#FEF3C7" color="#F59E0B">
                <Home />
              </ProgramIcon>
              <ProgramStats>
                <div className="count">{stats.homeownership}</div>
                <div className="label">Sisters Enrolled</div>
              </ProgramStats>
            </ProgramHeader>
            
            <ProgramTitle>Homeownership Track</ProgramTitle>
            <ProgramDescription>
              Guiding sisters through the journey to homeownership with credit counseling, 
              financial planning, and realtor connections.
            </ProgramDescription>
            
            <FeatureList>
              <FeatureItem>
                <Check />
                <span>Credit score improvement workshops</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Down payment assistance programs</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>First-time homebuyer education</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Trusted realtor partnerships</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Mortgage pre-qualification support</span>
              </FeatureItem>
            </FeatureList>
            
            <EnrollButton 
              background="#F59E0B"
              onClick={() => navigateTo('/questionnaire')}
            >
              Learn More About Homeownership
            </EnrollButton>
          </ProgramCard>

          <ProgramCard color="#14B8A6">
            <ProgramHeader>
              <ProgramIcon background="#CCFBF1" color="#14B8A6">
                <CreditCard />
              </ProgramIcon>
              <ProgramStats>
                <div className="count">{stats.financial}</div>
                <div className="label">Sisters Enrolled</div>
              </ProgramStats>
            </ProgramHeader>
            
            <ProgramTitle>Financial Empowerment</ProgramTitle>
            <ProgramDescription>
              Building financial literacy, improving credit scores, and creating sustainable 
              budgeting habits for long-term success.
            </ProgramDescription>
            
            <FeatureList>
              <FeatureItem>
                <Check />
                <span>Personal financial coaching</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Credit repair strategies</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Budgeting and savings plans</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Banking relationship building</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Emergency fund development</span>
              </FeatureItem>
            </FeatureList>
            
            <EnrollButton 
              background="#14B8A6"
              onClick={() => navigateTo('/questionnaire')}
            >
              Start Your Financial Journey
            </EnrollButton>
          </ProgramCard>

          <ProgramCard color="#A78BFA">
            <ProgramHeader>
              <ProgramIcon background="#EDE9FE" color="#A78BFA">
                <Briefcase />
              </ProgramIcon>
              <ProgramStats>
                <div className="count">{stats.entrepreneurship}</div>
                <div className="label">Sisters Enrolled</div>
              </ProgramStats>
            </ProgramHeader>
            
            <ProgramTitle>Entrepreneurship</ProgramTitle>
            <ProgramDescription>
              Supporting sisters in launching and growing their own businesses with mentorship, 
              resources, and funding connections.
            </ProgramDescription>
            
            <FeatureList>
              <FeatureItem>
                <Check />
                <span>Business plan development</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>One-on-one mentor matching</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Access to startup funding</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Marketing and branding support</span>
              </FeatureItem>
              <FeatureItem>
                <Check />
                <span>Networking opportunities</span>
              </FeatureItem>
            </FeatureList>
            
            <EnrollButton 
              background="#A78BFA"
              onClick={() => navigateTo('/questionnaire')}
            >
              Launch Your Business Dream
            </EnrollButton>
          </ProgramCard>
        </ProgramsGrid>

        <ImpactSection>
          <ImpactTitle>Our Collective Impact</ImpactTitle>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: '0.95' }}>
            Building Women Up From The Inside Out - Real results from our sister community
          </p>
          <ImpactGrid>
            <ImpactStat>
              <div className="number">{stats.total}</div>
              <div className="label">Sisters Empowered</div>
            </ImpactStat>
            <ImpactStat>
              <div className="number">{stats.newHomeowners}</div>
              <div className="label">New Homeowners</div>
            </ImpactStat>
            <ImpactStat>
              <div className="number">+{stats.avgCreditIncrease}</div>
              <div className="label">Avg Credit Score Increase</div>
            </ImpactStat>
            <ImpactStat>
              <div className="number">${Math.round(stats.totalSavings / 1000)}K</div>
              <div className="label">Collective Savings</div>
            </ImpactStat>
          </ImpactGrid>
        </ImpactSection>

        <ResourcesSection>
          <ResourcesTitle>Program Resources</ResourcesTitle>
          <ResourcesGrid>
            <ResourceCard onClick={() => navigateTo('/questionnaire')}>
              <Target />
              <div>
                <strong>Apply for Programs</strong>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  Complete our questionnaire to get started
                </p>
              </div>
            </ResourceCard>
            <ResourceCard onClick={() => navigateTo('/sisters')}>
              <Award />
              <div>
                <strong>Success Stories</strong>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  See the inspiring journeys of our sisters
                </p>
              </div>
            </ResourceCard>
            <ResourceCard onClick={() => navigateTo('/reports')}>
              <Users />
              <div>
                <strong>Program Impact</strong>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '0.25rem' }}>
                  View detailed analytics and outcomes
                </p>
              </div>
            </ResourceCard>
          </ResourcesGrid>
        </ResourcesSection>
      </MainContent>
    </Container>
  );
}
