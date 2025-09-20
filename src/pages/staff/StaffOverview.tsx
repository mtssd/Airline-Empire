import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  Star,
  TrendingUp,
  Calendar,
  Clock,
  Award,
  Wrench
} from 'lucide-react';

const StaffContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const DepartmentCard = styled(Card)`
  background: linear-gradient(135deg, white, #f8fafc);
  border-left: 4px solid ${props => props.theme.colors.primary};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const DepartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DepartmentName = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.neutralDark};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const StaffCount = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const DepartmentStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Stat = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 6px;
`;

const StatValue = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const PerformanceIndicator = styled.div<{ $level: 'excellent' | 'good' | 'average' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => {
    const { $level } = props;
    if ($level === 'excellent') return '#dcfce7';
    if ($level === 'good') return '#dbeafe';
    return '#fef3cd';
  }};
  color: ${props => {
    const { $level } = props;
    if ($level === 'excellent') return '#16a34a';
    if ($level === 'good') return '#2563eb';
    return '#d97706';
  }};
  text-align: center;
`;

const RecentActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 6px;
`;

export const StaffOverview: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const departments = [
    {
      name: 'Flight Operations',
      icon: Users,
      count: 124,
      avgSalary: '$78K',
      performance: 'excellent' as const,
      satisfaction: '94%',
      retention: '96%'
    },
    {
      name: 'Cabin Crew',
      icon: Star,
      count: 186,
      avgSalary: '$52K',
      performance: 'good' as const,
      satisfaction: '89%',
      retention: '92%'
    },
    {
      name: 'Ground Operations',
      icon: Wrench,
      count: 298,
      avgSalary: '$45K',
      performance: 'good' as const,
      satisfaction: '87%',
      retention: '88%'
    },
    {
      name: 'Administration',
      icon: Award,
      count: 89,
      avgSalary: '$65K',
      performance: 'excellent' as const,
      satisfaction: '91%',
      retention: '94%'
    },
  ];

  const recentActivity = [
    { icon: UserPlus, text: 'New pilot Captain Sarah Johnson hired', time: '2 hours ago' },
    { icon: GraduationCap, text: 'Flight attendant training completed - 12 graduates', time: '1 day ago' },
    { icon: Award, text: 'Excellence award given to Maintenance Team Alpha', time: '2 days ago' },
    { icon: Calendar, text: 'Quarterly performance reviews scheduled', time: '3 days ago' },
  ];

  return (
    <StaffContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Staff Management Center</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="accent">
            <GraduationCap size={16} />
            Training Programs
          </Button>
          <Button variant="primary">
            <UserPlus size={16} />
            Hire Staff
          </Button>
        </div>
      </div>

      <StaffGrid>
        {departments.map((dept, index) => (
          <DepartmentCard key={index} delay={index * 150}>
            <DepartmentHeader>
              <DepartmentName>
                <dept.icon size={24} color="#005f99" />
                {dept.name}
              </DepartmentName>
              <StaffCount>{dept.count}</StaffCount>
            </DepartmentHeader>

            <DepartmentStats>
              <Stat>
                <StatValue>{dept.avgSalary}</StatValue>
                <StatLabel>Avg Salary</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{dept.satisfaction}</StatValue>
                <StatLabel>Satisfaction</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{dept.retention}</StatValue>
                <StatLabel>Retention</StatLabel>
              </Stat>
              <Stat>
                <PerformanceIndicator $level={dept.performance}>
                  {dept.performance}
                </PerformanceIndicator>
                <StatLabel style={{ marginTop: '4px' }}>Performance</StatLabel>
              </Stat>
            </DepartmentStats>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>
                Manage
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp size={14} />
              </Button>
            </div>
          </DepartmentCard>
        ))}
      </StaffGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card title="Recent Staff Activity" delay={600}>
          <RecentActivity>
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <activity.icon size={16} color="#005f99" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '500' }}>{activity.text}</div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{activity.time}</div>
                </div>
              </ActivityItem>
            ))}
          </RecentActivity>
        </Card>

        <Card title="Training & Development" delay={700}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span>Active Programs</span>
              <span style={{ fontWeight: 'bold', color: '#005f99' }}>7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span>Enrolled Staff</span>
              <span style={{ fontWeight: 'bold', color: '#10b981' }}>89</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span>Completion Rate</span>
              <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>87%</span>
            </div>
          </div>
          
          <Button variant="accent" size="sm" style={{ width: '100%' }}>
            <GraduationCap size={14} />
            View All Programs
          </Button>
        </Card>
      </div>
    </StaffContainer>
  );
};