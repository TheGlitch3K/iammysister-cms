import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import ChartWrapper from './ChartWrapper';

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.color || '#14B8A6'};
`;

const MetricValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: #6B7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MetricSubtext = styled.div`
  font-size: 0.75rem;
  color: #9CA3AF;
  margin-top: 0.25rem;
`;

const COLORS = {
  primary: '#14B8A6',
  secondary: '#F59E0B',
  tertiary: '#8B5CF6',
  quaternary: '#EF4444',
  quinary: '#10B981',
  senary: '#F97316',
  septenary: '#6366F1',
  octonary: '#EC4899'
};

const REFERRAL_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.quinary, COLORS.senary, COLORS.septenary, COLORS.octonary];

const ProgramReports = ({ data, onExport }) => {
  const serviceVolumeData = useMemo(() => {
    if (!data?.getServiceVolumeOverTime) return [];
    return data.getServiceVolumeOverTime(12);
  }, [data]);

  const referralData = useMemo(() => {
    if (!data?.getReferralSourceAnalysis) return [];
    return data.getReferralSourceAnalysis();
  }, [data]);

  const needsData = useMemo(() => {
    if (!data?.getNeedsAssessmentSummary) return [];
    return data.getNeedsAssessmentSummary();
  }, [data]);

  const outcomeData = useMemo(() => {
    if (!data?.getOutcomeAchievement) return null;
    return data.getOutcomeAchievement();
  }, [data]);

  // Calculate program metrics
  const programMetrics = useMemo(() => {
    const totalIntakes = serviceVolumeData.reduce((sum, month) => sum + month.intakes, 0);
    const totalSessions = serviceVolumeData.reduce((sum, month) => sum + month.sessions, 0);
    const totalResources = serviceVolumeData.reduce((sum, month) => sum + month.resources, 0);
    const avgIntakesPerMonth = totalIntakes / Math.max(serviceVolumeData.length, 1);
    
    return {
      totalIntakes,
      totalSessions,
      totalResources,
      avgIntakesPerMonth: avgIntakesPerMonth.toFixed(1)
    };
  }, [serviceVolumeData]);

  // Outcome achievement rates
  const outcomeRates = useMemo(() => {
    if (!outcomeData) return {};
    
    const calculate = (period) => {
      const data = outcomeData[period];
      if (data.total === 0) return { total: 0, rates: {} };
      
      return {
        total: data.total,
        rates: {
          jobPlacement: ((data.jobPlacement / data.total) * 100).toFixed(1),
          stableHousing: ((data.stableHousing / data.total) * 100).toFixed(1),
          increasedIncome: ((data.increasedIncome / data.total) * 100).toFixed(1),
          improvedCredit: ((data.improvedCredit / data.total) * 100).toFixed(1),
          completedProgram: ((data.completedProgram / data.total) * 100).toFixed(1)
        }
      };
    };

    return {
      '3Month': calculate('3Month'),
      '6Month': calculate('6Month'),
      '12Month': calculate('12Month')
    };
  }, [outcomeData]);

  const handleExportProgram = () => {
    if (onExport) {
      onExport({
        serviceVolume: serviceVolumeData,
        referralSources: referralData,
        needs: needsData,
        outcomes: outcomeData,
        metrics: programMetrics
      }, 'program');
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!serviceVolumeData.length) {
    return (
      <ChartWrapper title="Program Delivery Reports" loading={true} />
    );
  }

  return (
    <div>
      {/* Program Metrics */}
      <MetricsGrid>
        <MetricCard color={COLORS.primary}>
          <MetricValue>{programMetrics.totalIntakes}</MetricValue>
          <MetricLabel>Total Intakes</MetricLabel>
          <MetricSubtext>Past 12 months</MetricSubtext>
        </MetricCard>

        <MetricCard color={COLORS.secondary}>
          <MetricValue>{programMetrics.avgIntakesPerMonth}</MetricValue>
          <MetricLabel>Avg Monthly Intakes</MetricLabel>
          <MetricSubtext>Monthly average</MetricSubtext>
        </MetricCard>

        <MetricCard color={COLORS.tertiary}>
          <MetricValue>{programMetrics.totalSessions}</MetricValue>
          <MetricLabel>Program Sessions</MetricLabel>
          <MetricSubtext>Total delivered</MetricSubtext>
        </MetricCard>

        <MetricCard color={COLORS.quaternary}>
          <MetricValue>{programMetrics.totalResources}</MetricValue>
          <MetricLabel>Resources Provided</MetricLabel>
          <MetricSubtext>Direct support items</MetricSubtext>
        </MetricCard>

        <MetricCard color={COLORS.quinary}>
          <MetricValue>{referralData.length}</MetricValue>
          <MetricLabel>Referral Sources</MetricLabel>
          <MetricSubtext>Active channels</MetricSubtext>
        </MetricCard>

        <MetricCard color={COLORS.senary}>
          <MetricValue>{needsData.length}</MetricValue>
          <MetricLabel>Need Categories</MetricLabel>
          <MetricSubtext>Areas of support</MetricSubtext>
        </MetricCard>
      </MetricsGrid>

      {/* Charts Grid */}
      <ReportsGrid>
        {/* Service Volume Over Time */}
        <ChartWrapper
          title="Service Volume Trends"
          subtitle="Monthly intake and service delivery tracking"
          borderColor={COLORS.primary}
          onExport={handleExportProgram}
          id="service-volume-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={serviceVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="intakes"
                stackId="1"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                name="New Intakes"
              />
              <Area
                type="monotone"
                dataKey="sessions"
                stackId="1"
                stroke={COLORS.secondary}
                fill={COLORS.secondary}
                name="Program Sessions"
              />
              <Area
                type="monotone"
                dataKey="resources"
                stackId="1"
                stroke={COLORS.tertiary}
                fill={COLORS.tertiary}
                name="Resources Provided"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Referral Sources */}
        <ChartWrapper
          title="Referral Source Effectiveness"
          subtitle="Which channels bring in the most sisters"
          borderColor={COLORS.secondary}
          onExport={handleExportProgram}
          id="referral-sources-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={referralData.filter(item => item.count > 0)}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percentage }) => `${source}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {referralData.filter(item => item.count > 0).map((entry, index) => (
                  <Cell key={`referral-cell-${index}`} fill={REFERRAL_COLORS[index % REFERRAL_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, 'Count']}
                labelFormatter={(label) => `Source: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Needs Assessment */}
        <ChartWrapper
          title="Primary Needs Assessment"
          subtitle="Most common support areas identified"
          borderColor={COLORS.tertiary}
          onExport={handleExportProgram}
          id="needs-assessment-chart"
          height="400px"
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={needsData.slice(0, 8)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="need" type="category" width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="count" name="Count">
                {needsData.slice(0, 8).map((entry, index) => (
                  <Cell key={`need-cell-${index}`} fill={REFERRAL_COLORS[index % REFERRAL_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Outcome Achievement Tracking */}
        {outcomeData && (
          <ChartWrapper
            title="Outcome Achievement Rates"
            subtitle="Success rates at 3, 6, and 12 month intervals"
            borderColor={COLORS.quinary}
            onExport={handleExportProgram}
            id="outcome-achievement-chart"
          >
            <div style={{ padding: '1rem' }}>
              {Object.entries(outcomeRates).map(([period, data]) => (
                <div key={period} style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ 
                    margin: '0 0 0.75rem 0', 
                    color: '#374151', 
                    fontWeight: '600',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>{period.replace('Month', ' Month')} Outcomes</span>
                    <span style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '500', 
                      color: '#6B7280' 
                    }}>
                      {data.total} Sisters Eligible
                    </span>
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                    gap: '0.75rem' 
                  }}>
                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#F0FDF4', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#15803D' }}>
                        {data.rates.jobPlacement}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#166534' }}>Job Placement</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#FEF3C7', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#D97706' }}>
                        {data.rates.stableHousing}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#92400E' }}>Stable Housing</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#EDE9FE', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#7C3AED' }}>
                        {data.rates.increasedIncome}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#5B21B6' }}>Income Increase</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#FEE2E2', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#DC2626' }}>
                        {data.rates.improvedCredit}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#991B1B' }}>Credit Improvement</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '0.75rem', background: '#E0F2FE', borderRadius: '0.5rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0369A1' }}>
                        {data.rates.completedProgram}%
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#0C4A6E' }}>Program Completion</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartWrapper>
        )}
      </ReportsGrid>

      {/* Detailed Program Analytics */}
      <div style={{ marginTop: '2rem' }}>
        <ChartWrapper
          title="Detailed Program Analytics"
          subtitle="Comprehensive program delivery and outcome tracking"
          borderColor={COLORS.primary}
          height="auto"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Service Volume Details */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Monthly Service Volume</h4>
              <div style={{ background: '#F9FAFB', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto auto auto auto', 
                  gap: '0.5rem',
                  padding: '0.75rem 1rem',
                  background: '#F3F4F6',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  color: '#374151'
                }}>
                  <div>Month</div>
                  <div>Intakes</div>
                  <div>Sessions</div>
                  <div>Follow-ups</div>
                  <div>Resources</div>
                </div>
                
                {serviceVolumeData.slice(-6).map((item, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto auto auto', 
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderBottom: index < 5 ? '1px solid #E5E7EB' : 'none',
                    fontSize: '0.875rem'
                  }}>
                    <div>{item.month}</div>
                    <div>{item.intakes}</div>
                    <div>{item.sessions}</div>
                    <div>{item.followUps}</div>
                    <div>{item.resources}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Source Details */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Referral Source Performance</h4>
              <div style={{ background: '#F9FAFB', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto auto', 
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  background: '#F3F4F6',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <div>Source</div>
                  <div>Count</div>
                  <div>%</div>
                </div>
                
                {referralData.slice(0, 8).map((source, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto', 
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderBottom: index < 7 ? '1px solid #E5E7EB' : 'none',
                    fontSize: '0.875rem'
                  }}>
                    <div>{source.source}</div>
                    <div>{source.count}</div>
                    <div>{source.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartWrapper>
      </div>
    </div>
  );
};

export default ProgramReports;
