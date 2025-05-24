import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Send } from 'lucide-react';
import Logo from '../components/Logo';

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

const FormContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem 2rem;
`;

const FormHeader = styled.div`
  background: white;
  border-radius: 1rem 1rem 0 0;
  padding: 2rem;
  text-align: center;
  border-top: 4px solid #FCD34D;
`;

const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const FormDescription = styled.p`
  color: #6B7280;
  font-size: 1.125rem;
`;

const FormSection = styled.section`
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #E5E7EB;
  
  &:last-child {
    border-bottom: none;
    border-radius: 0 0 1rem 1rem;
    padding-bottom: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #14B8A6;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  
  .required {
    color: #EF4444;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #14B8A6;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: start;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #14B8A6;
    margin-top: 0.125rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }
`;

const ScaleContainer = styled.div`
  margin-top: 1rem;
`;

const ScaleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6B7280;
`;

const ScaleOptions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ScaleButton = styled.label`
  flex: 1;
  text-align: center;
  
  input[type="radio"] {
    display: none;
  }
  
  span {
    display: block;
    padding: 0.75rem;
    border: 2px solid #E5E7EB;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
    font-size: 0.875rem;
    
    &:hover {
      border-color: #14B8A6;
      background: #F0FDFA;
    }
  }
  
  input[type="radio"]:checked + span {
    background: #14B8A6;
    color: white;
    border-color: #14B8A6;
  }

  @media (max-width: 640px) {
    span {
      padding: 0.5rem 0.25rem;
      font-size: 0.75rem;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #14B8A6 0%, #FCD34D 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    mentalScore: '',
    housingStatus: '',
    homePurchaseSpecify: '',
    realtorInfo: '',
    lenderInfo: '',
    propertyAddress: '',
    closingDate: '',
    creditScore: '',
    creditReviewed: '',
    overdraftFreq: '',
    lateFees: '',
    hasSavings: '',
    savingsAmount: '',
    monthlyIncome: '',
    employmentLength: '',
    employmentLengthOther: '',
    continuousEmployment: '',
    unemploymentReason: '',
    multipleIncome: '',
    additionalIncomeAmount: '',
    additionalIncomeFrequency: '',
    assets: [],
    savingsPercentage: '',
    budgetFrequency: '',
    largePurchases: '',
    hasChecking: '',
    altFinancial: '',
    alternativeFinancialOther: '',
    notBankedReasons: [],
    notBankedOther: '',
    householdSize: '',
    primaryEarner: '',
    financialAssist: '',
    supportNeeded: '',
    itemsNeeded: '',
    additionalNotes: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'assets' || name === 'notBankedReasons') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Map form data to API format
      const mappedClient = {
        // Basic information
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        
        // Mental health (convert to number)
        mentalScore: parseInt(formData.mentalScore) || 0,
        
        // Housing status mapping
        housingStatus: formData.housingStatus || 'Looking',
        realtorInfo: formData.realtorInfo || '',
        lenderInfo: formData.lenderInfo || '',
        propertyAddress: formData.propertyAddress || '',
        closingDate: formData.closingDate || '',
        
        // Financial information
        creditScore: formData.creditScore,
        creditReviewed: formData.creditReviewed,
        overdraftFreq: formData.overdraftFreq,
        lateFees: formData.lateFees,
        hasSavings: formData.hasSavings,
        savingsAmount: formData.savingsAmount || 0,
        monthlyIncome: formData.monthlyIncome,
        employmentLength: formData.employmentLength,
        continuousEmployment: formData.continuousEmployment,
        multipleIncome: formData.multipleIncome,
        
        // Assets (convert array to string)
        assets: Array.isArray(formData.assets) ? formData.assets.join(', ') : (formData.assets || 'None'),
        savingsPercentage: formData.savingsPercentage,
        budgetFrequency: formData.budgetFrequency,
        largePurchases: formData.largePurchases,
        hasChecking: formData.hasChecking,
        altFinancial: formData.altFinancial,
        
        // Household information
        householdSize: formData.householdSize,
        primaryEarner: formData.primaryEarner,
        financialAssist: formData.financialAssist,
        
        // Support needs
        supportNeeded: formData.supportNeeded,
        itemsNeeded: formData.itemsNeeded || 'None',
        additionalNotes: formData.additionalNotes,
        
        // System fields
        timestamp: new Date().toISOString(),
        status: 'new'
      };

      console.log('Submitting client data:', mappedClient);

      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client: mappedClient
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (result.success) {
        // Redirect to completion page
        window.location.href = '/questionnaire-complete';
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo size="small" />
        </HeaderContent>
      </Header>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormHeader>
            <FormTitle>
              IAMS Alumni Check-In <span style={{ color: '#FCD34D' }}>💛</span>
            </FormTitle>
            <FormDescription>
              Building Women Up From The Inside Out
            </FormDescription>
          </FormHeader>

          {/* Basic Information */}
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            
            <FormGroup>
              <Label>First Name <span className="required">*</span></Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Last Name <span className="required">*</span></Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Phone <span className="required">*</span></Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Email <span className="required">*</span></Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                On a scale of 1-10 How are you doing mentally and emotionally? <span className="required">*</span>
              </Label>
              <ScaleContainer>
                <ScaleLabels>
                  <span>I need to talk ASAP</span>
                  <span>Life happens but great right now!</span>
                </ScaleLabels>
                <ScaleOptions>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <ScaleButton key={num}>
                      <input
                        type="radio"
                        name="mentalScore"
                        value={num}
                        onChange={handleInputChange}
                        required
                      />
                      <span>{num}</span>
                    </ScaleButton>
                  ))}
                </ScaleOptions>
              </ScaleContainer>
            </FormGroup>
          </FormSection>

          {/* Status of Home Purchase */}
          <FormSection>
            <SectionTitle>Status of Home Purchase</SectionTitle>
            
            <FormGroup>
              <Label>Please select one of the following. <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="housingStatus"
                    value="Pre-approved"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Pre-Approved and Searching for My Home</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="housingStatus"
                    value="Under contract"
                    onChange={handleInputChange}
                  />
                  <span>Under Contract</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="housingStatus"
                    value="Closed"
                    onChange={handleInputChange}
                  />
                  <span>Closed</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="housingStatus"
                    value="Planning"
                    onChange={handleInputChange}
                  />
                  <span>Planning to Purchase My Home Soon</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="housingStatus"
                    value="Other"
                    onChange={handleInputChange}
                  />
                  <span>Other</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            {formData.housingStatus === 'Other' && (
              <FormGroup>
                <Label>Please Specify</Label>
                <Input
                  type="text"
                  name="homePurchaseSpecify"
                  value={formData.homePurchaseSpecify}
                  onChange={handleInputChange}
                />
              </FormGroup>
            )}

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#14B8A6' }}>
              Realtor, Lender, and Property Information
            </h3>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
              If applicable, provide the following details for your current home purchase:
            </p>

            <FormGroup>
              <Label>Realtor Contact Information</Label>
              <Input
                type="text"
                name="realtorInfo"
                value={formData.realtorInfo}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Lender Information</Label>
              <Input
                type="text"
                name="lenderInfo"
                value={formData.lenderInfo}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Property Address</Label>
              <Input
                type="text"
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Closing Date</Label>
              <Input
                type="date"
                name="closingDate"
                value={formData.closingDate}
                onChange={handleInputChange}
              />
            </FormGroup>
          </FormSection>

          {/* Credit and Financial Health */}
          <FormSection>
            <SectionTitle>Credit and Financial Health</SectionTitle>
            
            <FormGroup>
              <Label>What is your current credit score? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditScore"
                    value="Below 500"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Below 500</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditScore"
                    value="500–599"
                    onChange={handleInputChange}
                  />
                  <span>500–599</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditScore"
                    value="600–699"
                    onChange={handleInputChange}
                  />
                  <span>600–699</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditScore"
                    value="700+"
                    onChange={handleInputChange}
                  />
                  <span>700+</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditScore"
                    value="I don't know my credit score."
                    onChange={handleInputChange}
                  />
                  <span>I don't know my credit score.</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Have you reviewed your credit report in the past 12 months? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditReviewed"
                    value="Yes"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Yes</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="creditReviewed"
                    value="No"
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>How often do you incur overdraft fees on your bank account? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="overdraftFreq"
                    value="Never"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Never</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="overdraftFreq"
                    value="1–2 times per month"
                    onChange={handleInputChange}
                  />
                  <span>1–2 times per month</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="overdraftFreq"
                    value="3–5 times per month"
                    onChange={handleInputChange}
                  />
                  <span>3–5 times per month</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="overdraftFreq"
                    value="More than 5 times per month"
                    onChange={handleInputChange}
                  />
                  <span>More than 5 times per month</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Have you been charged late fees on bills or loans in the past 12 months? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="lateFees"
                    value="Yes"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Yes</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="lateFees"
                    value="No"
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Do you currently have a savings account? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="hasSavings"
                    value="Yes"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Yes</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="hasSavings"
                    value="No"
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            {formData.hasSavings === 'Yes' && (
              <FormGroup>
                <Label>If yes, how much do you have in savings? <span className="required">*</span></Label>
                <RadioGroup>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="savingsAmount"
                      value="Less than $500"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Less than $500</span>
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="savingsAmount"
                      value="$500–$1,000"
                      onChange={handleInputChange}
                    />
                    <span>$500–$1,000</span>
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="savingsAmount"
                      value="$1,000–$5,000"
                      onChange={handleInputChange}
                    />
                    <span>$1,000–$5,000</span>
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="savingsAmount"
                      value="More than $5,000"
                      onChange={handleInputChange}
                    />
                    <span>More than $5,000</span>
                  </RadioLabel>
                </RadioGroup>
              </FormGroup>
            )}
          </FormSection>

          {/* Family Size and Support System */}
          <FormSection>
            <SectionTitle>Family Size and Support System</SectionTitle>
            
            <FormGroup>
              <Label>How many people are in your household (including yourself)? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="householdSize"
                    value="1"
                    onChange={handleInputChange}
                    required
                  />
                  <span>1</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="householdSize"
                    value="2"
                    onChange={handleInputChange}
                  />
                  <span>2</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="householdSize"
                    value="3–4"
                    onChange={handleInputChange}
                  />
                  <span>3–4</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="householdSize"
                    value="5 or more"
                    onChange={handleInputChange}
                  />
                  <span>5 or more</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Are you the primary income earner for your household? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="primaryEarner"
                    value="Yes"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Yes</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="primaryEarner"
                    value="No"
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Do you currently receive any financial assistance (e.g., child support, government benefits)? <span className="required">*</span></Label>
              <RadioGroup>
                <RadioLabel>
                  <input
                    type="radio"
                    name="financialAssist"
                    value="Yes"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Yes</span>
                </RadioLabel>
                <RadioLabel>
                  <input
                    type="radio"
                    name="financialAssist"
                    value="No"
                    onChange={handleInputChange}
                  />
                  <span>No</span>
                </RadioLabel>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>In what areas could you use more support at the moment? <span className="required">*</span></Label>
              <TextArea
                name="supportNeeded"
                value={formData.supportNeeded}
                onChange={handleInputChange}
                required
                placeholder="Please describe the areas where you need support..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Are there items you need for yourself or for your children? (Food, children's clothing, period products, diapers, etc.)</Label>
              <TextArea
                name="itemsNeeded"
                value={formData.itemsNeeded}
                onChange={handleInputChange}
                placeholder="Please list any items you need..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Is there anything else you would like us to know? <span className="required">*</span></Label>
              <TextArea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                required
                placeholder="Please share any additional information..."
                style={{ minHeight: '120px' }}
              />
            </FormGroup>
          </FormSection>

          {/* Submit Button Section */}
          <FormSection>
            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send size={20} />
                  Submit Check-In
                </>
              )}
            </SubmitButton>
          </FormSection>
        </form>
      </FormContainer>
    </Container>
  );
}
