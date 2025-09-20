import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from '@react-spring/web';
import { ZoomIn, ZoomOut, Plane, MapPin, Globe } from 'lucide-react';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border-radius: 12px;
  overflow: hidden;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

const MapSvg = styled(animated.svg)`
  width: 100%;
  height: 100%;
`;

const MapControls = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const RouteInfo = styled(animated.div)`
  position: absolute;
  bottom: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  background: rgba(255, 255, 255, 0.95);
  padding: ${props => props.theme.spacing.md};
  border-radius: 8px;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
`;

const Airport = styled(animated.circle)`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const FlightPath = styled(animated.path)`
  stroke-dasharray: 5,5;
  animation: dash 20s linear infinite;
  
  @keyframes dash {
    to {
      stroke-dashoffset: -100;
    }
  }
`;

const airports = [
  { id: 'JFK', name: 'New York JFK', x: 200, y: 150 },
  { id: 'LAX', name: 'Los Angeles', x: 100, y: 180 },
  { id: 'LHR', name: 'London Heathrow', x: 350, y: 120 },
  { id: 'NRT', name: 'Tokyo Narita', x: 500, y: 140 },
  { id: 'SYD', name: 'Sydney', x: 520, y: 220 },
];

const routes = [
  { from: airports[0], to: airports[2] },
  { from: airports[1], to: airports[3] },
  { from: airports[0], to: airports[1] },
  { from: airports[2], to: airports[4] },
];

export const MapPanel: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const mapSpring = useSpring({
    transform: `scale(${zoom})`,
    config: config.wobbly
  });

  const infoSpring = useSpring({
    opacity: selectedAirport ? 1 : 0,
    transform: selectedAirport ? 'translateY(0px)' : 'translateY(10px)',
  });

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.2, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.2, 0.5));

  const handleAirportClick = (airportId: string) => {
    setSelectedAirport(selectedAirport === airportId ? null : airportId);
  };

  return (
    <MapContainer>
      <MapSvg>
        <animated.g style={mapSpring}>
          {/* Continents - simplified shapes */}
          <path
            d="M 50 100 Q 150 80 250 100 Q 350 120 450 110 Q 550 100 600 120 L 600 250 Q 500 240 400 250 Q 300 260 200 250 Q 100 240 50 250 Z"
            fill="rgba(34, 197, 94, 0.3)"
            stroke="rgba(34, 197, 94, 0.5)"
            strokeWidth="2"
          />
          
          {/* Flight routes */}
          {routes.map((route, index) => (
            <FlightPath
              key={index}
              d={`M ${route.from.x} ${route.from.y} Q ${(route.from.x + route.to.x) / 2} ${Math.min(route.from.y, route.to.y) - 40} ${route.to.x} ${route.to.y}`}
              stroke="#ffcc00"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
          ))}
          
          {/* Airports */}
          {airports.map((airport, index) => (
            <Airport
              key={airport.id}
              cx={airport.x}
              cy={airport.y}
              r="8"
              fill={selectedAirport === airport.id ? '#ffcc00' : '#005f99'}
              stroke="white"
              strokeWidth="2"
              onClick={() => handleAirportClick(airport.id)}
            />
          ))}
          
          {/* Aircraft icons on routes */}
          <g>
            <Plane 
              x="250" 
              y="130" 
              width="20" 
              height="20" 
              fill="#ffffff"
              style={{ transform: 'rotate(45deg)' }}
            />
          </g>
        </animated.g>
      </MapSvg>
      
      <MapControls>
        <ControlButton onClick={handleZoomIn}>
          <ZoomIn size={16} />
        </ControlButton>
        <ControlButton onClick={handleZoomOut}>
          <ZoomOut size={16} />
        </ControlButton>
      </MapControls>

      <RouteInfo style={infoSpring}>
        {selectedAirport ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MapPin size={16} color="#005f99" />
              <strong>{airports.find(a => a.id === selectedAirport)?.name}</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Active flights: 3 • Daily passengers: 1,247
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Globe size={16} color="#005f99" />
              <strong>Global Network</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Click on airports for details
            </div>
          </div>
        )}
      </RouteInfo>
    </MapContainer>
  );
};