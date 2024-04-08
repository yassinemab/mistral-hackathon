import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Record } from "../pages/MapOverview";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

const MarkerComponent = ({ index, record }) => {
  const [pos, setPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      const a = await getMarkerPositionByRecord(record);
      setPos(a);
    };

    fetchData();
  }, [record]);

  return (
    <div className="">
      <Marker position={pos}>
        <Popup>
          <Link
            to={`/document/${record.id}`}
            className="w-full h-full !text-[#222222]"
          >
            <h3 className="text-3xl mb-3">{record.street}</h3>
            <div className="grid grid-cols-2">
              <div className="flex flex-col">
                <label className="text-[#222222]">City</label>
                <p className="text-[#222222]">
                  {record.city_department}, {record.city}
                </p>
              </div>
              <div className="flex flex-col">
                <label className=" p-0 m-0 text-[#222222]">House number</label>
                <p className="p-0 m-0 text-[#222222]">
                  {record.from_house_number} - {record.to_house_number}
                </p>
              </div>
            </div>
          </Link>
        </Popup>
      </Marker>
    </div>
  );
};

export const getMarkerPositionByRecord = async (record: Record) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    record.street
  )}`;

  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    // Nominatim returns latitude and longitude as strings, so they need to be parsed as floats.
    const { lat, lon } = data[0];
    return [parseFloat(lat), parseFloat(lon)];
  }
  return [0, 0];
};

const MapView = ({ records }: { records: Record[] }) => {
  const zoom = 13;

  const [pos, setPos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      const a = await getMarkerPositionByRecord(records[0]);
      setPos(a);
    };

    fetchData();
  }, [records]);

  return (
    <div className="w-full h-full">
      <MapContainer
        center={records.length > 0 ? pos : [48.864716, 2.349014]}
        zoom={zoom}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {records.map((record, index) => {
          return (
            <Fragment key={index}>
              <MarkerComponent record={record} index={index} />
            </Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
