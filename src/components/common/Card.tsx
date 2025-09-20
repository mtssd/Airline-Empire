import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const CardContainer = styled(animated.div)`
  background: white;
  border-radius: 12px;
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.md};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.neutralDark};
  margin: 0;
`;

const CardContent = styled.div`
  color: ${props => props.theme.colors.gray[700]};
`;

interface CardProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  action, 
  className,
  delay = 0 
}) => {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay,
    config: { tension: 300, friction: 30 }
  });

  return (
    <CardContainer style={cardSpring} className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {action}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </CardContainer>
  );
};