import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FileText, Download, Check, Users, DollarSign, BarChart3, Target, TrendingUp, Calendar } from 'lucide-react';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6B7280;
  font-size: 1rem;
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ReportCard = styled.div`
  background: white;
  border: 2px solid ${props => props.selected ? '#14B8A6' : '#E5E7EB'};
  border-radius: 0.75rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #14B8A6;
    box-shadow: 0 4px 12px rgba(20, 184, 166, 0.15);
  }

  ${props => props.selected && `
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%);
  `}
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: ${props => props.color}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CheckboxContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  border: 2px solid ${props => props.checked ? '#14B8A6' : '#D1D5DB'};
  border-radius: 0.375rem;
  background: ${props => props.checked ? '#14B8A6' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const CardFeatures = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6B7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;

  &:before {
    content: '•';
    color: #14B8A6;
    font-weight: bold;
  }
`;

const ExportSection = styled.div`
  background: linear-gradient(135deg, #14B8A6 0%, #F59E0B 100%);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  color: white;
`;

const ExportTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${props => props.variant === 'pdf' ? '#EF4444' : '#10B981'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const AVAILABLE_REPORTS = [
  {
    id: 'executive',
    title: 'Executive Dashboard',
    description: 'High-level overview with key performance indicators for board meetings and leadership briefings.',
    icon: BarChart3,
    color: '#14B8A6',
    features: [
      'Total sisters served and program enrollment',
      'Financial performance and ROI metrics', 
      'Success rate summaries across all programs',
      'Community impact visualization'
    ]
  },
  {
    id: 'demographics',
    title: 'Demographic Analysis',
    description: 'Comprehensive breakdown of client demographics and geographic distribution.',
    icon: Users,
    color: '#8B5CF6',
    features: [
      'Age, gender, and ethnicity breakdowns',
      'Geographic distribution by zip code',
      'Household composition analysis',
      'Referral source tracking'
    ]
  },
  {
    id: 'financial',
    title: 'Financial Performance',
    description: 'Budget tracking, cost analysis, and return on investment calculations.',
    icon: DollarSign,
    color: '#F59E0B',
    features: [
      'Budget vs actual spending analysis',
      'Cost per client calculations',
      'Program expense breakdowns',
      'ROI and value creation metrics'
    ]
  },
  {
    id: 'programs',
    title: 'Program Delivery',
    description: 'Service volume trends, completion rates, and program effectiveness metrics.',
    icon: Target,
    color: '#10B981',
    features: [
      'Monthly service volume trends',
      'Program completion rates',
      'Resource allocation analysis',
      'Needs assessment summaries'
    ]
  },
  {
    id: 'outcomes',
    title: 'Outcomes & Impact',
    description: 'Success measurements and long-term impact tracking across all programs.',
    icon: TrendingUp,
    color: '#EF4444',
    features: [
      '3, 6, and 12-month success tracking',
      'Employment and housing outcomes',
      'Credit score and income improvements',
      'Community value creation estimates'
    ]
  },
  {
    id: 'comprehensive',
    title: 'Comprehensive Report',
    description: 'Complete analytics package combining all report types for grant applications.',
    icon: FileText,
    color: '#6366F1',
    features: [
      'All demographic and financial data',
      'Complete program performance metrics',
      'Full outcome achievement analysis',
      'Executive summary with recommendations'
    ]
  }
];

export default function CustomReportBuilder({ data, onExport, exporting }) {
  const [selectedReports, setSelectedReports] = useState(['executive']);

  const toggleReport = (reportId) => {
    setSelectedReports(prev => {
      if (prev.includes(reportId)) {
        return prev.filter(id => id !== reportId);
      } else {
        return [...prev, reportId];
      }
    });
  };

  const handleExport = async (format) => {
    if (selectedReports.length === 0) {
      alert('Please select at least one report to export.');
      return;
    }

    try {
      // Prepare data for selected reports
      const reportData = {};
      
      selectedReports.forEach(reportId => {
        switch (reportId) {
          case 'executive':
            reportData.executive = {
              totalClients: data?.clients?.length || 0,
              financial: data.getFinancialAnalysis(),
              roi: data.getROIAnalysis(),
              volunteers: data.getVolunteerEngagement()
            };
            break;
          case 'demographics':
            reportData.demographics = data.getDemographicBreakdown();
            reportData.geographic = data.getGeographicDistribution();
            break;
          case 'financial':
            reportData.financial = data.getFinancialAnalysis();
            reportData.roi = data.getROIAnalysis();
            break;
          case 'programs':
            reportData.serviceVolume = data.getServiceVolumeOverTime();
            reportData.referralSources = data.getReferralSourceAnalysis();
            reportData.needs = data.getNeedsAssessmentSummary();
            break;
          case 'outcomes':
            reportData.outcomes = data.getOutcomeAchievement();
            break;
          case 'comprehensive':
            reportData.comprehensive = {
              demographics: data.getDemographicBreakdown(),
              geographic: data.getGeographicDistribution(),
              serviceVolume: data.getServiceVolumeOverTime(),
              referralSources: data.getReferralSourceAnalysis(),
              needs: data.getNeedsAssessmentSummary(),
              outcomes: data.getOutcomeAchievement(),
              financial: data.getFinancialAnalysis(),
              roi: data.getROIAnalysis(),
              volunteers: data.getVolunteerEngagement()
            };
            break;
        }
      });

      // Call export function with selected data
      await onExport(reportData, 'custom', format);
      
    } catch (error) {
      console.error('Custom export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <Container>
      <Header>
        <FileText size={64} style={{ color: '#8B5CF6', marginBottom: '1rem' }} />
        <Title>Custom Report Builder</Title>
        <Subtitle>
          Select the reports you need and export them as PDF or Excel workbooks
        </Subtitle>
      </Header>

      <ReportGrid>
        {AVAILABLE_REPORTS.map((report) => {
          const IconComponent = report.icon;
          const isSelected = selectedReports.includes(report.id);
          
          return (
            <ReportCard
              key={report.id}
              selected={isSelected}
              onClick={() => toggleReport(report.id)}
            >
              <CheckboxContainer checked={isSelected}>
                {isSelected && <Check size={16} style={{ color: 'white' }} />}
              </CheckboxContainer>
              
              <IconContainer color={report.color}>
                <IconComponent size={24} style={{ color: report.color }} />
              </IconContainer>
              
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
              
              <CardFeatures>
                {report.features.map((feature, index) => (
                  <Feature key={index}>{feature}</Feature>
                ))}
              </CardFeatures>
            </ReportCard>
          );
        })}
      </ReportGrid>

      <ExportSection>
        <ExportTitle>
          Export Selected Reports ({selectedReports.length} selected)
        </ExportTitle>
        <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>
          Professional reports with I AM MY SISTER branding for board meetings, 
          grant applications, and stakeholder presentations.
        </p>
        
        {selectedReports.length === 0 && (
          <p style={{ opacity: 0.8, fontSize: '0.875rem' }}>
            Please select at least one report above to enable export.
          </p>
        )}

        <ExportButtons>
          <ExportButton
            variant="pdf"
            onClick={() => handleExport('pdf')}
            disabled={exporting || selectedReports.length === 0}
          >
            <FileText size={16} />
            {exporting ? 'Exporting...' : 'Export as PDF'}
          </ExportButton>
          
          <ExportButton
            variant="excel"
            onClick={() => handleExport('excel')}
            disabled={exporting || selectedReports.length === 0}
          >
            <Download size={16} />
            {exporting ? 'Exporting...' : 'Export as Excel'}
          </ExportButton>
        </ExportButtons>

        {selectedReports.length > 0 && (
          <p style={{ opacity: 0.8, fontSize: '0.875rem', marginTop: '1rem' }}>
            Selected: {selectedReports.map(id => 
              AVAILABLE_REPORTS.find(r => r.id === id)?.title
            ).join(', ')}
          </p>
        )}
      </ExportSection>
    </Container>
  );
}
