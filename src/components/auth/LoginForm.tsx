import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';

const LoginContainer = styled(animated.div)`
  max-width: 400px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  background: white;
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing.md};
  color: white;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.neutralDark};
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-size: 1.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.gray[700]};
  font-weight: 500;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md} 48px;
  border: 2px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.gray[400]};
  z-index: 1;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${props => props.theme.spacing.md};
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[400]};
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: ${props => props.theme.colors.gray[600]};
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.sm};
  text-align: center;
`;

const DefaultCredentials = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const CredentialsTitle = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.gray[700]};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CredentialsText = styled.div`
  font-family: monospace;
  background: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: 4px;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const SwitchMode = styled.div`
  text-align: center;
  margin-top: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.gray[600]};
`;

const SwitchLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 30 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    }
  };

  const fillDefaultCredentials = () => {
    setUsername('admin');
    setPassword('admin');
  };

  return (
    <LoginContainer style={formSpring}>
      <LoginHeader>
        <Logo>
          <LogIn size={24} />
        </Logo>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your Airline Empire account</Subtitle>
      </LoginHeader>

      <DefaultCredentials>
        <CredentialsTitle>Default Login Credentials:</CredentialsTitle>
        <CredentialsText>Username: admin | Password: admin</CredentialsText>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fillDefaultCredentials}
          style={{ marginTop: '8px' }}
        >
          Use Default Credentials
        </Button>
      </DefaultCredentials>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Username</InputLabel>
          <InputContainer>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            />
          </InputContainer>
        </InputGroup>

        <InputGroup>
          <InputLabel>Password</InputLabel>
          <InputContainer>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </PasswordToggle>
          </InputContainer>
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Form>

      <SwitchMode>
        Don't have an account?{' '}
        <SwitchLink onClick={onSwitchToRegister}>
          Create one here
        </SwitchLink>
      </SwitchMode>
    </LoginContainer>
  );
};