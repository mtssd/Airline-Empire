import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const ButtonContainer = styled(animated.button)<{ 
  $variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  $size?: 'sm' | 'md' | 'lg';
}>`
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  
  ${props => {
    const { variant = 'primary', size = 'md' } = props;
    const theme = props.theme;
    
    const variants = {
      primary: {
        background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        color: 'white',
        boxShadow: theme.shadows.md
      },
      secondary: {
        background: theme.colors.gray[100],
        color: theme.colors.gray[700],
        boxShadow: theme.shadows.sm
      },
      accent: {
        background: `linear-gradient(135deg, ${theme.colors.accent}, #ffaa00)`,
        color: theme.colors.neutralDark,
        boxShadow: theme.shadows.md
      },
      outline: {
        background: 'transparent',
        color: theme.colors.primary,
        border: `2px solid ${theme.colors.primary}`,
        boxShadow: 'none'
      }
    };

    const sizes = {
      sm: { padding: '8px 16px', fontSize: '0.875rem' },
      md: { padding: '12px 24px', fontSize: '1rem' },
      lg: { padding: '16px 32px', fontSize: '1.125rem' }
    };

    return {
      ...variants[variant],
      ...sizes[size]
    };
  }}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  className
}) => {
  const buttonSpring = useSpring({
    from: { scale: 0.95 },
    to: { scale: 1 },
    config: { tension: 300, friction: 10 }
  });

  return (
    <ButtonContainer
      style={buttonSpring}
      $variant={variant}
      $size={size}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </ButtonContainer>
  );
};