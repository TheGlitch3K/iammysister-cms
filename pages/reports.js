import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { Download, Users, CreditCard, Home, Heart, DollarSign, Target, AlertCircle, FileText, BarChart3, TrendingUp, Calendar, Share2 } from 'lucide-react';
import ReportsLayout from '../components/ReportsLayout';
import DemographicReports from '../components/Reports/DemographicReports';
import FinancialReports from '../components/Reports/FinancialReports';
import ProgramReports from '../components/Reports/ProgramReports';
import ChartWrapper from '../components/Reports/ChartWrapper';
import CustomReportBuilder from '../components/Reports/CustomReportBuilder';
import { ReportCalculations } from '../utils/reportCalculations';
import { ExportUtilities } from '../utils/exportUtilities';
import { useSistersData } from '../hooks/useSistersData';

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
  gap: 0.75rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: white;
  padding: 0.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  
  ${props => props.active ? `
    background: #14B8A6;
    color: white;
    box-shadow: 0 2px 4px rgba(20, 184, 166, 0.2);
  ` : `
    background: transparent;
    color: #6B7280;
    &:hover {
      background: #F3F4F6;
      color: #374151;
    }
  `}
`;

const ExportControls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.variant === 'pdf' ? '#EF4444' : props.variant === 'excel' ? '#10B981' : '#14B8A6'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const DateRangeSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #E5E7EB;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #14B8A6;
    ring: 2px solid rgba(20, 184, 166, 0.2);
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
`;

const REPORT_TABS = [
  { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'programs', label: 'Program Delivery', icon: Target },
  { id: 'financial', label: 'Financial & ROI', icon: DollarSign },
  { id: 'outcomes', label: 'Outcomes & Impact', icon: TrendingUp },
  { id: 'custom', label: 'Custom Reports', icon: FileText }
];

