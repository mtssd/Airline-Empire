import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Eye,
  MousePointer,
  Heart,
  Globe,
  Megaphone
} from 'lucide-react';

const MarketingContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const CampaignCard = styled(Card)`
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    transform: translateY(-4px);
  }
`;

const CampaignHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CampaignStatus = styled.span<{ $status: 'active' | 'paused' | 'completed' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    const { $status } = props;
    if ($status === 'active') return '#dcfce7';
    if ($status === 'paused') return '#fef3cd';
    return '#e0f2fe';
  }};
  color: ${props => {
    const { $status } = props;
    if ($status === 'active') return '#16a34a';
    if ($status === 'paused') return '#d97706';
    return '#0284c7';
  }};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const KPICard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.accent}, #ffaa00);
  color: ${props => props.theme.colors.neutralDark};
  padding: ${props => props.theme.spacing.lg};
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const MarketingDashboard: React.FC = () => {
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const campaigns = [
    {
      id: 1,
      name: 'Premium Routes Launch',
      status: 'active' as const,
      budget: '$15,000',
      spent: '$8,450',
      impressions: '247K',
      clicks: '12,340',
      conversions: '1,247',
      roi: '+234%'
    },
    {
      id: 2,
      name: 'Summer Travel Deals',
      status: 'active' as const,
      budget: '$25,000',
      spent: '$22,100',
      impressions: '589K',
      clicks: '28,750',
      conversions: '3,456',
      roi: '+187%'
    },
    {
      id: 3,
      name: 'Business Class Upgrade',
      status: 'completed' as const,
      budget: '$12,000',
      spent: '$12,000',
      impressions: '156K',
      clicks: '8,920',
      conversions: '892',
      roi: '+156%'
    },
  ];

  const kpis = [
    { icon: Eye, label: 'Total Impressions', value: '2.4M', change: '+12%' },
    { icon: MousePointer, label: 'Click Rate', value: '4.8%', change: '+0.3%' },
    { icon: Heart, label: 'Brand Sentiment', value: '8.7/10', change: '+0.4' },
    { icon: Users, label: 'New Customers', value: '1,247', change: '+18%' },
  ];

  return (
    <MarketingContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Marketing Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="outline">
            <Globe size={16} />
            Analytics
          </Button>
          <Button variant="accent">
            <Megaphone size={16} />
            New Campaign
          </Button>
        </div>
      </div>

      <KPIGrid>
        {kpis.map((kpi, index) => (
          <KPICard key={index}>
            <kpi.icon size={32} style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {kpi.value}
            </div>
            <div style={{ marginBottom: '0.5rem', opacity: 0.9 }}>{kpi.label}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
              {kpi.change} vs last month
            </div>
          </KPICard>
        ))}
      </KPIGrid>

      <CampaignGrid>
        {campaigns.map((campaign, index) => (
          <CampaignCard key={campaign.id} delay={index * 150}>
            <CampaignHeader>
              <h3 style={{ margin: 0, color: '#1d1d1d' }}>{campaign.name}</h3>
              <CampaignStatus $status={campaign.status}>{campaign.status}</CampaignStatus>
            </CampaignHeader>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Budget Usage</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>
                  {campaign.spent} / {campaign.budget}
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${(parseInt(campaign.spent.replace(/[$,K]/g, '')) / parseInt(campaign.budget.replace(/[$,K]/g, ''))) * 100}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #ffcc00, #ffaa00)',
                  borderRadius: '4px'
                }} />
              </div>
            </div>

            <MetricsGrid>
              <Metric>
                <MetricValue>{campaign.impressions}</MetricValue>
                <MetricLabel>Impressions</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>{campaign.clicks}</MetricValue>
                <MetricLabel>Clicks</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>{campaign.conversions}</MetricValue>
                <MetricLabel>Conversions</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>{campaign.roi}</MetricValue>
                <MetricLabel>ROI</MetricLabel>
              </Metric>
            </MetricsGrid>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="primary" size="sm" style={{ flex: 1 }}>
                Manage Campaign
              </Button>
              <Button variant="outline" size="sm">
                <Target size={14} />
                Optimize
              </Button>
            </div>
          </CampaignCard>
        ))}
      </CampaignGrid>

      <Card title="Marketing Performance Trends" delay={600}>
        <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)', borderRadius: '8px' }}>
          <div style={{ textAlign: 'center' }}>
            <TrendingUp size={48} color="#005f99" style={{ margin: '0 auto 1rem' }} />
            <div style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Performance analytics chart</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
              Customer acquisition, retention, and engagement metrics
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <Button variant="primary" size="sm">View Full Analytics</Button>
          <Button variant="outline" size="sm">Export Report</Button>
        </div>
      </Card>
    </MarketingContainer>
  );
};