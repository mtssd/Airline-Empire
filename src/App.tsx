import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { NetworkOverview } from './pages/network/NetworkOverview';
import { RouteManagement } from './pages/network/RouteManagement';
import { AircraftOverview } from './pages/aircraft/AircraftOverview';
import { FleetManagement } from './pages/aircraft/FleetManagement';
import { StaffOverview } from './pages/staff/StaffOverview';
import { ResearchCenter } from './pages/research/ResearchCenter';
import { FinancesOverview } from './pages/finances/FinancesOverview';
import { MarketingDashboard } from './pages/marketing/MarketingDashboard';
import { CompanyProfile } from './pages/company/CompanyProfile';
import { Shop } from './pages/shop/Shop';
import { Alliance } from './pages/Alliance';
import { GlobalChat } from './pages/GlobalChat';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.neutralLight};
`;

const MainContent = styled.div`
  display: flex;
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ProtectedRoute>
            <AppContainer>
              <Header />
              <MainContent>
                <Sidebar />
                <ContentArea>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/network" element={<NetworkOverview />} />
                    <Route path="/network/routes" element={<RouteManagement />} />
                    <Route path="/aircraft" element={<AircraftOverview />} />
                    <Route path="/aircraft/fleet" element={<FleetManagement />} />
                    <Route path="/staff" element={<StaffOverview />} />
                    <Route path="/staff/overview" element={<StaffOverview />} />
                    <Route path="/research" element={<ResearchCenter />} />
                    <Route path="/finances" element={<FinancesOverview />} />
                    <Route path="/finances/overview" element={<FinancesOverview />} />
                    <Route path="/marketing" element={<MarketingDashboard />} />
                    <Route path="/company/overview" element={<CompanyProfile />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/alliance" element={<Alliance />} />
                    <Route path="/chatv2" element={<GlobalChat />} />
                  </Routes>
                </ContentArea>
              </MainContent>
            </AppContainer>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;