import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import L from 'leaflet';
import { ZoomIn, ZoomOut, Plane, MapPin, Globe, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapContainer_Styled = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  
  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 12px;
  }
  
  .leaflet-popup-content-wrapper {
    background: white;
    border-radius: 8px;
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  .leaflet-popup-content {
    margin: 12px;
    font-family: ${props => props.theme.fonts.body};
  }
`;

const MapControls = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  z-index: 1000;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 6px;
  padding: ${props => props.theme.spacing.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: ${props => props.theme.shadows.sm};
  
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
  box-shadow: ${props => props.theme.shadows.md};
  z-index: 1000;
  max-width: 280px;
`;

const FlightPath = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 500;
`;

// Custom airport icon
const createAirportIcon = (isSelected: boolean) => {
  return L.divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background: ${isSelected ? '#ffcc00' : '#005f99'};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
    `,
    className: 'custom-airport-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Map controller component for zoom functions
const MapController: React.FC<{ onZoomIn: () => void; onZoomOut: () => void }> = ({ onZoomIn, onZoomOut }) => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
    onZoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
    onZoomOut();
  };
  
  return null;
};

interface Airport {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  passengers?: number;
  flights?: number;
}

interface Route {
  id: string;
  from: Airport;
  to: Airport;
  distance: number;
  passengers: number;
  revenue: string;
  aircraft: string;
}

const airports: Airport[] = [
  { id: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA', lat: 40.6413, lng: -73.7781, passengers: 2456, flights: 12 },
  { id: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lat: 34.0522, lng: -118.2437, passengers: 1834, flights: 8 },
  { id: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK', lat: 51.4700, lng: -0.4543, passengers: 2891, flights: 15 },
  { id: 'NRT', name: 'Tokyo Narita International', city: 'Tokyo', country: 'Japan', lat: 35.7720, lng: 140.3929, passengers: 1923, flights: 10 },
  { id: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lng: 151.1753, passengers: 1567, flights: 9 },
  { id: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lng: 55.3657, passengers: 2134, flights: 11 },
  { id: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', lat: 49.0097, lng: 2.5479, passengers: 1789, flights: 7 },
];

const routes: Route[] = [
  { id: '1', from: airports[0], to: airports[2], distance: 5585, passengers: 2456, revenue: '$45,230', aircraft: 'Boeing 777-300ER' },
  { id: '2', from: airports[1], to: airports[3], distance: 8815, passengers: 1834, revenue: '$38,920', aircraft: 'Airbus A350-900' },
  { id: '3', from: airports[0], to: airports[1], distance: 3944, passengers: 1975, revenue: '$31,450', aircraft: 'Boeing 737-800' },
  { id: '4', from: airports[2], to: airports[4], distance: 17016, passengers: 1523, revenue: '$42,180', aircraft: 'Airbus A380' },
  { id: '5', from: airports[2], to: airports[5], distance: 5493, passengers: 1892, revenue: '$35,670', aircraft: 'Boeing 787-9' },
  { id: '6', from: airports[6], to: airports[3], distance: 9714, passengers: 1456, revenue: '$39,120', aircraft: 'Airbus A350-900' },
];

export const MapPanel: React.FC = () => {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);

  const infoSpring = useSpring({
    opacity: selectedAirport || selectedRoute ? 1 : 0,
    transform: selectedAirport || selectedRoute ? 'translateY(0px)' : 'translateY(10px)',
  });

  const handleZoomIn = () => {
    if (mapRef) {
      mapRef.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef) {
      mapRef.zoomOut();
    }
  };

  const handleAirportClick = (airport: Airport) => {
    setSelectedAirport(selectedAirport?.id === airport.id ? null : airport);
    setSelectedRoute(null);
  };

  const handleRouteClick = (route: Route) => {
    setSelectedRoute(selectedRoute?.id === route.id ? null : route);
    setSelectedAirport(null);
  };

  const getRouteColor = (passengers: number) => {
    if (passengers > 2000) return '#10b981'; // Green for high traffic
    if (passengers > 1500) return '#f59e0b'; // Orange for medium traffic
    return '#3b82f6'; // Blue for lower traffic
  };

  return (
    <MapContainer_Styled>
      <MapContainer
        center={[30, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapRef}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Airport Markers */}
        {airports.map((airport) => (
          <Marker
            key={airport.id}
            position={[airport.lat, airport.lng]}
            icon={createAirportIcon(selectedAirport?.id === airport.id)}
            eventHandlers={{
              click: () => handleAirportClick(airport),
            }}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#005f99' }}>
                  {airport.name}
                </h4>
                <p style={{ margin: '4px 0', fontSize: '0.9rem' }}>
                  <strong>{airport.city}, {airport.country}</strong>
                </p>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  <div>Code: {airport.id}</div>
                  <div>Daily Passengers: {airport.passengers?.toLocaleString()}</div>
                  <div>Active Flights: {airport.flights}</div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Flight Routes */}
        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={[
              [route.from.lat, route.from.lng],
              [route.to.lat, route.to.lng]
            ]}
            color={getRouteColor(route.passengers)}
            weight={3}
            opacity={0.8}
            dashArray="10, 10"
            eventHandlers={{
              click: () => handleRouteClick(route),
            }}
            pathOptions={{
              className: 'flight-route'
            }}
          />
        ))}

        <MapController onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </MapContainer>
      
      <MapControls>
        <ControlButton onClick={handleZoomIn} title="Zoom In">
          <ZoomIn size={16} />
        </ControlButton>
        <ControlButton onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut size={16} />
        </ControlButton>
        <ControlButton onClick={() => mapRef?.setView([30, 0], 2)} title="Reset View">
          <Navigation size={16} />
        </ControlButton>
      </MapControls>

      <RouteInfo style={infoSpring}>
        {selectedAirport ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <MapPin size={16} color="#005f99" />
              <strong>{selectedAirport.name}</strong>
            </div>
            <div style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
              {selectedAirport.city}, {selectedAirport.country} ({selectedAirport.id})
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              <div>Daily passengers: {selectedAirport.passengers?.toLocaleString()}</div>
              <div>Active flights: {selectedAirport.flights}</div>
              <div>Hub status: {selectedAirport.passengers && selectedAirport.passengers > 2000 ? 'Major Hub' : 'Regional Airport'}</div>
            </div>
          </div>
        ) : selectedRoute ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Plane size={16} color="#005f99" />
              <strong>{selectedRoute.from.id} ↔ {selectedRoute.to.id}</strong>
            </div>
            <div style={{ fontSize: '0.875rem', marginBottom: '8px' }}>
              {selectedRoute.from.city} - {selectedRoute.to.city}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              <div>Distance: {selectedRoute.distance.toLocaleString()} km</div>
              <div>Daily passengers: {selectedRoute.passengers.toLocaleString()}</div>
              <div>Daily revenue: {selectedRoute.revenue}</div>
              <div>Aircraft: {selectedRoute.aircraft}</div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Globe size={16} color="#005f99" />
              <strong>Global Network Overview</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              <div>Active airports: {airports.length}</div>
              <div>Active routes: {routes.length}</div>
              <div>Click airports or routes for details</div>
            </div>
          </div>
        )}
      </RouteInfo>
    </MapContainer_Styled>
  );
};