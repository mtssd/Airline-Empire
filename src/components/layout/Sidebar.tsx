import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Globe,
  TrendingUp,
  Users,
  MessageSquare,
  Award,
  Briefcase,
  Target
} from 'lucide-react';

const SidebarContainer = styled(animated.aside)`
  width: 280px;
  background: white;
  box-shadow: ${props => props.theme.shadows.md};
  height: calc(100vh - 80px);
  position: sticky;
  top: 80px;
  padding: ${props => props.theme.spacing.lg};
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.gray[600]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  
  &:first-child {
    margin-top: 0;
  }
`;

const SidebarLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray[700]};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.xs};
  transition: all 0.2s ease;
  background: ${props => props.$active ? `${props.theme.colors.primary}15` : 'transparent'};
  border-left: ${props => props.$active ? `3px solid ${props.theme.colors.primary}` : '3px solid transparent'};
  
  &:hover {
    background: ${props => props.theme.colors.gray[50]};
    transform: translateX(4px);
  }
`;

const QuickStats = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: 12px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StatLabel = styled.span`
  opacity: 0.9;
  font-size: 0.875rem;
`;

const StatValue = styled.span`
  font-weight: 600;
`;

const sidebarSections = [
  {
    title: 'Management',
    items: [
      { path: '/company/overview', label: 'Company Overview', icon: Briefcase },
      { path: '/marketing', label: 'Marketing', icon: Target },
      { path: '/finances/overview', label: 'Financial Overview', icon: BarChart3 },
      { path: '/alliance', label: 'Alliances', icon: Award }
    ]
  },
  {
    title: 'Operations',
    items: [
      { path: '/network/routes', label: 'Route Management', icon: Globe },
      { path: '/aircraft/fleet', label: 'Fleet Status', icon: TrendingUp },
      { path: '/staff/overview', label: 'Staff Overview', icon: Users }
    ]
  },
  {
    title: 'Community',
    items: [
      { path: '/chatv2', label: 'Global Chat', icon: MessageSquare }
    ]
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const sidebarSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0px)' },
    delay: 200,
    config: { tension: 300, friction: 30 }
  });

  return (
    <SidebarContainer style={sidebarSpring}>
      <QuickStats>
        <h4 style={{ marginBottom: '16px', fontSize: '1.125rem' }}>Quick Stats</h4>
        <StatItem>
          <StatLabel>Daily Revenue</StatLabel>
          <StatValue>$124K</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Active Routes</StatLabel>
          <StatValue>18</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Fleet Size</StatLabel>
          <StatValue>12</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Staff Count</StatLabel>
          <StatValue>847</StatValue>
        </StatItem>
      </QuickStats>

      {sidebarSections.map(section => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.items.map(({ path, label, icon: Icon }) => (
            <SidebarLink 
              key={path} 
              to={path}
              $active={location.pathname === path}
            >
              <Icon size={18} />
              {label}
            </SidebarLink>
          ))}
        </div>
      ))}
    </SidebarContainer>
  );
};