import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Building, 
  Award, 
  TrendingUp, 
  Globe,
  Star,
  Users,
  Calendar,
  Edit,
  Shield,
  Target
} from 'lucide-react';

const ProfileContainer = styled(animated.div)`
  max-width: 1000px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.xl};
  border-radius: 12px;
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const CompanyLogo = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;

const CompanyName = styled.h1`
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
`;

const CompanyTagline = styled.div`
  opacity: 0.9;
  margin-bottom: 1rem;
`;

const CompanyStats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.md};
  }
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

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const InfoSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.neutralDark};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.gray[700]};
  line-height: 1.6;
  margin: 0;
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.gray[50]};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.sm};
  border-left: 4px solid ${props => props.theme.colors.accent};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AchievementIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, #ffaa00);
  color: ${props => props.theme.colors.neutralDark};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AchievementInfo = styled.div`
  flex: 1;
`;

const AchievementTitle = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
`;

const AchievementDate = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.gray[600]};
`;

export const CompanyProfile: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const achievements = [
    {
      title: 'Safety Excellence Award',
      date: 'December 2024',
      icon: Shield
    },
    {
      title: '1 Million Passengers Milestone',
      date: 'November 2024',
      icon: Users
    },
    {
      title: 'Environmental Leadership Recognition',
      date: 'October 2024',
      icon: Globe
    },
    {
      title: 'Customer Service Excellence',
      date: 'September 2024',
      icon: Star
    }
  ];

  return (
    <ProfileContainer style={containerSpring}>
      <ProfileHeader>
        <CompanyLogo>
          <Building size={40} />
        </CompanyLogo>
        <CompanyName>SkyLine Airways</CompanyName>
        <CompanyTagline>Connecting the World, One Flight at a Time</CompanyTagline>
        <CompanyStats>
          <StatItem>
            <StatValue>Level 12</StatValue>
            <StatLabel>Company Level</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>$2.4M</StatValue>
            <StatLabel>Net Worth</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>98.2%</StatValue>
            <StatLabel>Safety Rating</StatLabel>
          </StatItem>
        </CompanyStats>
      </ProfileHeader>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#1d1d1d', margin: 0 }}>Company Information</h2>
        <Button variant="primary">
          <Edit size={16} />
          Edit Profile
        </Button>
      </div>

      <ProfileGrid>
        <div>
          <Card title="Company Overview" delay={200}>
            <InfoSection>
              <InfoTitle>
                <Building size={20} />
                About SkyLine Airways
              </InfoTitle>
              <InfoText>
                Founded in 2018, SkyLine Airways has quickly established itself as a premium airline focused on exceptional service and operational excellence. Our fleet of modern aircraft serves destinations across the globe, providing passengers with safe, comfortable, and reliable air travel.
              </InfoText>
            </InfoSection>

            <InfoSection>
              <InfoTitle>
                <Target size={20} />
                Mission Statement
              </InfoTitle>
              <InfoText>
                To provide world-class aviation services while maintaining the highest standards of safety, comfort, and environmental responsibility. We strive to connect people and cultures through reliable air travel.
              </InfoText>
            </InfoSection>

            <InfoSection>
              <InfoTitle>
                <Globe size={20} />
                Global Presence
              </InfoTitle>
              <InfoText>
                Operating in 15+ countries with hub operations in New York JFK and London Heathrow. Our route network spans North America, Europe, and Asia-Pacific regions with plans for expansion into emerging markets.
              </InfoText>
            </InfoSection>
          </Card>

          <Card title="Key Metrics" delay={400} style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#005f99', marginBottom: '0.5rem' }}>
                  1.2M+
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Passengers Served
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                  18
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Active Routes
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  847
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Employees
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Recent Achievements" delay={300}>
            {achievements.map((achievement, index) => (
              <Achievement key={index}>
                <AchievementIcon>
                  <Award size={20} />
                </AchievementIcon>
                <AchievementInfo>
                  <AchievementTitle>{achievement.title}</AchievementTitle>
                  <AchievementDate>{achievement.date}</AchievementDate>
                </AchievementInfo>
              </Achievement>
            ))}
          </Card>

          <Card title="Financial Summary" delay={500} style={{ marginTop: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Monthly Revenue</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>$3.74M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Operating Costs</span>
                <span style={{ fontWeight: 'bold', color: '#ef4444' }}>$2.68M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ fontWeight: '600' }}>Net Profit</span>
                <span style={{ fontWeight: 'bold', color: '#005f99' }}>$1.06M</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" style={{ width: '100%' }}>
              <TrendingUp size={14} />
              View Financial Reports
            </Button>
          </Card>
        </div>
      </ProfileGrid>
    </ProfileContainer>
  );
};