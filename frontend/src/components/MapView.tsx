import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  position: [number, number];
}
const MapView = ({ position }: MapViewProps) => {
  const zoom = 13;

  return (
    <div className="w-full h-full">
      <MapContainer center={position} zoom={zoom} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Un lieu intéressant.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
