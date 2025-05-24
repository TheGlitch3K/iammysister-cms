import React from 'react';
import styled from '@emotion/styled';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.compact ? '8px' : '16px'};
  cursor: pointer;
  
  svg {
    height: ${props => props.size || '48px'};
    width: auto;
  }
`;

const LogoText = styled.div`
  display: ${props => props.compact ? 'none' : 'flex'};
  flex-direction: column;
  
  @media (min-width: 768px) {
    display: flex;
  }
`;

const LogoTitle = styled.div`
  font-size: ${props => props.size === 'small' ? '20px' : '24px'};
  font-weight: 800;
  letter-spacing: -0.5px;
  
  .iam {
    color: #14B8A6;
  }
  
  .my {
    color: #14B8A6;
  }
  
  .sister {
    color: #FCD34D;
  }
`;

const LogoTagline = styled.div`
  font-size: ${props => props.size === 'small' ? '10px' : '11px'};
  color: #14B8A6;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-top: -2px;
  font-weight: 500;
`;

const Logo = ({ size = 'medium', compact = false, showTagline = true }) => {
  const logoHeight = size === 'small' ? '36px' : size === 'large' ? '64px' : '48px';
  
  return (
    <LogoContainer compact={compact} size={logoHeight}>
      {/* Logo SVG - Woman silhouette with upward motion and bar chart */}
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="#111827" stroke="#1F2937" strokeWidth="2"/>
        
        {/* Bar chart elements */}
        <rect x="25" y="70" width="8" height="20" fill="#14B8A6" opacity="0.8"/>
        <rect x="36" y="60" width="8" height="30" fill="#14B8A6" opacity="0.8"/>
        <rect x="47" y="50" width="8" height="40" fill="#14B8A6" opacity="0.8"/>
        <rect x="58" y="40" width="8" height="50" fill="#14B8A6" opacity="0.8"/>
        
        {/* Woman silhouette in upward motion */}
        <path
          d="M 70 30 
             C 70 30, 72 28, 75 28
             C 78 28, 80 30, 80 33
             C 80 36, 78 38, 75 38
             C 72 38, 70 36, 70 33
             
             M 75 40
             L 75 55
             
             M 65 45
             L 75 50
             L 85 45
             
             M 75 55
             L 70 70
             L 68 85
             
             M 75 55
             L 80 70
             L 82 85
             
             M 60 35
             C 60 35, 65 30, 75 25
             C 85 20, 90 25, 95 30"
          stroke="#FCD34D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Sparkle effects */}
        <circle cx="90" cy="25" r="2" fill="#FCD34D" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="95" cy="35" r="1.5" fill="#FCD34D" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="85" cy="20" r="1.5" fill="#14B8A6" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
      
      <LogoText compact={compact}>
        <LogoTitle size={size}>
          <span className="iam">IAM</span>
          <span className="my">MY</span>
          <span className="sister">SISTER</span>
        </LogoTitle>
        {showTagline && (
          <LogoTagline size={size}>
            Building Women Up From The Inside Out
          </LogoTagline>
        )}
      </LogoText>
    </LogoContainer>
  );
};

export default Logo;
