import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  CreditCard,
  Banknote,
  Calculator
} from 'lucide-react';

const FinancesContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const FinancialSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SummaryCard = styled.div<{ $trend?: 'up' | 'down' }>`
  background: ${props => {
    const { $trend } = props;
    if ($trend === 'up') return 'linear-gradient(135deg, #10b981, #34d399)';
    if ($trend === 'down') return 'linear-gradient(135deg, #ef4444, #f87171)';
    return `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})`;
  }};
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const RevenueValue = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const RevenueLabel = styled.div`
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.875rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ExpenseCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CategoryIcon = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TransactionInfo = styled.div``;

const TransactionDescription = styled.div`
  font-weight: 500;
  margin-bottom: 2px;
`;

const TransactionDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const TransactionAmount = styled.div<{ $type: 'income' | 'expense' }>`
  font-weight: bold;
  color: ${props => props.$type === 'income' ? '#10b981' : '#ef4444'};
`;

export const FinancesOverview: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const expenses = [
    { category: 'Fuel', amount: '$384K', percentage: 35, color: '#ef4444' },
    { category: 'Staff Salaries', amount: '$298K', percentage: 27, color: '#3b82f6' },
    { category: 'Aircraft Maintenance', amount: '$156K', percentage: 14, color: '#f59e0b' },
    { category: 'Airport Fees', amount: '$89K', percentage: 8, color: '#10b981' },
    { category: 'Insurance', amount: '$67K', percentage: 6, color: '#8b5cf6' },
    { category: 'Other', amount: '$112K', percentage: 10, color: '#6b7280' },
  ];

  const recentTransactions = [
    { description: 'Route Revenue - JFK to LHR', date: 'Today, 2:30 PM', amount: '+$45,230', type: 'income' as const },
    { description: 'Fuel Purchase - LAX Terminal', date: 'Today, 11:45 AM', amount: '-$18,500', type: 'expense' as const },
    { description: 'Route Revenue - LAX to NRT', date: 'Yesterday, 8:20 PM', amount: '+$38,920', type: 'income' as const },
    { description: 'Aircraft Lease Payment', date: 'Yesterday, 3:00 PM', amount: '-$125,000', type: 'expense' as const },
    { description: 'Staff Payroll', date: '2 days ago', amount: '-$89,450', type: 'expense' as const },
  ];

  return (
    <FinancesContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Financial Overview</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline">
            <BarChart3 size={16} />
            Reports
          </Button>
          <Button variant="accent">
            <Calculator size={16} />
            Budget Planner
          </Button>
          <Button variant="primary">
            <CreditCard size={16} />
            Manage Loans
          </Button>
        </div>
      </div>

      <FinancialSummary>
        <SummaryCard>
          <Banknote size={32} style={{ margin: '0 auto 1rem' }} />
          <RevenueValue>$2,847,592</RevenueValue>
          <RevenueLabel>Total Cash</RevenueLabel>
          <TrendIndicator>
            <TrendingUp size={16} />
            +12.4% this month
          </TrendIndicator>
        </SummaryCard>
        
        <SummaryCard $trend="up">
          <TrendingUp size={32} style={{ margin: '0 auto 1rem' }} />
          <RevenueValue>$124,590</RevenueValue>
          <RevenueLabel>Daily Revenue</RevenueLabel>
          <TrendIndicator>
            <TrendingUp size={16} />
            +8.7% vs yesterday
          </TrendIndicator>
        </SummaryCard>
        
        <SummaryCard $trend="down">
          <TrendingDown size={32} style={{ margin: '0 auto 1rem' }} />
          <RevenueValue>$89,234</RevenueValue>
          <RevenueLabel>Daily Expenses</RevenueLabel>
          <TrendIndicator>
            <TrendingDown size={16} />
            -3.2% vs yesterday
          </TrendIndicator>
        </SummaryCard>
        
        <SummaryCard>
          <DollarSign size={32} style={{ margin: '0 auto 1rem' }} />
          <RevenueValue>$35,356</RevenueValue>
          <RevenueLabel>Net Profit (Daily)</RevenueLabel>
          <TrendIndicator>
            <TrendingUp size={16} />
            +15.9% vs yesterday
          </TrendIndicator>
        </SummaryCard>
      </FinancialSummary>

      <ChartsGrid>
        <Card title="Revenue Breakdown (Monthly)" delay={300}>
          <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center' }}>
              <BarChart3 size={48} color="#005f99" style={{ margin: '0 auto 1rem' }} />
              <div style={{ color: '#6b7280' }}>Interactive revenue chart would be displayed here</div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                Monthly breakdown by routes and services
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button variant="outline" size="sm">View Details</Button>
            <Button variant="secondary" size="sm">Export Data</Button>
          </div>
        </Card>

        <Card title="Expense Categories" delay={400}>
          {expenses.map((expense, index) => (
            <ExpenseCategory key={index}>
              <CategoryInfo>
                <CategoryIcon $color={expense.color} />
                <span style={{ fontSize: '0.875rem' }}>{expense.category}</span>
              </CategoryInfo>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>{expense.amount}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{expense.percentage}%</div>
              </div>
            </ExpenseCategory>
          ))}
        </Card>
      </ChartsGrid>

      <Card title="Recent Transactions" delay={500}>
        {recentTransactions.map((transaction, index) => (
          <TransactionItem key={index}>
            <TransactionInfo>
              <TransactionDescription>{transaction.description}</TransactionDescription>
              <TransactionDate>{transaction.date}</TransactionDate>
            </TransactionInfo>
            <TransactionAmount $type={transaction.type}>
              {transaction.amount}
            </TransactionAmount>
          </TransactionItem>
        ))}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button variant="outline">View All Transactions</Button>
        </div>
      </Card>
    </FinancesContainer>
  );
};