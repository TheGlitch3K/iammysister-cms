import React from 'react';
import styled from '@emotion/styled';
import { Eye, MessageCircle, Calendar, MoreVertical, Clock, CreditCard, DollarSign, Heart } from 'lucide-react';

const SisterCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #14B8A6;
  }
`;

const SisterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const SisterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #14B8A6, #F59E0B);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const SisterDetails = styled.div`
  flex: 1;
  min-width: 0;
  
  .name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  .contact {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
  }
  
  .last-contact {
    font-size: 0.75rem;
    color: #9CA3AF;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const StatusBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
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

const ProgramBadge = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
  
  ${props => {
    switch (props.program) {
      case 'Homeownership':
        return 'background: #FEF3C7; color: #92400E; border: 1px solid #FCD34D;';
      case 'Financial Empowerment':
        return 'background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;';
      case 'Entrepreneurship':
        return 'background: #F3E8FF; color: #6B21A8; border: 1px solid #C4B5FD;';
      default:
        return 'background: #F3F4F6; color: #374151; border: 1px solid #E5E7EB;';
    }
  }}
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #F9FAFB;
  border-radius: 0.5rem;
`;

const Metric = styled.div`
  text-align: center;
  
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 0.25rem;
  }
  
  .value {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
`;

const WellnessIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  .hearts {
    display: flex;
    gap: 2px;
  }
  
  .heart {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.filled ? '#EC4899' : '#E5E7EB'};
  }
`;

const SupportNeeds = styled.div`
  margin-top: 1rem;
  
  .label {
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  
  .needs {
    font-size: 0.875rem;
    color: #374151;
    line-height: 1.4;
  }
  
  .items-needed {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: #FEF3C7;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    color: #92400E;
    font-weight: 500;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #E5E7EB;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #E5E7EB;
  background: white;
  color: #6B7280;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const QuickActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  
  .menu-button {
    padding: 0.25rem;
    border: none;
    background: #F3F4F6;
    color: #6B7280;
    border-radius: 0.25rem;
    cursor: pointer;
    
    &:hover {
      background: #E5E7EB;
    }
  }
`;

export default function SisterCardComponent({ 
  sister, 
  onOpenProfile, 
  onSendMessage, 
  onScheduleFollowUp, 
  formatLastContact, 
  getCreditScoreColor 
}) {
  const renderWellnessIndicator = (score) => {
    return (
      <WellnessIndicator>
        <div className="hearts">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className="heart" 
              style={{ background: i < score ? '#EC4899' : '#E5E7EB' }}
            />
          ))}
        </div>
        <span>{score}/10</span>
      </WellnessIndicator>
    );
  };

  return (
    <SisterCard onClick={() => onOpenProfile(sister)}>
      <QuickActions>
        <button className="menu-button">
          <MoreVertical size={16} />
        </button>
      </QuickActions>

      <SisterHeader>
        <SisterInfo>
          <Avatar>
            {sister.firstName?.[0] || 'S'}{sister.lastName?.[0] || 'S'}
          </Avatar>
          <SisterDetails>
            <div className="name">
              {sister.firstName} {sister.lastName}
            </div>
            <div className="contact">
              {sister.email || 'No email provided'}
            </div>
            <div className="last-contact">
              <Clock size={12} />
              Last contact: {formatLastContact(sister.timestamp || sister.createdAt)}
            </div>
          </SisterDetails>
        </SisterInfo>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          <StatusBadge status={sister.status}>
            {sister.status || 'Unknown'}
          </StatusBadge>
          <ProgramBadge program={sister.program}>
            {sister.program || 'Unassigned'}
          </ProgramBadge>
        </div>
      </SisterHeader>

      <MetricsRow>
        <Metric>
          <div className="label">Credit Score</div>
          <div className="value">
            <CreditCard 
              size={16} 
              color={getCreditScoreColor(sister.creditScore || 0)} 
            />
            {sister.creditScore || 'N/A'}
          </div>
        </Metric>
        <Metric>
          <div className="label">Monthly Income</div>
          <div className="value">
            <DollarSign size={16} />
            ${(sister.monthlyIncome || 0).toLocaleString()}
          </div>
        </Metric>
        <Metric>
          <div className="label">Wellness</div>
          <div className="value">
            {renderWellnessIndicator(sister.mentalScore || 0)}
          </div>
        </Metric>
      </MetricsRow>

      {(sister.supportNeeded || sister.itemsNeeded) && (
        <SupportNeeds>
          <div className="label">Support Needs</div>
          {sister.supportNeeded && (
            <div className="needs">{sister.supportNeeded}</div>
          )}
          {sister.itemsNeeded && 
           sister.itemsNeeded !== 'None' &&
           sister.itemsNeeded !== 'No' &&
           sister.itemsNeeded !== 'N/A' && (
            <div className="items-needed">
              Immediate needs: {sister.itemsNeeded}
            </div>
          )}
        </SupportNeeds>
      )}

      <ActionButtons>
        <ActionButton className="primary" onClick={(e) => {
          e.stopPropagation();
          onOpenProfile(sister);
        }}>
          <Eye size={16} />
          View Profile
        </ActionButton>
        <ActionButton onClick={(e) => {
          e.stopPropagation();
          onSendMessage(sister);
        }}>
          <MessageCircle size={16} />
          Text
        </ActionButton>
        <ActionButton onClick={(e) => {
          e.stopPropagation();
          onScheduleFollowUp(sister);
        }}>
          <Calendar size={16} />
          Schedule
        </ActionButton>
      </ActionButtons>
    </SisterCard>
  );
}