export default function Reports() {
  const { sisters, loading: dataLoading } = useSistersData();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year ago
    end: new Date().toISOString().split('T')[0]
  });
  const [exporting, setExporting] = useState(false);

  // Initialize export utilities
  const exportUtils = useMemo(() => new ExportUtilities(), []);

  // Process report data from sisters
  const reportData = useMemo(() => {
    if (!Array.isArray(sisters) || sisters.length === 0) {
      return null;
    }

    // Create the data structure for ReportCalculations
    const realData = {
      clients: sisters,
      volunteers: [], // Real volunteer data will be added when available
      donors: [], // Real donor data will be added when available  
      financials: [], // Real financial data will be added when available
      grants: [] // Real grant data will be added when available
    };

    return new ReportCalculations(realData);
  }, [sisters]);

  // Calculate enhanced stats from sisters data
  const enhancedStats = useMemo(() => {
    if (!Array.isArray(sisters) || sisters.length === 0) {
      return {
        total: 0,
        newClients: 0,
        housingReady: 0,
        avgMentalHealth: 0,
        totalSavings: 0,
        avgCreditScore: 0,
        completionRate: 0,
        avgIncomeIncrease: 0
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
    const avgCreditScore = Math.round(sisters.reduce((sum, s) => sum + (s.creditScore || 0), 0) / total);
    const qualifiedSisters = sisters.filter(s => s.status === 'qualified').length;
    const completionRate = total > 0 ? Math.round((qualifiedSisters / total) * 100) : 0;
    
    // Calculate estimated community value based on income improvements
    const estimatedValue = sisters.reduce((sum, s) => {
      const monthlyIncome = s.monthlyIncome || 0;
      const estimatedAnnualValue = monthlyIncome * 12 * 0.3; // 30% improvement factor
      return sum + estimatedAnnualValue;
    }, 0);

    return {
      total,
      newClients,
      housingReady,
      avgMentalHealth,
      totalSavings,
      avgCreditScore,
      completionRate,
      estimatedValue
    };
  }, [sisters]);

  const handleExport = async (data, type, format) => {
    try {
      setExporting(true);
      
      if (format === 'pdf') {
        const pdf = await exportUtils.exportToPDF(data, type);
        exportUtils.downloadPDF(pdf, `IAMS_${type}_Report`);
      } else if (format === 'excel') {
        const workbook = exportUtils.exportToExcel(data, type);
        exportUtils.downloadExcel(workbook, `IAMS_${type}_Report`);
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const handleBulkExport = async (format) => {
    if (!reportData) return;
    
    const combinedData = {
      clients: sisters,
      demographics: reportData.getDemographicBreakdown(),
      geographic: reportData.getGeographicDistribution(),
      serviceVolume: reportData.getServiceVolumeOverTime(),
      referralSources: reportData.getReferralSourceAnalysis(),
      needs: reportData.getNeedsAssessmentSummary(),
      outcomes: reportData.getOutcomeAchievement(),
      financial: reportData.getFinancialAnalysis(),
      roi: reportData.getROIAnalysis(),
      volunteers: reportData.getVolunteerEngagement()
    };
    
    await handleExport(combinedData, 'comprehensive', format);
  };

  if (dataLoading) {
    return (
      <ReportsLayout>
        <LoadingScreen>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            border: '4px solid #E5E7EB', 
            borderTop: '4px solid #14B8A6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem'
          }} />
          <div style={{ fontSize: '1.5rem', color: '#6B7280', marginBottom: '0.5rem' }}>
            Loading Enterprise Analytics
          </div>
          <div style={{ fontSize: '0.875rem', color: '#9CA3AF' }}>
            Calculating demographics, financials, and outcomes...
          </div>
        </LoadingScreen>
      </ReportsLayout>
    );
  }

  if (!reportData) {
    return (
      <ReportsLayout>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <AlertCircle size={48} style={{ color: '#EF4444', marginBottom: '1rem' }} />
          <div style={{ fontSize: '1.5rem', color: '#EF4444', marginBottom: '0.5rem' }}>
            Error Loading Reports
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
            Please refresh the page or contact support if the issue persists.
          </div>
        </div>
      </ReportsLayout>
    );
  }

  return (
    <ReportsLayout>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <PageHeader>
        <PageTitle>
          <BarChart3 size={32} style={{ color: '#14B8A6' }} />
          Enterprise Analytics & Reports
        </PageTitle>
        <ExportControls>
          <DateRangeSelector>
            <Calendar size={16} style={{ color: '#6B7280' }} />
            <DateInput
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <span style={{ color: '#6B7280' }}>to</span>
            <DateInput
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </DateRangeSelector>
          
          <ExportButton 
            variant="pdf" 
            onClick={() => handleBulkExport('pdf')}
            disabled={exporting}
          >
            <FileText size={16} />
            {exporting ? 'Exporting...' : 'Export PDF'}
          </ExportButton>
          
          <ExportButton 
            variant="excel" 
            onClick={() => handleBulkExport('excel')}
            disabled={exporting}
          >
            <Download size={16} />
            {exporting ? 'Exporting...' : 'Export Excel'}
          </ExportButton>
        </ExportControls>
      </PageHeader>

      {/* Navigation Tabs */}
      <TabsContainer>
        {REPORT_TABS.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <Tab
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              {tab.label}
            </Tab>
          );
        })}
      </TabsContainer>

      {/* Report Content */}
      {activeTab === 'overview' && (
        <div>
          <ChartWrapper
            title="Executive Dashboard"
            subtitle="High-level overview of all program metrics"
            borderColor="#14B8A6"
          >
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#14B8A6' }}>
                    {enhancedStats.total}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#6B7280' }}>Total Sisters Served</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#F59E0B' }}>
                    {enhancedStats.avgCreditScore}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#6B7280' }}>Average Credit Score</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#8B5CF6' }}>
                    {enhancedStats.completionRate}%
                  </div>
                  <div style={{ fontSize: '1rem', color: '#6B7280' }}>Program Success Rate</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#10B981' }}>
                    {enhancedStats.housingReady}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#6B7280' }}>Housing Ready</div>
                </div>
              </div>
              
              <div style={{ 
                background: 'linear-gradient(135deg, #14B8A6 0%, #F59E0B 100%)', 
                borderRadius: '1rem', 
                padding: '2rem', 
                color: 'white',
                marginTop: '2rem'
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                  I AM MY SISTER - Impact Report Summary
                </h3>
                <p style={{ fontSize: '1.125rem', opacity: '0.95', lineHeight: '1.6' }}>
                  Building women up from the inside out through comprehensive financial empowerment, 
                  homeownership programs, and entrepreneurship support. Our data-driven approach 
                  ensures every sister receives personalized support for lasting transformation.
                </p>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                  gap: '1rem',
                  marginTop: '1.5rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      ${Math.round(enhancedStats.totalSavings / 1000)}K
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      Collective Savings
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      {enhancedStats.avgMentalHealth}/10
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      Wellness Score
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                      ${Math.round(enhancedStats.estimatedValue / 1000)}K
                    </div>
                    <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>
                      Estimated Impact Value
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ChartWrapper>
        </div>
      )}

      {activeTab === 'demographics' && (
        <DemographicReports 
          data={reportData} 
          onExport={handleExport}
        />
      )}

      {activeTab === 'programs' && (
        <ProgramReports 
          data={reportData} 
          onExport={handleExport}
        />
      )}

      {activeTab === 'financial' && (
        <FinancialReports 
          data={reportData} 
          onExport={handleExport}
        />
      )}

      {activeTab === 'outcomes' && (
        <div>
          <ChartWrapper
            title="Outcome Achievement & Impact Analysis"
            subtitle="Measuring success across all programs"
            borderColor="#10B981"
          >
            <div style={{ padding: '2rem' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '2rem' 
              }}>
                {/* Success Metrics */}
                <div style={{ 
                  background: '#F0FDF4', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem',
                  border: '1px solid #BBF7D0'
                }}>
                  <h4 style={{ color: '#15803D', fontWeight: '600', marginBottom: '1rem' }}>
                    Program Success Rates
                  </h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803D' }}>
                      {enhancedStats.completionRate}%
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                      Overall completion rate
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                    • {enhancedStats.housingReady} sisters housing-ready<br/>
                    • {enhancedStats.avgCreditScore} average credit score<br/>
                    • {enhancedStats.total} total sisters enrolled
                  </div>
                </div>

                {/* Financial Impact */}
                <div style={{ 
                  background: '#FEF3C7', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem',
                  border: '1px solid #FCD34D'
                }}>
                  <h4 style={{ color: '#D97706', fontWeight: '600', marginBottom: '1rem' }}>
                    Financial Impact
                  </h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D97706' }}>
                      ${Math.round(enhancedStats.estimatedValue / 1000)}K
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#92400E' }}>
                      Estimated community value created
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#92400E' }}>
                    • ${Math.round(enhancedStats.totalSavings / 1000)}K collective savings<br/>
                    • {enhancedStats.avgCreditScore} average credit score<br/>
                    • {enhancedStats.housingReady} sisters ready for homeownership
                  </div>
                </div>

                {/* Well-being Outcomes */}
                <div style={{ 
                  background: '#EDE9FE', 
                  borderRadius: '0.75rem', 
                  padding: '1.5rem',
                  border: '1px solid #C4B5FD'
                }}>
                  <h4 style={{ color: '#7C3AED', fontWeight: '600', marginBottom: '1rem' }}>
                    Well-being Success
                  </h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#7C3AED' }}>
                      {enhancedStats.avgMentalHealth}/10
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#5B21B6' }}>
                      Average wellness score
                    </div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#5B21B6' }}>
                    • Holistic support approach<br/>
                    • Mental & emotional health focus<br/>
                    • Building from the inside out
                  </div>
                </div>
              </div>
            </div>
          </ChartWrapper>
        </div>
      )}

      {activeTab === 'custom' && (
        <ChartWrapper
          title="Custom Report Builder"
          subtitle="Select specific reports to export with checkboxes"
          borderColor="#8B5CF6"
        >
          <CustomReportBuilder 
            data={reportData} 
            onExport={handleExport}
            exporting={exporting}
          />
        </ChartWrapper>
      )}
    </ReportsLayout>
  );
}
