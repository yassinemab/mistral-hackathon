import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  position: [number, number];
  showMap: boolean;
}
const MapView = ({ position, showMap }: MapViewProps) => {
  const zoom = 13;

  return (
    <div style={{ opacity: showMap ? 1 : 0 }}>

      <MapContainer center={position} zoom={zoom} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Un lieu intéressant.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
