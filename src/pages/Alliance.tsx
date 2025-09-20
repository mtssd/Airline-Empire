import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { 
  Users, 
  Globe, 
  Handshake, 
  Star,
  TrendingUp,
  UserPlus,
  Award,
  MessageSquare
} from 'lucide-react';

const AllianceContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const AllianceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const AllianceCard = styled(Card)`
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const AllianceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const AllianceLogo = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AllianceInfo = styled.div`
  flex: 1;
  margin-left: ${props => props.theme.spacing.md};
`;

const AllianceName = styled.h3`
  margin: 0 0 4px 0;
  color: ${props => props.theme.colors.neutralDark};
`;

const AllianceLevel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
`;

const AllianceBenefits = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[700]};
`;

const AllianceActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const MyAllianceCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, #ffaa00);
  color: ${props => props.theme.colors.neutralDark};
  padding: ${props => props.theme.spacing.xl};
  border-radius: 12px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const AllianceStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  opacity: 0.8;
  font-size: 0.875rem;
`;

export const Alliance: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const availableAlliances = [
    {
      id: 1,
      name: 'Global Wings Alliance',
      level: 'Premium',
      members: 47,
      benefits: [
        'Code-share revenue +15%',
        'Maintenance cost sharing',
        'Priority airport slots',
        'Joint marketing campaigns'
      ],
      requirements: 'Level 10+ • 15+ Aircraft • Safety Rating 95%+'
    },
    {
      id: 2,
      name: 'Sky Connect Network',
      level: 'Standard',
      members: 89,
      benefits: [
        'Route coordination',
        'Staff exchange programs',
        'Bulk fuel purchasing',
        'Technical support sharing'
      ],
      requirements: 'Level 5+ • 8+ Aircraft • Safety Rating 90%+'
    },
    {
      id: 3,
      name: 'Regional Partners Group',
      level: 'Regional',
      members: 124,
      benefits: [
        'Local market insights',
        'Shared ground services',
        'Emergency assistance',
        'Training partnerships'
      ],
      requirements: 'Level 3+ • 5+ Aircraft • Safety Rating 85%+'
    },
  ];

  return (
    <AllianceContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Airline Alliances</h1>
        <Button variant="primary">
          <UserPlus size={16} />
          Create Alliance
        </Button>
      </div>

      <MyAllianceCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(0,0,0,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Handshake size={32} />
          </div>
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>Current Alliance: Sky Connect Network</h2>
            <div style={{ opacity: 0.8 }}>Member since January 2024 • Standard Tier</div>
          </div>
        </div>
        
        <AllianceStats>
          <StatItem>
            <StatValue>89</StatValue>
            <StatLabel>Alliance Members</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>+$127K</StatValue>
            <StatLabel>Monthly Benefits</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>94.2%</StatValue>
            <StatLabel>Alliance Rating</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>12</StatValue>
            <StatLabel>Shared Routes</StatLabel>
          </StatItem>
        </AllianceStats>
      </MyAllianceCard>

      <h2 style={{ color: '#1d1d1d', marginBottom: '1.5rem' }}>Available Alliances</h2>

      <AllianceGrid>
        {availableAlliances.map((alliance, index) => (
          <AllianceCard key={alliance.id} delay={index * 150}>
            <AllianceHeader>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AllianceLogo>
                  <Globe size={24} />
                </AllianceLogo>
                <AllianceInfo>
                  <AllianceName>{alliance.name}</AllianceName>
                  <AllianceLevel>{alliance.level} Tier • {alliance.members} Members</AllianceLevel>
                </AllianceInfo>
              </div>
              <Star size={20} color="#ffcc00" fill="#ffcc00" />
            </AllianceHeader>

            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
                Requirements:
              </div>
              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                {alliance.requirements}
              </div>
            </div>

            <AllianceBenefits>
              <div style={{ fontWeight: '500', marginBottom: '0.5rem', color: '#1d1d1d' }}>Benefits:</div>
              {alliance.benefits.map((benefit, benefitIndex) => (
                <Benefit key={benefitIndex}>
                  <Award size={14} color="#10b981" />
                  {benefit}
                </Benefit>
              ))}
            </AllianceBenefits>

            <AllianceActions>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>
                Apply to Join
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare size={14} />
                Contact
              </Button>
            </AllianceActions>
          </AllianceCard>
        ))}
      </AllianceGrid>
    </AllianceContainer>
  );
};