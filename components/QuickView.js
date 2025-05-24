import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { 
  X, Phone, Mail, MessageCircle, Calendar, 
  CreditCard, DollarSign, Heart, Users,
  Target, Flag, CheckCircle, AlertCircle,
  MapPin, Briefcase, Home,
  Maximize2, Minimize2
} from 'lucide-react';
import NotesManager from './NotesManager';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const QuickViewContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: ${props => props.isExpanded ? '80vw' : '500px'};
  max-width: ${props => props.isExpanded ? 'none' : '90vw'};
  background: white;
  box-shadow: -10px 0 25px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  animation: ${props => props.isClosing ? slideOut : slideIn} 0.4s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #14B8A6, #F59E0B);
  color: white;
  padding: 2rem;
  position: relative;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;

const ClientDetails = styled.div`
  flex: 1;
  
  .name {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .program {
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 0.25rem;
  }
  
  .status {
    font-size: 0.75rem;
    opacity: 0.8;
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
`;

const QuickActionButton = styled.button`
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0.95);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: ${props => props.isExpanded ? 'grid' : 'block'};
  grid-template-columns: ${props => props.isExpanded ? '2fr 1fr' : 'none'};
  gap: ${props => props.isExpanded ? '2rem' : '0'};
`;

const MainContent = styled.div`
  ${props => props.isExpanded ? '' : 'width: 100%;'}
`;

const Section = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? 'repeat(3, 1fr)' : '1fr 1fr'};
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoItem = styled.div`
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 0.875rem;
    color: #111827;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
`;

