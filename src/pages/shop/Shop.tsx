import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  ShoppingCart, 
  Plane, 
  Wrench, 
  Users,
  Star,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react';

const ShopContainer = styled(animated.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

const ShopControls = styled.div`
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
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
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
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  
  &:hover {
    background: ${props => props.$active ? props.theme.colors.secondary : props.theme.colors.gray[200]};
    transform: translateY(-2px);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const ProductCard = styled(Card)`
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
  }
`;

const ProductImage = styled.div<{ $category: string }>`
  height: 150px;
  background: ${props => {
    const { $category } = props;
    if ($category === 'aircraft') return 'linear-gradient(135deg, #3b82f6, #60a5fa)';
    if ($category === 'upgrades') return 'linear-gradient(135deg, #10b981, #34d399)';
    if ($category === 'services') return 'linear-gradient(135deg, #f59e0b, #fbbf24)';
    return 'linear-gradient(135deg, #8b5cf6, #a78bfa)';
  }};
  border-radius: 8px;
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ProductInfo = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProductName = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  color: ${props => props.theme.colors.neutralDark};
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
`;

const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

export const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('aircraft');
  const [searchTerm, setSearchTerm] = useState('');

  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 25 }
  });

  const categories = [
    { id: 'aircraft', name: 'Aircraft', icon: Plane },
    { id: 'upgrades', name: 'Upgrades', icon: Star },
    { id: 'services', name: 'Services', icon: Wrench },
    { id: 'staff', name: 'Staff', icon: Users },
  ];

  const products = {
    aircraft: [
      {
        id: 1,
        name: 'Boeing 737-800',
        description: 'Reliable narrow-body aircraft perfect for short to medium-haul routes with excellent fuel efficiency.',
        price: '$8.5M',
        rating: 4.5,
        category: 'aircraft'
      },
      {
        id: 2,
        name: 'Airbus A350-900',
        description: 'State-of-the-art wide-body aircraft featuring advanced materials and superior passenger comfort.',
        price: '$15.2M',
        rating: 4.8,
        category: 'aircraft'
      },
      {
        id: 3,
        name: 'Boeing 777-300ER',
        description: 'Long-haul flagship with exceptional range and capacity for premium international routes.',
        price: '$18.7M',
        rating: 4.7,
        category: 'aircraft'
      }
    ],
    upgrades: [
      {
        id: 4,
        name: 'Premium Cabin Retrofit',
        description: 'Upgrade your aircraft interiors with luxury seating and enhanced passenger amenities.',
        price: '$450K',
        rating: 4.6,
        category: 'upgrades'
      },
      {
        id: 5,
        name: 'Advanced Avionics Package',
        description: 'Next-generation flight management systems for improved safety and efficiency.',
        price: '$320K',
        rating: 4.9,
        category: 'upgrades'
      }
    ],
    services: [
      {
        id: 6,
        name: 'Comprehensive Maintenance Plan',
        description: 'Full-service maintenance package ensuring optimal aircraft performance and safety compliance.',
        price: '$75K/year',
        rating: 4.4,
        category: 'services'
      },
      {
        id: 7,
        name: 'Route Optimization Service',
        description: 'Professional route analysis and optimization to maximize profitability and efficiency.',
        price: '$25K',
        rating: 4.3,
        category: 'services'
      }
    ],
    staff: [
      {
        id: 8,
        name: 'Senior Pilot Package',
        description: 'Hire experienced pilots with international certifications and excellent safety records.',
        price: '$150K',
        rating: 4.8,
        category: 'staff'
      },
      {
        id: 9,
        name: 'Cabin Crew Training Program',
        description: 'Comprehensive training program for new cabin crew members with certification.',
        price: '$45K',
        rating: 4.5,
        category: 'staff'
      }
    ]
  };

  const currentProducts = products[activeCategory as keyof typeof products] || [];
  const filteredProducts = currentProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'aircraft': return Plane;
      case 'upgrades': return Star;
      case 'services': return Wrench;
      case 'staff': return Users;
      default: return Plane;
    }
  };

  return (
    <ShopContainer style={containerSpring}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1d1d1d' }}>Aviation Marketplace</h1>
        <Button variant="primary">
          <ShoppingCart size={16} />
          View Cart (3)
        </Button>
      </div>

      <ShopControls>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline" size="sm">
            <Search size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Filter size={16} />
          </Button>
        </SearchContainer>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button variant="outline" size="sm">
            <Grid size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <List size={16} />
          </Button>
        </div>
      </ShopControls>

      <CategoryTabs>
        {categories.map(category => (
          <Tab
            key={category.id}
            $active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon size={16} />
            {category.name}
          </Tab>
        ))}
      </CategoryTabs>

      <ProductGrid>
        {filteredProducts.map((product, index) => {
          const ProductIcon = getProductIcon(product.category);
          return (
            <ProductCard key={product.id} delay={index * 100}>
              <ProductImage $category={product.category}>
                <ProductIcon size={48} />
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <RatingContainer>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? '#ffcc00' : 'none'}
                      color="#ffcc00"
                    />
                  ))}
                  <span style={{ marginLeft: '4px', fontSize: '0.875rem', color: '#6b7280' }}>
                    ({product.rating})
                  </span>
                </RatingContainer>
              </ProductInfo>

              <ProductFooter>
                <ProductPrice>{product.price}</ProductPrice>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant="outline" size="sm">Details</Button>
                  <Button variant="primary" size="sm">
                    <ShoppingCart size={14} />
                    Buy
                  </Button>
                </div>
              </ProductFooter>
            </ProductCard>
          );
        })}
      </ProductGrid>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <h3 style={{ margin: '0 0 0.5rem 0' }}>No products found</h3>
          <p>Try adjusting your search terms or browse different categories.</p>
        </div>
      )}
    </ShopContainer>
  );
};