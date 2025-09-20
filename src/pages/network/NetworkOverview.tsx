import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { MapPanel } from '../../components/dashboard/MapPanel';
import { Route, Globe, TrendingUp, Users } from 'lucide-react';

const NetworkContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const NetworkGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const RoutesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const RouteItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  border-left: 4px solid ${props => props.theme.colors.primary};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const RouteInfo = styled.div`
  flex: 1;
`;

const RouteName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.neutralDark};
  margin-bottom: 4px;
`;

const RouteStats = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const NetworkStats = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border-radius: 12px;
`;

export const NetworkOverview: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const routes = [
    { name: 'JFK ↔ LHR', passengers: '2,456', load: '94%', revenue: '$45,230' },
    { name: 'LAX ↔ NRT', passengers: '1,834', load: '87%', revenue: '$38,920' },
    { name: 'JFK ↔ LAX', passengers: '1,975', load: '91%', revenue: '$31,450' },
    { name: 'LHR ↔ SYD', passengers: '1,523', load: '89%', revenue: '$42,180' },
  ];

  return (
    <NetworkContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Network Overview</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary">Add New Route</Button>
          <Button variant="outline">Route Optimizer</Button>
        </div>
      </div>

      <NetworkGrid>
        <div>
          <Card title="Global Route Network" delay={200}>
            <MapPanel />
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <Button variant="secondary" size="sm">Expand Coverage</Button>
              <Button variant="outline" size="sm">Route Analytics</Button>
            </div>
          </Card>

          <Card title="Active Routes" delay={400} style={{ marginTop: '1.5rem' }}>
            <RoutesList>
              {routes.map((route, index) => (
                <RouteItem key={index}>
                  <Route size={20} color="#005f99" style={{ marginRight: '1rem' }} />
                  <RouteInfo>
                    <RouteName>{route.name}</RouteName>
                    <RouteStats>
                      <span>Passengers: {route.passengers}</span>
                      <span>Load: {route.load}</span>
                      <span>Revenue: {route.revenue}</span>
                    </RouteStats>
                  </RouteInfo>
                  <Button variant="outline" size="sm">Manage</Button>
                </RouteItem>
              ))}
            </RoutesList>
          </Card>
        </div>

        <div>
          <NetworkStats>
            <StatCard>
              <Globe size={32} style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>18</div>
              <div style={{ opacity: 0.9 }}>Active Routes</div>
            </StatCard>
            
            <StatCard>
              <TrendingUp size={32} style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>$2.4M</div>
              <div style={{ opacity: 0.9 }}>Weekly Revenue</div>
            </StatCard>
            
            <StatCard>
              <Users size={32} style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>12,847</div>
              <div style={{ opacity: 0.9 }}>Weekly Passengers</div>
            </StatCard>
          </NetworkStats>
          
          <Card title="Route Performance" delay={600} style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Average Load Factor</span>
                <span style={{ fontWeight: 'bold' }}>89.2%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: '89.2%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #10b981, #34d399)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>On-time Performance</span>
                <span style={{ fontWeight: 'bold' }}>94.7%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: '94.7%', 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>
            
            <Button variant="outline" size="sm" style={{ width: '100%' }}>
              View Detailed Analytics
            </Button>
          </Card>
        </div>
      </NetworkGrid>
    </NetworkContainer>
  );
};