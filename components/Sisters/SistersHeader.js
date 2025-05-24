import React from 'react';
import styled from '@emotion/styled';
import Logo from '../Logo';

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

export default function SistersHeader() {
  return (
    <Header>
      <HeaderContent>
        <LogoSection>
          <Logo size="small" />
          <Nav>
            <NavButton onClick={() => window.location.href = '/'}>Dashboard</NavButton>
            <NavButton active>Sisters</NavButton>
            <NavButton onClick={() => window.location.href = '/programs'}>Programs</NavButton>
            <NavButton onClick={() => window.location.href = '/reports'}>Reports</NavButton>
          </Nav>
        </LogoSection>
      </HeaderContent>
    </Header>
  );
}
