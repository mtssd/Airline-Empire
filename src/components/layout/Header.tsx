import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { 
  Plane, 
  Bell, 
  Settings, 
  User, 
  LogOut,
  Menu, 
  X,
  Home,
  Map,
  Users,
  Search,
  DollarSign,
  ShoppingCart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HeaderContainer = styled(animated.header)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: 1000;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  text-decoration: none;
  color: white;
  font-family: ${props => props.theme.fonts.heading};
  font-weight: 700;
  font-size: 1.5rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: 6px;
  transition: all 0.2s ease;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: ${props => props.theme.spacing.sm};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.875rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileNav = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.xl};
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  color: white;
  text-decoration: none;
  padding: ${props => props.theme.spacing.lg};
  font-size: 1.125rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.xl};
  right: ${props => props.theme.spacing.xl};
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
`;

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/network', label: 'Network', icon: Map },
  { path: '/aircraft', label: 'Aircraft', icon: Plane },
  { path: '/staff', label: 'Staff', icon: Users },
  { path: '/research', label: 'Research', icon: Search },
  { path: '/finances', label: 'Finances', icon: DollarSign },
  { path: '/shop', label: 'Shop', icon: ShoppingCart }
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 300, friction: 30 }
  });

  const mobileMenuSpring = useSpring({
    transform: mobileMenuOpen ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 300, friction: 30 }
  });

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <HeaderContainer style={headerSpring}>
        <HeaderContent>
          <Logo to="/">
            <Plane size={32} />
            <span>Airline Empire</span>
          </Logo>
          
          <Nav>
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink 
                key={path} 
                to={path} 
                $active={location.pathname === path}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </Nav>

          <HeaderActions>
            <CompanyInfo>
              <div style={{ fontWeight: 600 }}>Welcome, {user?.username}</div>
              <div style={{ opacity: 0.8 }}>{user?.role === 'admin' ? 'Administrator' : 'Pilot'} • SkyLine Airways</div>
            </CompanyInfo>
            
            <IconButton>
              <Bell size={20} />
            </IconButton>
            
            <IconButton>
              <Settings size={20} />
            </IconButton>
            
            <IconButton>
              <User size={20} />
            </IconButton>
            
            <IconButton onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </IconButton>

            <MobileMenuButton onClick={handleMobileMenuToggle}>
              <Menu size={24} />
            </MobileMenuButton>
          </HeaderActions>
        </HeaderContent>
      </HeaderContainer>

      {mobileMenuOpen && (
        <MobileNav style={mobileMenuSpring}>
          <CloseButton onClick={handleMobileMenuToggle}>
            <X size={24} />
          </CloseButton>
          
          {navItems.map(({ path, label, icon: Icon }) => (
            <MobileNavLink 
              key={path} 
              to={path} 
              onClick={handleMobileMenuToggle}
            >
              <Icon size={24} />
              {label}
            </MobileNavLink>
          ))}
        </MobileNav>
      )}
    </>
  );
};