import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Record } from "../pages/MapOverview";
import { Link } from "react-router-dom";

export const getMarkerPositionByRecord = (record: Record): [number, number] => {
  return record.geometry as unknown as [number, number];
};

const MapView = ({ records }: { records: Record[] }) => {
  const zoom = 13;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={
          records.length > 0
            ? getMarkerPositionByRecord(records[0])
            : [48.864716, 2.349014]
        }
        zoom={zoom}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {records.map((record, index) => {
          return (
            <div className="" key={index}>
              <Marker position={getMarkerPositionByRecord(record)}>
                <Popup>
                  <Link
                    to={`/document/${record.id}`}
                    className="w-full h-full text-[#222222]"
                  >
                    <h3 className="text-3xl mb-3">{record.street}</h3>
                    <div className="grid grid-cols-3">
                      <div className="">
                        <label>City</label>
                        <p>
                          {record.city_department}, {record.city}
                        </p>
                      </div>
                      {record.from_house_number}
                      <div className="">
                        <label>House number</label>
                        <p>
                          {record.from_house_number} - {record.to_house_number}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
