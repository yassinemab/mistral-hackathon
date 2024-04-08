import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/api/axiosInstance";
import Icon from "../components/Icon";
import MapView from "../components/MapView";
import {HeaderMapForm} from "../components/HeaderMapForm.tsx";

type Location = {
  id?: number;
  name: string;
  x_coordinate: number;
  y_coordinate: number;
};

export default function MapOverview() {
  const [locations, setLocations] = useState<Location[]>([]);

  const [position, setPosition] = useState<[number, number]>([48.8566, 2.3522]);
  const [showMap, setShowMap] = useState(false);

  const updatePositionByAddress = (lat, lon) => {
    setShowMap(false);
    setPosition([lat, lon]);
    setShowMap(true);
  };

  const [searchForm, setSearchForm] = useState<{
    address: string;
    date: Date;
    vehicle: string;
  }>({
    date: new Date(),
    address: "",
    vehicle: "",
  });

  // Fetch all locations initially
  useEffect(() => {
    axiosInstance.get("/api/v1/locations/").then((res) => {});
  }, []);

  const handleSearch = async () => {
    if (searchForm.address) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchForm.address
      )}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          // Nominatim returns latitude and longitude as strings, so they need to be parsed as floats.
          const { lat, lon } = data[0];
          updatePositionByAddress(parseFloat(lat), parseFloat(lon));
        } else {
          alert("Aucune adresse trouvée.");
        }
      } catch (error) {
        console.error("Erreur lors de la recherche d'adresse:", error);
        alert("Erreur lors de la recherche. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="w-full h-screen">
      <HeaderMapForm
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSearch();
        }}
        onDestinationChange={(destination) =>
          setSearchForm({ ...searchForm, address: destination })
        }
        onDateChange={(date) => setSearchForm({ ...searchForm, date })}
        onVehicleChange={(vehicle) =>
          setSearchForm({ ...searchForm, vehicle })
        }
      />
      <div className="w-full h-full">
        <MapView
          position={position}
          key={`${position[0]}.${position[1]}`}
        />
      </div>
    </div>
  );
}

