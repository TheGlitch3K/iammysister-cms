import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartWrapper from './ChartWrapper';

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GeographicTable = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #F3F4F6;
  
  &:hover {
    background: #F9FAFB;
  }
`;

const TableHeader = styled(TableRow)`
  background: #F3F4F6;
  font-weight: 600;
  color: #374151;
`;

const SummaryStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-top: 3px solid ${props => props.color || '#14B8A6'};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
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

const AGE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.quinary, COLORS.senary, COLORS.septenary];
const GENDER_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary];
const ETHNICITY_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.quinary, COLORS.senary, COLORS.septenary, COLORS.octonary];

const DemographicReports = ({ data, onExport }) => {
  const demographicData = useMemo(() => {
    if (!data?.getDemographicBreakdown) return null;
    return data.getDemographicBreakdown();
  }, [data]);

  const geographicData = useMemo(() => {
    if (!data?.getGeographicDistribution) return null;
    return data.getGeographicDistribution();
  }, [data]);

  const ageChartData = useMemo(() => {
    if (!demographicData) return [];
    return Object.entries(demographicData.ageGroups)
      .filter(([_, count]) => count > 0)
      .map(([age, count]) => ({
        name: age,
        value: count,
        percentage: ((count / demographicData.totalClients) * 100).toFixed(1)
      }));
  }, [demographicData]);

  const genderChartData = useMemo(() => {
    if (!demographicData) return [];
    return Object.entries(demographicData.genderBreakdown)
      .filter(([_, count]) => count > 0)
      .map(([gender, count]) => ({
        name: gender,
        value: count,
        percentage: ((count / demographicData.totalClients) * 100).toFixed(1)
      }));
  }, [demographicData]);

  const ethnicityChartData = useMemo(() => {
    if (!demographicData) return [];
    return Object.entries(demographicData.ethnicityBreakdown)
      .filter(([_, count]) => count > 0)
      .map(([ethnicity, count]) => ({
        name: ethnicity,
        value: count,
        percentage: ((count / demographicData.totalClients) * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);
  }, [demographicData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          border: '1px solid #E5E7EB',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>{data.name}</p>
          <p style={{ margin: '0', color: '#6B7280' }}>Count: {data.value}</p>
          <p style={{ margin: '0', color: '#6B7280' }}>Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const handleExportDemographics = () => {
    if (onExport) {
      onExport(demographicData, 'demographic');
    }
  };

  if (!demographicData) {
    return (
      <ChartWrapper title="Demographic Analysis" loading={true} />
    );
  }

  return (
    <div>
      {/* Summary Statistics */}
      <SummaryStats>
        <StatCard color={COLORS.primary}>
          <StatValue>{demographicData.totalClients}</StatValue>
          <StatLabel>Total Sisters</StatLabel>
        </StatCard>
        <StatCard color={COLORS.secondary}>
          <StatValue>{Object.keys(demographicData.ageGroups).filter(age => demographicData.ageGroups[age] > 0).length}</StatValue>
          <StatLabel>Age Groups Represented</StatLabel>
        </StatCard>
        <StatCard color={COLORS.tertiary}>
          <StatValue>{Object.keys(demographicData.genderBreakdown).filter(gender => demographicData.genderBreakdown[gender] > 0).length}</StatValue>
          <StatLabel>Gender Categories</StatLabel>
        </StatCard>
        <StatCard color={COLORS.quaternary}>
          <StatValue>{Object.keys(demographicData.ethnicityBreakdown).filter(ethnicity => demographicData.ethnicityBreakdown[ethnicity] > 0).length}</StatValue>
          <StatLabel>Ethnic Groups</StatLabel>
        </StatCard>
      </SummaryStats>

      {/* Charts Grid */}
      <ReportsGrid>
        {/* Age Distribution */}
        <ChartWrapper
          title="Age Distribution"
          subtitle={`Breakdown of ${demographicData.totalClients} sisters by age group`}
          borderColor={COLORS.primary}
          onExport={handleExportDemographics}
          id="age-distribution-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ageChartData.map((entry, index) => (
                  <Cell key={`age-cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Gender Distribution */}
        <ChartWrapper
          title="Gender Distribution"
          subtitle="Self-identified gender breakdown"
          borderColor={COLORS.secondary}
          onExport={handleExportDemographics}
          id="gender-distribution-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Count">
                {genderChartData.map((entry, index) => (
                  <Cell key={`gender-cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Ethnicity Distribution */}
        <ChartWrapper
          title="Ethnicity Distribution"
          subtitle="Self-reported ethnic and racial identity"
          borderColor={COLORS.tertiary}
          onExport={handleExportDemographics}
          id="ethnicity-distribution-chart"
          height="400px"
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={ethnicityChartData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Count">
                {ethnicityChartData.map((entry, index) => (
                  <Cell key={`ethnicity-cell-${index}`} fill={ETHNICITY_COLORS[index % ETHNICITY_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Geographic Distribution */}
        <ChartWrapper
          title="Geographic Distribution"
          subtitle="Community reach by location"
          borderColor={COLORS.quaternary}
          onExport={handleExportDemographics}
          id="geographic-distribution-chart"
        >
          {geographicData?.zipCodes && geographicData.zipCodes.length > 0 ? (
            <GeographicTable>
              <TableHeader>
                <div>Location</div>
                <div>Count</div>
                <div>%</div>
              </TableHeader>
              {geographicData.zipCodes.slice(0, 10).map((item, index) => (
                <TableRow key={`zip-${index}`}>
                  <div>Zip Code {item.zip}</div>
                  <div>{item.count}</div>
                  <div>{((item.count / demographicData.totalClients) * 100).toFixed(1)}%</div>
                </TableRow>
              ))}
              {geographicData.counties.slice(0, 5).map((item, index) => (
                <TableRow key={`county-${index}`}>
                  <div>{item.county} County</div>
                  <div>{item.count}</div>
                  <div>{((item.count / demographicData.totalClients) * 100).toFixed(1)}%</div>
                </TableRow>
              ))}
            </GeographicTable>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              height: '200px',
              color: '#6B7280',
              textAlign: 'center'
            }}>
              <div>
                <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>Geographic data not available</p>
                <p className="text-sm">Zip codes and counties will appear here when collected</p>
              </div>
            </div>
          )}
        </ChartWrapper>
      </ReportsGrid>

      {/* Detailed Tables */}
      <div style={{ marginTop: '2rem' }}>
        <ChartWrapper
          title="Detailed Demographic Breakdown"
          subtitle="Complete statistical breakdown with percentages"
          borderColor={COLORS.primary}
          height="auto"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Age Details */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Age Groups</h4>
              <GeographicTable>
                <TableHeader>
                  <div>Age Range</div>
                  <div>Count</div>
                  <div>%</div>
                </TableHeader>
                {Object.entries(demographicData.ageGroups).map(([age, count]) => (
                  <TableRow key={age}>
                    <div>{age}</div>
                    <div>{count}</div>
                    <div>{((count / demographicData.totalClients) * 100).toFixed(1)}%</div>
                  </TableRow>
                ))}
              </GeographicTable>
            </div>

            {/* Gender Details */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Gender Identity</h4>
              <GeographicTable>
                <TableHeader>
                  <div>Gender</div>
                  <div>Count</div>
                  <div>%</div>
                </TableHeader>
                {Object.entries(demographicData.genderBreakdown).map(([gender, count]) => (
                  <TableRow key={gender}>
                    <div>{gender}</div>
                    <div>{count}</div>
                    <div>{((count / demographicData.totalClients) * 100).toFixed(1)}%</div>
                  </TableRow>
                ))}
              </GeographicTable>
            </div>

            {/* Ethnicity Details */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Ethnic & Racial Identity</h4>
              <GeographicTable>
                <TableHeader>
                  <div>Ethnicity</div>
                  <div>Count</div>
                  <div>%</div>
                </TableHeader>
                {Object.entries(demographicData.ethnicityBreakdown)
                  .sort(([,a], [,b]) => b - a)
                  .map(([ethnicity, count]) => (
                  <TableRow key={ethnicity}>
                    <div>{ethnicity}</div>
                    <div>{count}</div>
                    <div>{((count / demographicData.totalClients) * 100).toFixed(1)}%</div>
                  </TableRow>
                ))}
              </GeographicTable>
            </div>
          </div>
        </ChartWrapper>
      </div>
    </div>
  );
};

export default DemographicReports;
