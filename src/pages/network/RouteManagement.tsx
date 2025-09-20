import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Plus, Search, Filter, Plane, Clock, DollarSign, Route } from 'lucide-react';

const RouteContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex: 1;
  max-width: 400px;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RouteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const RouteCard = styled(Card)`
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const RouteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const RouteTitle = styled.h3`
  color: ${props => props.theme.colors.neutralDark};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const RouteStatus = styled.span<{ $status: 'active' | 'scheduled' | 'maintenance' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    const { $status } = props;
    if ($status === 'active') return '#dcfce7';
    if ($status === 'scheduled') return '#fef3cd';
    return '#fee2e2';
  }};
  color: ${props => {
    const { $status } = props;
    if ($status === 'active') return '#16a34a';
    if ($status === 'scheduled') return '#d97706';
    return '#dc2626';
  }};
`;

const RouteMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Metric = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
`;

const MetricValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[600]};
  text-transform: uppercase;
`;

const RouteActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

export const RouteManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const routes = [
    {
      id: 1,
      name: 'JFK ↔ LHR',
      aircraft: 'Boeing 777-300ER',
      status: 'active' as const,
      passengers: '2,456',
      load: '94%',
      revenue: '$45,230',
      duration: '7h 15m'
    },
    {
      id: 2,
      name: 'LAX ↔ NRT', 
      aircraft: 'Airbus A350-900',
      status: 'active' as const,
      passengers: '1,834',
      load: '87%',
      revenue: '$38,920',
      duration: '11h 30m'
    },
    {
      id: 3,
      name: 'JFK ↔ LAX',
      aircraft: 'Boeing 737-800',
      status: 'scheduled' as const,
      passengers: '1,975',
      load: '91%',
      revenue: '$31,450',
      duration: '5h 45m'
    },
    {
      id: 4,
      name: 'LHR ↔ SYD',
      aircraft: 'Airbus A380',
      status: 'maintenance' as const,
      passengers: '0',
      load: '0%',
      revenue: '$0',
      duration: '22h 10m'
    },
  ];

  const filteredRoutes = routes.filter(route => 
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.aircraft.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <RouteContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Route Management</h1>
      </div>

      <Controls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search routes or aircraft..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="sm">
            <Search size={16} />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter size={16} />
            Filter
          </Button>
        </SearchContainer>
        <Button variant="primary">
          <Plus size={16} />
          New Route
        </Button>
      </Controls>

      <RouteGrid>
        {filteredRoutes.map((route, index) => (
          <RouteCard key={route.id} delay={index * 100}>
            <RouteHeader>
              <RouteTitle>
                <Route size={20} />
                {route.name}
              </RouteTitle>
              <RouteStatus $status={route.status}>{route.status}</RouteStatus>
            </RouteHeader>
            
            <div style={{ marginBottom: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
              Aircraft: {route.aircraft}
            </div>

            <RouteMetrics>
              <Metric>
                <MetricValue>{route.passengers}</MetricValue>
                <MetricLabel>Passengers</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>{route.load}</MetricValue>
                <MetricLabel>Load Factor</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>{route.revenue}</MetricValue>
                <MetricLabel>Revenue</MetricLabel>
              </Metric>
            </RouteMetrics>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#6b7280' }}>
              <Clock size={16} />
              <span>Duration: {route.duration}</span>
            </div>

            <RouteActions>
              <Button variant="primary" size="sm">Edit Route</Button>
              <Button variant="outline" size="sm">View Schedule</Button>
            </RouteActions>
          </RouteCard>
        ))}
      </RouteGrid>
    </RouteContainer>
  );
};