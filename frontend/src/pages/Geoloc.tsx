import React from "react";
import MapView from "../components/MapView.tsx";
import AddressSearch from "../components/AddressSearch.tsx";

export default function Geoloc() {
  const [position, setPosition] = React.useState<[number, number]>([48.8566, 2.3522])
  const [showMap, setShowMap] = React.useState(false);

  const updatePositionByAddress = (lat, lon) => {
    setShowMap(false);
    setPosition([lat, lon]);
    setShowMap(true);
  };

  return (
    <>
      <AddressSearch onSearchComplete={updatePositionByAddress}/>
      {showMap && <MapView position={position} showMap={showMap} key={`${position[0]}.${position[1]}`}/>}
    </>
  )
}

