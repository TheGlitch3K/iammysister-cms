import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { CheckCircle, Home, Users } from 'lucide-react';
import Logo from '../components/Logo';
import Link from 'next/link';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #F9FAFB 0%, #EDE9FE 100%);
`;

const Header = styled.header`
  background: #111827;
  color: white;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const MainContent = styled.main`
  max-width: 600px;
  margin: 4rem auto;
  padding: 0 1rem;
`;

const SuccessCard = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #14B8A6;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(20, 184, 166, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #6B7280;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const MessageBox = styled.div`
  background: linear-gradient(135deg, #F0FDFA 0%, #FEF3C7 100%);
  border: 2px solid #14B8A6;
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
  text-align: left;
`;

const MessageTitle = styled.h3`
  color: #14B8A6;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MessageText = styled.p`
  color: #374151;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const NextSteps = styled.div`
  background: #F9FAFB;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const StepsList = styled.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const StepItem = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: start;
  margin-bottom: 1rem;
  
  &:before {
    content: counter(step-counter);
    background: #14B8A6;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`;

const ContactInfo = styled.div`
  background: #EDE9FE;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const ContactTitle = styled.h4`
  color: #5B21B6;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContactDetails = styled.div`
  color: #374151;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  color: white;
`;

const SecondaryButton = styled(Button)`
  background: white;
  color: #374151;
  border: 2px solid #E5E7EB;
`;

export default function QuestionnaireComplete() {
  const [mounted, setMounted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setReferenceId(`IAMS-${Date.now()}`);
    setCurrentDate(now.toLocaleDateString());
    setCurrentTime(now.toLocaleTimeString());
  }, []);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo size="small" />
        </HeaderContent>
      </Header>

      <MainContent>
        <SuccessCard>
          <SuccessIcon>
            <CheckCircle size={40} color="white" />
          </SuccessIcon>
          
          <Title>Thank You, Sister! 💛</Title>
          <Subtitle>
            Your check-in has been successfully submitted. We're honored to continue this journey with you.
          </Subtitle>

          <MessageBox>
            <MessageTitle>
              <Users size={20} />
              You're Part of Our Sisterhood
            </MessageTitle>
            <MessageText>
              Your submission has been received and our team has been notified. We understand that every sister's journey is unique, and we're here to provide the support you need to reach your goals.
            </MessageText>
            <MessageText>
              Based on your responses, we'll connect you with the right resources and support within our I AM MY SISTER community.
            </MessageText>
          </MessageBox>

          <NextSteps>
            <h3 style={{ color: '#14B8A6', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
              What Happens Next?
            </h3>
            <StepsList>
              <StepItem>
                <div>
                  <strong>Personal Outreach:</strong> A member of our team will contact you within 2 business days to discuss your specific needs and goals.
                </div>
              </StepItem>
              <StepItem>
                <div>
                  <strong>Resource Connection:</strong> We'll connect you with relevant programs, workshops, and support services based on your responses.
                </div>
              </StepItem>
              <StepItem>
                <div>
                  <strong>Sisterhood Network:</strong> You'll be invited to join our community events and connect with other sisters on similar journeys.
                </div>
              </StepItem>
              <StepItem>
                <div>
                  <strong>Ongoing Support:</strong> We'll check in regularly to ensure you have the resources and encouragement you need to succeed.
                </div>
              </StepItem>
            </StepsList>
          </NextSteps>

          <ContactInfo>
            <ContactTitle>Need Immediate Support?</ContactTitle>
            <ContactDetails>
              If you indicated that you need to talk ASAP or have urgent needs, please don't hesitate to reach out immediately:
              <br /><br />
              <strong>Phone:</strong> (314) 555-IAMS (4267)<br />
              <strong>Email:</strong> support@iammysister.org<br />
              <strong>Emergency:</strong> If this is a crisis, please call 988 (Suicide & Crisis Lifeline)
            </ContactDetails>
          </ContactInfo>

          <ButtonGroup>
            <Link href="/" passHref>
              <PrimaryButton>
                <Home size={20} />
                Return to Home
              </PrimaryButton>
            </Link>
            <SecondaryButton onClick={() => window.print()}>
              Print Confirmation
            </SecondaryButton>
          </ButtonGroup>

          {mounted && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: '#F9FAFB', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
              <strong>Reference ID:</strong> {referenceId}<br />
              <strong>Submitted:</strong> {currentDate} at {currentTime}
            </div>
          )}
        </SuccessCard>
      </MainContent>
    </Container>
  );
}
