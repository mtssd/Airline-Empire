import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Plane } from 'lucide-react';

const AuthContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #005f99, #007acc);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
`;

const AuthContent = styled.div`
  width: 100%;
  max-width: 500px;
`;

const BrandHeader = styled(animated.div)`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: white;
`;

const BrandLogo = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.lg};
  backdrop-filter: blur(10px);
`;

const BrandTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-family: ${props => props.theme.fonts.heading};
`;

const BrandSubtitle = styled.p`
  font-size: 1.125rem;
  margin: 0;
  opacity: 0.9;
`;

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 30 }
  });

  return (
    <AuthContainer>
      <AuthContent>
        <BrandHeader style={headerSpring}>
          <BrandLogo>
            <Plane size={40} />
          </BrandLogo>
          <BrandTitle>Airline Empire</BrandTitle>
          <BrandSubtitle>Comprehensive Airline Management Simulation</BrandSubtitle>
        </BrandHeader>

        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </AuthContent>
    </AuthContainer>
  );
};