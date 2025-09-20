import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Lightbulb, 
  Zap, 
  Shield, 
  Fuel, 
  Monitor,
  CheckCircle,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

const ResearchContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.gray[100]};
  color: ${props => props.$active ? 'white' : props.theme.colors.gray[700]};
  font-weight: 500;
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.secondary : props.theme.colors.gray[200]};
    transform: translateY(-2px);
  }
`;

const TechCard = styled(Card)`
  position: relative;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TechHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TechIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const TechTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.neutralDark};
`;

const TechLevel = styled.span`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.neutralDark};
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${props => props.theme.colors.gray[200]};
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Progress = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 6px;
  transition: width 0.3s ease;
`;

const TechBenefits = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Benefit = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[700]};
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const ResearchPointsCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, #ffaa00);
  color: ${props => props.theme.colors.neutralDark};
  padding: ${props => props.theme.spacing.xl};
  border-radius: 12px;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const ResearchCenter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('efficiency');

  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const categories = [
    { id: 'efficiency', name: 'Fuel Efficiency', icon: Fuel },
    { id: 'safety', name: 'Safety Systems', icon: Shield },
    { id: 'comfort', name: 'Passenger Comfort', icon: Star },
    { id: 'technology', name: 'Avionics', icon: Monitor },
  ];

  const technologies = {
    efficiency: [
      {
        name: 'Advanced Engine Technology',
        icon: Zap,
        level: 3,
        progress: 67,
        cost: '2,400 RP',
        benefits: ['15% fuel efficiency improvement', 'Reduced maintenance costs', 'Lower emissions']
      },
      {
        name: 'Lightweight Materials',
        icon: TrendingUp,
        level: 2,
        progress: 34,
        cost: '1,800 RP',
        benefits: ['8% weight reduction', 'Increased payload capacity', 'Better fuel economy']
      }
    ],
    safety: [
      {
        name: 'Enhanced Weather Radar',
        icon: Shield,
        level: 4,
        progress: 89,
        cost: '3,200 RP',
        benefits: ['Improved weather detection', 'Safer flight operations', 'Reduced delays']
      },
      {
        name: 'Collision Avoidance System',
        icon: Monitor,
        level: 2,
        progress: 45,
        cost: '2,800 RP',
        benefits: ['Advanced collision detection', 'Automated evasive maneuvers', 'Enhanced safety rating']
      }
    ],
    comfort: [
      {
        name: 'Premium Cabin Design',
        icon: Star,
        level: 3,
        progress: 78,
        cost: '2,000 RP',
        benefits: ['20% increase in passenger satisfaction', 'Premium pricing opportunities', 'Competitive advantage']
      },
      {
        name: 'Advanced Entertainment System',
        icon: Monitor,
        level: 1,
        progress: 23,
        cost: '1,500 RP',
        benefits: ['State-of-art IFE', 'Wi-Fi connectivity', 'Enhanced passenger experience']
      }
    ],
    technology: [
      {
        name: 'Next-Gen Autopilot',
        icon: Monitor,
        level: 5,
        progress: 92,
        cost: '4,500 RP',
        benefits: ['Fully automated flight operations', 'Reduced pilot workload', 'Precision navigation']
      },
      {
        name: 'Digital Twin Technology',
        icon: TrendingUp,
        level: 1,
        progress: 12,
        cost: '3,800 RP',
        benefits: ['Predictive maintenance', 'Optimized operations', 'Cost reduction']
      }
    ]
  };

  const currentTechnologies = technologies[activeCategory as keyof typeof technologies] || [];

  return (
    <ResearchContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Research & Development Center</h1>
        <Button variant="primary">
          <Lightbulb size={16} />
          Innovation Lab
        </Button>
      </div>

      <ResearchPointsCard>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Star size={32} />
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>14,750</div>
        </div>
        <div style={{ fontSize: '1.125rem', fontWeight: '500' }}>Available Research Points</div>
        <div style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem' }}>
          +450 RP per day from ongoing operations
        </div>
      </ResearchPointsCard>

      <CategoryTabs>
        {categories.map(category => (
          <Tab
            key={category.id}
            $active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={16} style={{ marginRight: '8px' }} />
            {category.name}
          </Tab>
        ))}
      </CategoryTabs>

      <ResearchGrid>
        {currentTechnologies.map((tech, index) => (
          <TechCard key={index} delay={index * 200}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <TechIcon>
                <tech.icon size={24} />
              </TechIcon>
              <div style={{ flex: 1 }}>
                <TechTitle>{tech.name}</TechTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <TechLevel>Level {tech.level}</TechLevel>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    Cost: {tech.cost}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Progress</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#005f99' }}>
                {tech.progress}%
              </span>
            </div>
            
            <ProgressBar>
              <Progress $progress={tech.progress} />
            </ProgressBar>

            <TechBenefits>
              {tech.benefits.map((benefit, benefitIndex) => (
                <Benefit key={benefitIndex}>
                  <CheckCircle size={14} color="#10b981" />
                  {benefit}
                </Benefit>
              ))}
            </TechBenefits>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>
                Research
              </Button>
              <Button variant="outline" size="sm">
                <Clock size={14} />
                Details
              </Button>
            </div>
          </TechCard>
        ))}
      </ResearchGrid>
    </ResearchContainer>
  );
};