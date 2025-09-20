import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Plane, 
  Plus, 
  Filter, 
  Download,
  Calendar,
  Fuel,
  Users,
  Clock,
  Wrench
} from 'lucide-react';

const FleetContainer = styled(animated.div)`
  max-width: 1400px;
  margin: 0 auto;
`;

const FleetControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterTab = styled.button<{ $active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray[100]};
  color: ${props => props.$active ? 'white' : props.theme.colors.gray[700]};
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.secondary : props.theme.colors.gray[200]};
  }
`;

const FleetTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 150px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.gray[50]};
  font-weight: 600;
  color: ${props => props.theme.colors.gray[700]};
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 150px;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.gray[50]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.lg};
    border: 1px solid ${props => props.theme.colors.gray[200]};
    border-radius: 8px;
    margin-bottom: ${props => props.theme.spacing.md};
  }
`;

const AircraftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const AircraftIcon = styled.div<{ $status: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    const { $status } = props;
    if ($status === 'operational') return '#dcfce7';
    if ($status === 'maintenance') return '#fee2e2';
    return '#fef3cd';
  }};
  color: ${props => {
    const { $status } = props;
    if ($status === 'operational') return '#16a34a';
    if ($status === 'maintenance') return '#dc2626';
    return '#d97706';
  }};
`;

const AircraftDetails = styled.div``;

const AircraftName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.neutralDark};
  margin-bottom: 2px;
`;

const Registration = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const MobileLabel = styled.span`
  display: none;
  font-weight: 500;
  color: ${props => props.theme.colors.gray[600]};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: inline;
  }
`;

export const FleetManagement: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const fleet = [
    {
      id: 1,
      model: 'Boeing 777-300ER',
      registration: 'N777AE',
      status: 'operational',
      route: 'JFK-LHR',
      utilization: '87%',
      efficiency: '94%',
      revenue: '$2.1M',
      nextMaintenance: '45 days'
    },
    {
      id: 2,
      model: 'Airbus A350-900',
      registration: 'N350AE', 
      status: 'operational',
      route: 'LAX-NRT',
      utilization: '92%',
      efficiency: '96%',
      revenue: '$1.8M',
      nextMaintenance: '12 days'
    },
    {
      id: 3,
      model: 'Boeing 737-800',
      registration: 'N738AE',
      status: 'maintenance',
      route: 'Ground',
      utilization: '0%',
      efficiency: '0%',
      revenue: '$1.2M',
      nextMaintenance: 'In Progress'
    },
    {
      id: 4,
      model: 'Airbus A380',
      registration: 'N380AE',
      status: 'scheduled',
      route: 'LHR-SYD',
      utilization: '78%',
      efficiency: '91%',
      revenue: '$2.8M',
      nextMaintenance: '90 days'
    },
  ];

  const filters = ['all', 'operational', 'maintenance', 'scheduled'];

  const filteredFleet = activeFilter === 'all' 
    ? fleet 
    : fleet.filter(aircraft => aircraft.status === activeFilter);

  return (
    <FleetContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Fleet Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline">
            <Download size={16} />
            Export
          </Button>
          <Button variant="accent">
            <Calendar size={16} />
            Schedule
          </Button>
          <Button variant="primary">
            <Plus size={16} />
            Add Aircraft
          </Button>
        </div>
      </div>

      <FleetControls>
        <FilterTabs>
          {filters.map(filter => (
            <FilterTab
              key={filter}
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </FilterTab>
          ))}
        </FilterTabs>
      </FleetControls>

      <FleetTable>
        <TableHeader>
          <div>Aircraft</div>
          <div>Route</div>
          <div>Utilization</div>
          <div>Efficiency</div>
          <div>Revenue</div>
          <div>Maintenance</div>
          <div>Actions</div>
        </TableHeader>
        
        {filteredFleet.map((aircraft, index) => (
          <TableRow key={aircraft.id}>
            <AircraftInfo>
              <AircraftIcon $status={aircraft.status}>
                <Plane size={20} />
              </AircraftIcon>
              <AircraftDetails>
                <AircraftName>{aircraft.model}</AircraftName>
                <Registration>{aircraft.registration}</Registration>
              </AircraftDetails>
            </AircraftInfo>
            
            <div>
              <MobileLabel>Route: </MobileLabel>
              {aircraft.route}
            </div>
            
            <div>
              <MobileLabel>Utilization: </MobileLabel>
              <span style={{ fontWeight: '500', color: '#005f99' }}>
                {aircraft.utilization}
              </span>
            </div>
            
            <div>
              <MobileLabel>Efficiency: </MobileLabel>
              <span style={{ fontWeight: '500', color: '#10b981' }}>
                {aircraft.efficiency}
              </span>
            </div>
            
            <div>
              <MobileLabel>Revenue: </MobileLabel>
              <span style={{ fontWeight: '500' }}>
                {aircraft.revenue}
              </span>
            </div>
            
            <div>
              <MobileLabel>Maintenance: </MobileLabel>
              <span style={{ 
                fontSize: '0.875rem',
                color: aircraft.nextMaintenance.includes('Overdue') ? '#dc2626' : '#6b7280'
              }}>
                {aircraft.nextMaintenance}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="secondary" size="sm">
                <Wrench size={14} />
              </Button>
            </div>
          </TableRow>
        ))}
      </FleetTable>
    </FleetContainer>
  );
};