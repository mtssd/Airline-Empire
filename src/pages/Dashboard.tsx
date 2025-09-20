import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { MapPanel } from '../components/dashboard/MapPanel';
import { 
  TrendingUp, 
  Plane, 
  Users, 
  DollarSign, 
  Globe, 
  BarChart3,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const DashboardContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(Card)`
  text-align: center;
  background: linear-gradient(135deg, white, #f8fafc);
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.secondary};
`;

const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Alert = styled.div<{ $type: 'info' | 'warning' | 'success' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  background: ${props => {
    const { $type } = props;
    const theme = props.theme;
    if ($type === 'warning') return '#fef3cd';
    if ($type === 'success') return '#d1f7c4';
    return '#e7f3ff';
  }};
  border-left: 4px solid ${props => {
    const { $type } = props;
    const theme = props.theme;
    if ($type === 'warning') return theme.colors.warning;
    if ($type === 'success') return theme.colors.success;
    return theme.colors.primary;
  }};
`;

const RecentActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.secondary};
`;

const ActivityText = styled.span`
  flex: 1;
`;

const ActivityTime = styled.span`
  color: ${props => props.theme.colors.gray[500]};
  font-size: 0.875rem;
`;

export const Dashboard: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const stats = [
    { icon: DollarSign, label: 'Daily Revenue', value: '$124,590', delay: 0 },
    { icon: Plane, label: 'Active Aircraft', value: '12', delay: 100 },
    { icon: Globe, label: 'Routes', value: '18', delay: 200 },
    { icon: Users, label: 'Staff', value: '847', delay: 300 },
  ];

  const alerts = [
    { type: 'info' as const, message: 'Flight AE-204 scheduled for departure in 2 hours' },
    { type: 'warning' as const, message: 'Aircraft maintenance required for Boeing 737-800' },
    { type: 'success' as const, message: 'New route to Tokyo approved and operational' },
  ];

  const recentActivity = [
    { text: 'Flight AE-101 departed from JFK', time: '2 min ago' },
    { text: 'New pilot hired: Captain Sarah Johnson', time: '15 min ago' },
    { text: 'Route LAX-SFO completed successfully', time: '1 hour ago' },
    { text: 'Aircraft maintenance completed on Airbus A320', time: '2 hours ago' },
  ];

  return (
    <DashboardContainer style={containerSpring}>
      <h1 style={{ marginBottom: '2rem', color: '#1d1d1d' }}>Airline Empire Dashboard</h1>
      
      <StatsGrid>
        {stats.map(({ icon: Icon, label, value, delay }, index) => (
          <StatCard key={index} delay={delay}>
            <StatIcon>
              <Icon size={32} />
            </StatIcon>
            <StatValue>{value}</StatValue>
            <StatLabel>{label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <DashboardGrid>
        <Card title="World Network Map" delay={400}>
          <MapPanel />
        </Card>

        <Card title="Fleet Performance" delay={500}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#005f99' }}>94.2%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>On-time Performance</div>
            </div>
            <BarChart3 size={32} color="#007acc" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#005f99' }}>87%</div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Load Factor</div>
            </div>
            <TrendingUp size={32} color="#10b981" />
          </div>
          <Button variant="outline" size="sm">View Detailed Report</Button>
        </Card>

        <Card title="Recent Alerts" delay={600}>
          <AlertsList>
            {alerts.map((alert, index) => (
              <Alert key={index} $type={alert.type}>
                {alert.type === 'warning' && <AlertCircle size={16} />}
                {alert.type === 'success' && <CheckCircle size={16} />}
                {alert.type === 'info' && <AlertCircle size={16} />}
                <span style={{ fontSize: '0.875rem' }}>{alert.message}</span>
              </Alert>
            ))}
          </AlertsList>
        </Card>

        <Card title="Recent Activity" delay={700}>
          <RecentActivity>
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityText>{activity.text}</ActivityText>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityItem>
            ))}
          </RecentActivity>
        </Card>
      </DashboardGrid>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Button variant="primary">Launch Flight Operations</Button>
        <Button variant="accent">Quick Route Planner</Button>
        <Button variant="outline">Financial Reports</Button>
      </div>
    </DashboardContainer>
  );
};