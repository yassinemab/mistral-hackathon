import { useState } from 'react';

interface AddressSearchProps {
  onSearchComplete: (lat: number, lon: number) => void;
}

const AddressSearch = ({ onSearchComplete }: AddressSearchProps) => {
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    if (address) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
          // Nominatim returns latitude and longitude as strings, so they need to be parsed as floats.
          const { lat, lon } = data[0];
          onSearchComplete(parseFloat(lat), parseFloat(lon));
        } else {
          alert('Aucune adresse trouvée.');
        }
      } catch (error) {
        console.error('Erreur lors de la recherche d\'adresse:', error);
        alert('Erreur lors de la recherche. Veuillez réessayer.');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une adresse..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ color: "#000" }}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
};

export default AddressSearch;
