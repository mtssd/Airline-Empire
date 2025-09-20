import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Wrench, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  ArrowRight,
  Plus
} from 'lucide-react';

const AircraftContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
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

const QuickAction = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  text-decoration: none;
  color: ${props => props.theme.colors.neutralDark};
  border-left: 4px solid ${props => props.theme.colors.primary};
  transition: all 0.2s ease;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:hover {
    transform: translateX(4px);
    background: white;
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionText = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const MaintenanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.warning};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const AircraftOverview: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const quickActions = [
    { icon: Plane, text: 'Fleet Management Dashboard', path: '/aircraft/fleet' },
    { icon: Calendar, text: 'Schedule Maintenance', path: '/aircraft/maintenance' },
    { icon: TrendingUp, text: 'Performance Analytics', path: '/aircraft/analytics' },
    { icon: Wrench, text: 'Service History', path: '/aircraft/service' },
  ];

  const upcomingMaintenance = [
    { aircraft: 'N350AE - A350-900', type: 'A-Check', daysUntil: 12 },
    { aircraft: 'N777AE - B777-300ER', type: 'C-Check', daysUntil: 45 },
    { aircraft: 'N320AE - A320-200', type: 'B-Check', daysUntil: 67 },
  ];

  return (
    <AircraftContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Aircraft Operations Center</h1>
        <Button variant="primary">
          <Plus size={16} />
          Add New Aircraft
        </Button>
      </div>

      <QuickStatsGrid>
        <StatCard>
          <Plane size={32} style={{ margin: '0 auto 1rem' }} />
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>12</div>
          <div style={{ opacity: 0.9 }}>Total Aircraft</div>
        </StatCard>
        
        <StatCard>
          <CheckCircle size={32} style={{ margin: '0 auto 1rem' }} />
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>9</div>
          <div style={{ opacity: 0.9 }}>Operational</div>
        </StatCard>
        
        <StatCard>
          <Wrench size={32} style={{ margin: '0 auto 1rem' }} />
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>2</div>
          <div style={{ opacity: 0.9 }}>In Maintenance</div>
        </StatCard>
        
        <StatCard>
          <TrendingUp size={32} style={{ margin: '0 auto 1rem' }} />
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>92.3%</div>
          <div style={{ opacity: 0.9 }}>Fleet Efficiency</div>
        </StatCard>
      </QuickStatsGrid>

      <OverviewGrid>
        <Card title="Quick Actions" delay={200}>
          {quickActions.map((action, index) => (
            <QuickAction key={index} to={action.path}>
              <ActionText>
                <action.icon size={20} color="#005f99" />
                {action.text}
              </ActionText>
              <ArrowRight size={16} color="#6b7280" />
            </QuickAction>
          ))}
        </Card>

        <Card title="Fleet Performance Overview" delay={300}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Average Utilization</span>
              <span style={{ fontWeight: 'bold', color: '#005f99' }}>84.6%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: '84.6%', 
                height: '100%', 
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                borderRadius: '4px'
              }} />
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span>Fuel Efficiency</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>92.1%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ 
                width: '92.1%', 
                height: '100%', 
                background: 'linear-gradient(90deg, #10b981, #34d399)',
                borderRadius: '4px'
              }} />
            </div>
          </div>

          <Button variant="outline" size="sm" style={{ width: '100%' }}>
            View Detailed Analytics
          </Button>
        </Card>

        <Card title="Upcoming Maintenance" delay={400}>
          {upcomingMaintenance.map((maintenance, index) => (
            <MaintenanceItem key={index}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                  {maintenance.aircraft}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {maintenance.type} - {maintenance.daysUntil} days
                </div>
              </div>
              <Clock size={16} color="#f59e0b" />
            </MaintenanceItem>
          ))}
          <Button variant="accent" size="sm" style={{ width: '100%', marginTop: '1rem' }}>
            Schedule Maintenance
          </Button>
        </Card>
      </OverviewGrid>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
        <Button variant="primary" size="lg">
          <Plane size={16} />
          Fleet Dashboard
        </Button>
        <Button variant="outline" size="lg">
          <TrendingUp size={16} />
          Performance Reports
        </Button>
      </div>
    </AircraftContainer>
  );
};