import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import ChartWrapper from './ChartWrapper';

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${props => props.color || '#14B8A6'};
`;

const MetricValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
`;

const MetricChange = styled.div`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${props => props.positive ? '#10B981' : props.negative ? '#EF4444' : '#6B7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || '#14B8A6'};
  width: ${props => Math.min(props.percentage || 0, 100)}%;
  transition: width 0.3s ease;
`;

const COLORS = {
  primary: '#14B8A6',
  secondary: '#F59E0B',
  tertiary: '#8B5CF6',
  quaternary: '#EF4444',
  quinary: '#10B981',
  senary: '#F97316'
};

const EXPENSE_COLORS = [COLORS.primary, COLORS.secondary, COLORS.tertiary, COLORS.quaternary, COLORS.quinary, COLORS.senary];

const FinancialReports = ({ data, onExport }) => {
  const financialData = useMemo(() => {
    if (!data?.getFinancialAnalysis) return null;
    return data.getFinancialAnalysis();
  }, [data]);

  const roiData = useMemo(() => {
    if (!data?.getROIAnalysis) return null;
    return data.getROIAnalysis();
  }, [data]);

  // Mock budget vs actual data for demonstration
  const budgetVsActualData = useMemo(() => {
    if (!financialData) return [];
    
    // Create sample monthly budget vs actual data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => {
      const budget = 25000 + (index * 2000);
      const actual = budget * (0.8 + Math.random() * 0.4); // 80-120% of budget
      return {
        month,
        budget,
        actual: Math.round(actual),
        variance: Math.round(budget - actual)
      };
    });
  }, [financialData]);

  const programExpenseData = useMemo(() => {
    if (!financialData?.programExpenses) return [];
    return financialData.programExpenses.map(expense => ({
      ...expense,
      percentage: ((expense.amount / financialData.totalSpent) * 100).toFixed(1)
    }));
  }, [financialData]);

  const utilizationRate = useMemo(() => {
    if (!financialData) return 0;
    return parseFloat(financialData.utilizationRate) || 0;
  }, [financialData]);

  const handleExportFinancial = () => {
    if (onExport) {
      onExport({ ...financialData, roiData, budgetVsActualData }, 'financial');
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
              {entry.name}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!financialData) {
    return (
      <ChartWrapper title="Financial Analysis" loading={true} />
    );
  }

  return (
    <div>
      {/* Key Financial Metrics */}
      <MetricsGrid>
        <MetricCard color={COLORS.primary}>
          <MetricValue>${(financialData.totalBudget / 1000).toFixed(0)}K</MetricValue>
          <MetricLabel>Total Budget</MetricLabel>
          <ProgressBar>
            <ProgressFill percentage={100} color={COLORS.primary} />
          </ProgressBar>
        </MetricCard>

        <MetricCard color={COLORS.secondary}>
          <MetricValue>${(financialData.totalSpent / 1000).toFixed(0)}K</MetricValue>
          <MetricLabel>Total Spent</MetricLabel>
          <MetricChange positive={utilizationRate >= 85 && utilizationRate <= 95}>
            {utilizationRate}% utilized
          </MetricChange>
          <ProgressBar>
            <ProgressFill percentage={utilizationRate} color={COLORS.secondary} />
          </ProgressBar>
        </MetricCard>

        <MetricCard color={financialData.variance >= 0 ? COLORS.quinary : COLORS.quaternary}>
          <MetricValue>${Math.abs(financialData.variance / 1000).toFixed(0)}K</MetricValue>
          <MetricLabel>Budget Variance</MetricLabel>
          <MetricChange positive={financialData.variance >= 0} negative={financialData.variance < 0}>
            {financialData.variance >= 0 ? 'Under budget' : 'Over budget'}
          </MetricChange>
        </MetricCard>

        <MetricCard color={COLORS.tertiary}>
          <MetricValue>${financialData.costPerClient}</MetricValue>
          <MetricLabel>Cost per Sister</MetricLabel>
          <MetricChange>
            Program efficiency metric
          </MetricChange>
        </MetricCard>

        {roiData && (
          <>
            <MetricCard color={COLORS.quinary}>
              <MetricValue>{roiData.roi}%</MetricValue>
              <MetricLabel>Return on Investment</MetricLabel>
              <MetricChange positive={roiData.roi > 0} negative={roiData.roi < 0}>
                {roiData.roi > 0 ? 'Positive impact' : 'Investment building'}
              </MetricChange>
            </MetricCard>

            <MetricCard color={COLORS.senary}>
              <MetricValue>${(roiData.estimatedValue / 1000).toFixed(0)}K</MetricValue>
              <MetricLabel>Estimated Value Created</MetricLabel>
              <MetricChange positive>
                From {roiData.successfulClients} successful sisters
              </MetricChange>
            </MetricCard>
          </>
        )}
      </MetricsGrid>

      {/* Charts Grid */}
      <ReportsGrid>
        {/* Budget vs Actual */}
        <ChartWrapper
          title="Budget vs Actual Spending"
          subtitle="Monthly budget performance tracking"
          borderColor={COLORS.primary}
          onExport={handleExportFinancial}
          id="budget-vs-actual-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetVsActualData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill={COLORS.primary} />
              <Bar dataKey="actual" name="Actual" fill={COLORS.secondary} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Program Expense Breakdown */}
        <ChartWrapper
          title="Program Expense Allocation"
          subtitle="How grant dollars are being utilized"
          borderColor={COLORS.tertiary}
          onExport={handleExportFinancial}
          id="program-expenses-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programExpenseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ program, percentage }) => `${program}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {programExpenseData.map((entry, index) => (
                  <Cell key={`expense-cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                labelFormatter={(label) => `Program: ${label}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* Budget Utilization Over Time */}
        <ChartWrapper
          title="Budget Utilization Trend"
          subtitle="Cumulative spending vs budget timeline"
          borderColor={COLORS.secondary}
          onExport={handleExportFinancial}
          id="utilization-trend-chart"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={budgetVsActualData.map((item, index) => ({
              ...item,
              cumulativeBudget: budgetVsActualData.slice(0, index + 1).reduce((sum, month) => sum + month.budget, 0),
              cumulativeActual: budgetVsActualData.slice(0, index + 1).reduce((sum, month) => sum + month.actual, 0)
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="cumulativeBudget" 
                stroke={COLORS.primary} 
                strokeWidth={2}
                name="Cumulative Budget"
              />
              <Line 
                type="monotone" 
                dataKey="cumulativeActual" 
                stroke={COLORS.secondary} 
                strokeWidth={2}
                name="Cumulative Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>

        {/* ROI Analysis */}
        {roiData && (
          <ChartWrapper
            title="Return on Investment Analysis"
            subtitle="Program cost vs value created"
            borderColor={COLORS.quinary}
            onExport={handleExportFinancial}
            id="roi-analysis-chart"
          >
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.quaternary }}>
                    ${(roiData.totalInvestment / 1000).toFixed(0)}K
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Total Investment</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: COLORS.quinary }}>
                    ${(roiData.estimatedValue / 1000).toFixed(0)}K
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Value Created</div>
                </div>
                <div>
                  <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: '700', 
                    color: roiData.roi > 0 ? COLORS.quinary : COLORS.quaternary 
                  }}>
                    {roiData.roi}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>ROI</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#F0FDF4', 
                border: '1px solid #BBF7D0', 
                borderRadius: '0.5rem',
                padding: '1rem',
                textAlign: 'left'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803D' }}>Impact Summary</h4>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#166534' }}>
                  • {roiData.successfulClients} sisters successfully completed programs
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#166534' }}>
                  • Average income increase: ${roiData.averageIncomeIncrease.toFixed(0)}/month
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#166534' }}>
                  • Estimated annual value impact: ${(roiData.estimatedValue / 1000).toFixed(0)}K
                </p>
                {roiData.roi > 0 && (
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#15803D', fontWeight: '600' }}>
                    Every $1 invested generates ${(1 + roiData.roi / 100).toFixed(2)} in community value
                  </p>
                )}
              </div>
            </div>
          </ChartWrapper>
        )}
      </ReportsGrid>

      {/* Detailed Financial Tables */}
      <div style={{ marginTop: '2rem' }}>
        <ChartWrapper
          title="Detailed Financial Breakdown"
          subtitle="Complete budget and expense analysis"
          borderColor={COLORS.primary}
          height="auto"
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Budget Performance */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Budget Performance</h4>
              <div style={{ background: '#F9FAFB', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto auto auto', 
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  background: '#F3F4F6',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  <div>Category</div>
                  <div>Budget</div>
                  <div>Actual</div>
                  <div>Variance</div>
                </div>
                
                {budgetVsActualData.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto auto', 
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderBottom: index < budgetVsActualData.length - 1 ? '1px solid #E5E7EB' : 'none',
                    fontSize: '0.875rem'
                  }}>
                    <div>{item.month} 2025</div>
                    <div>${(item.budget / 1000).toFixed(0)}K</div>
                    <div>${(item.actual / 1000).toFixed(0)}K</div>
                    <div style={{ 
                      color: item.variance >= 0 ? '#10B981' : '#EF4444',
                      fontWeight: '500'
                    }}>
                      {item.variance >= 0 ? '+' : ''}${(item.variance / 1000).toFixed(0)}K
                    </div>
                  </div>
                ))}
                
                {/* Totals Row */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr auto auto auto', 
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  background: '#F3F4F6',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  borderTop: '2px solid #E5E7EB'
                }}>
                  <div>TOTAL</div>
                  <div>${(budgetVsActualData.reduce((sum, item) => sum + item.budget, 0) / 1000).toFixed(0)}K</div>
                  <div>${(budgetVsActualData.reduce((sum, item) => sum + item.actual, 0) / 1000).toFixed(0)}K</div>
                  <div style={{ 
                    color: budgetVsActualData.reduce((sum, item) => sum + item.variance, 0) >= 0 ? '#10B981' : '#EF4444'
                  }}>
                    {budgetVsActualData.reduce((sum, item) => sum + item.variance, 0) >= 0 ? '+' : ''}
                    ${(budgetVsActualData.reduce((sum, item) => sum + item.variance, 0) / 1000).toFixed(0)}K
                  </div>
                </div>
              </div>
            </div>

            {/* Program Expenses */}
            <div>
              <h4 style={{ marginBottom: '1rem', color: '#374151', fontWeight: '600' }}>Program Allocation</h4>
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
                  <div>Program</div>
                  <div>Amount</div>
                  <div>%</div>
                </div>
                
                {programExpenseData.map((expense, index) => (
                  <div key={index} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto auto', 
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderBottom: index < programExpenseData.length - 1 ? '1px solid #E5E7EB' : 'none',
                    fontSize: '0.875rem'
                  }}>
                    <div>{expense.program}</div>
                    <div>${expense.amount.toLocaleString()}</div>
                    <div>{expense.percentage}%</div>
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

export default FinancialReports;