const Metric = styled.div`
  text-align: center;
  
  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
  
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  
  ${props => {
    switch (props.status) {
      case 'new':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'active':
        return 'background: #D1FAE5; color: #065F46;';
      case 'high-priority':
        return 'background: #FEE2E2; color: #991B1B;';
      case 'qualified':
        return 'background: #FEF3C7; color: #92400E;';
      case 'graduated':
        return 'background: #EDE9FE; color: #6B21A8;';
      default:
        return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const SupportCard = styled.div`
  background: ${props => props.urgent ? '#FEF3C7' : '#F0FDFA'};
  border: 1px solid ${props => props.urgent ? '#FCD34D' : '#A7F3D0'};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .title {
    font-weight: 600;
    color: ${props => props.urgent ? '#92400E' : '#065F46'};
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .content {
    color: ${props => props.urgent ? '#92400E' : '#065F46'};
    font-size: 0.875rem;
    line-height: 1.4;
  }
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #14B8A6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #0F766E;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: #F59E0B;
  
  &:hover {
    background: #D97706;
  }
`;

export default function QuickView({ sister, onClose, onUpdate }) {
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCall = () => {
    if (sister.phone) {
      window.open(`tel:${sister.phone}`, '_self');
    }
  };

  const handleText = () => {
    if (sister.phone) {
      const message = `Hi ${sister.firstName}, this is from I AM MY SISTER. How can we support you today?`;
      window.open(`sms:${sister.phone}?body=${encodeURIComponent(message)}`, '_self');
    }
  };

  const handleEmail = () => {
    if (sister.email) {
      const subject = `Following up on your I AM MY SISTER application`;
      const body = `Dear ${sister.firstName},\n\nThank you for submitting your application to I AM MY SISTER. We are reviewing your information and will be in touch soon.\n\nBest regards,\nI AM MY SISTER Team`;
      window.open(`mailto:${sister.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
    }
  };

  const handleSchedule = () => {
    const subject = `Meeting with ${sister.firstName} ${sister.lastName}`;
    const details = `Sister: ${sister.firstName} ${sister.lastName}\nProgram: ${sister.program}\nPhone: ${sister.phone}\nEmail: ${sister.email}`;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(10, 0, 0);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(subject)}&details=${encodeURIComponent(details)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${new Date(startDate.getTime() + 60*60*1000).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const handleNotesUpdate = (sisterId, updatedNotes) => {
    if (onUpdate) {
      onUpdate(sisterId, { notes: updatedNotes });
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (!sister) return null;

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCreditScoreColor = (score) => {
    if (score >= 700) return '#10B981';
    if (score >= 600) return '#F59E0B';
    return '#EF4444';
  };

  const renderWellnessIndicator = (score) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: i < score ? '#EC4899' : '#E5E7EB'
              }}
            />
          ))}
        </div>
        <span>{score}/10</span>
      </div>
    );
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <QuickViewContainer isClosing={isClosing} isExpanded={isExpanded}>
        <Header>
          <HeaderTop>
            <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>
              Sister Profile
            </div>
            <HeaderActions>
              <ActionButton onClick={handleExpand} title={isExpanded ? "Minimize" : "Expand"}>
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </ActionButton>
              <ActionButton onClick={handleClose}>
                <X size={20} />
              </ActionButton>
            </HeaderActions>
          </HeaderTop>

          <ClientInfo>
            <Avatar>
              {sister.firstName?.[0] || 'S'}{sister.lastName?.[0] || 'S'}
            </Avatar>
            <ClientDetails>
              <div className="name">
                {sister.firstName} {sister.lastName}
              </div>
              <div className="program">
                {sister.program || 'Unassigned Program'}
              </div>
              <div className="status">
                Joined {formatDate(sister.timestamp || sister.createdAt)}
              </div>
            </ClientDetails>
          </ClientInfo>

          <QuickActions>
            <QuickActionButton onClick={handleCall}>
              <Phone size={14} />
              Call
            </QuickActionButton>
            <QuickActionButton onClick={handleText}>
              <MessageCircle size={14} />
              Text
            </QuickActionButton>
            <QuickActionButton onClick={handleEmail}>
              <Mail size={14} />
              Email
            </QuickActionButton>
            <QuickActionButton onClick={handleSchedule}>
              <Calendar size={14} />
              Schedule
            </QuickActionButton>
          </QuickActions>
        </Header>

        <Content isExpanded={isExpanded}>
          <MainContent isExpanded={isExpanded}>
            {/* Key Metrics */}
            <MetricsRow>
              <Metric>
                <div className="value" style={{ color: getCreditScoreColor(sister.creditScore || 0) }}>
                  <CreditCard size={16} />
                  {sister.creditScore || 'N/A'}
                </div>
                <div className="label">Credit Score</div>
              </Metric>
              
              <Metric>
                <div className="value">
                  <DollarSign size={16} />
                  ${(sister.monthlyIncome || 0).toLocaleString()}
                </div>
                <div className="label">Monthly Income</div>
              </Metric>
              
              <Metric>
                <div className="value">
                  {renderWellnessIndicator(sister.mentalScore || 0)}
                </div>
                <div className="label">Wellness</div>
              </Metric>
            </MetricsRow>

            {/* Status */}
            <Section>
              <StatusBadge status={sister.status}>
                <CheckCircle size={12} />
                {sister.status || 'Unknown'}
              </StatusBadge>
            </Section>

            {/* Contact Information */}
            <Section>
              <SectionTitle>
                <Users size={16} />
                Contact Information
              </SectionTitle>
              <InfoGrid isExpanded={isExpanded}>
                <InfoItem>
                  <div className="label">Email</div>
                  <div className="value">
                    <Mail size={14} />
                    {sister.email || 'Not provided'}
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Phone</div>
                  <div className="value">
                    <Phone size={14} />
                    {sister.phone || 'Not provided'}
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Household Size</div>
                  <div className="value">
                    <Users size={14} />
                    {sister.householdSize || 1} people
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Program</div>
                  <div className="value">
                    <Target size={14} />
                    {sister.program || 'Unassigned'}
                  </div>
                </InfoItem>
              </InfoGrid>
            </Section>

            {/* Financial Summary */}
            <Section>
              <SectionTitle>
                <CreditCard size={16} />
                Financial Overview
              </SectionTitle>
              <InfoGrid isExpanded={isExpanded}>
                <InfoItem>
                  <div className="label">Credit Report Reviewed</div>
                  <div className="value">{sister.creditReviewed || 'Unknown'}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Employment Length</div>
                  <div className="value">
                    <Briefcase size={14} />
                    {sister.employmentLength || 'Not specified'}
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Savings Account</div>
                  <div className="value">{sister.hasSavings || 'Unknown'}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Savings Amount</div>
                  <div className="value">
                    <DollarSign size={14} />
                    ${(sister.savingsAmount || 0).toLocaleString()}
                  </div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Budget Frequency</div>
                  <div className="value">{sister.budgetFrequency || 'Unknown'}</div>
                </InfoItem>
                <InfoItem>
                  <div className="label">Overdraft Frequency</div>
                  <div className="value">{sister.overdraftFreq || 'Unknown'}</div>
                </InfoItem>
              </InfoGrid>
            </Section>

            {/* Housing Information */}
            {sister.housingStatus && sister.housingStatus !== 'Looking' && (
              <Section>
                <SectionTitle>
                  <MapPin size={16} />
                  Housing Journey
                </SectionTitle>
                <InfoGrid isExpanded={isExpanded}>
                  <InfoItem>
                    <div className="label">Housing Status</div>
                    <div className="value">
                      <Home size={14} />
                      {sister.housingStatus}
                    </div>
                  </InfoItem>
                  {sister.realtorInfo && (
                    <InfoItem>
                      <div className="label">Realtor</div>
                      <div className="value">{sister.realtorInfo}</div>
                    </InfoItem>
                  )}
                  {sister.lenderInfo && (
                    <InfoItem>
                      <div className="label">Lender</div>
                      <div className="value">{sister.lenderInfo}</div>
                    </InfoItem>
                  )}
                  {sister.closingDate && (
                    <InfoItem>
                      <div className="label">Target Closing</div>
                      <div className="value">
                        <Calendar size={14} />
                        {sister.closingDate}
                      </div>
                    </InfoItem>
                  )}
                </InfoGrid>
              </Section>
            )}

            {/* Support Needs */}
            {(sister.supportNeeded || sister.itemsNeeded) && (
              <Section>
                <SectionTitle>
                  <AlertCircle size={16} />
                  Support Needs
                </SectionTitle>
                
                {sister.supportNeeded && (
                  <SupportCard>
                    <div className="title">
                      <Heart size={14} />
                      Areas of Support
                    </div>
                    <div className="content">{sister.supportNeeded}</div>
                  </SupportCard>
                )}
                
                {sister.itemsNeeded && 
                 sister.itemsNeeded !== 'None' &&
                 sister.itemsNeeded !== 'No' &&
                 sister.itemsNeeded !== 'N/A' && (
                  <SupportCard urgent>
                    <div className="title">
                      <AlertCircle size={14} />
                      Immediate Needs
                    </div>
                    <div className="content">{sister.itemsNeeded}</div>
                  </SupportCard>
                )}
              </Section>
            )}

            {/* Sister's Story */}
            {sister.additionalNotes && (
              <Section>
                <SectionTitle>
                  <Flag size={16} />
                  Sister's Story
                </SectionTitle>
                <div style={{ 
                  padding: '1rem', 
                  background: '#F9FAFB', 
                  borderRadius: '0.5rem',
                  fontStyle: 'italic',
                  color: '#374151',
                  lineHeight: '1.5'
                }}>
                  "{sister.additionalNotes}"
                </div>
              </Section>
            )}

            {/* Action Buttons */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isExpanded ? 'repeat(2, 1fr)' : '1fr 1fr', 
              gap: '0.5rem', 
              marginTop: '2rem' 
            }}>
              <SecondaryButton onClick={handleSchedule}>
                <Calendar size={16} />
                Schedule Meeting
              </SecondaryButton>
              <PrimaryButton onClick={handleText}>
                <MessageCircle size={16} />
                Start Conversation
              </PrimaryButton>
            </div>
          </MainContent>

          {/* Notes Panel - Only shown when expanded */}
          {isExpanded && (
            <NotesManager
              sisterId={sister.id}
              initialNotes={sister.notes || []}
              onNotesUpdate={handleNotesUpdate}
            />
          )}
        </Content>
      </QuickViewContainer>
    </>
  );
}
