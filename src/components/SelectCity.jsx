import { useContext, useEffect } from "react";
import { CityContext } from "../contexts/CityContext.jsx";
import cities from "../others/cities.js";

const baseUrl = 'https://api.tomtom.com/search/2/reverseGeocode';
const apiKey = 'fIPvoNR6jQbl3jMnCArYi5AAHgQzLvpL';

function SelectCity() {

  const { selectedCity, setSelectedCity } = useContext(CityContext);

  useEffect(
    () => {
      if ("geolocation" in navigator) {
        const success = (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetch(`${baseUrl}/${lat},${lon}.json?key=${apiKey}`)
            .then(response => {
              if(!response.ok) {
                throw new Error('Could not fetch the geocode.');
              }
              return response.json();
            }).then(data => {
              const city = cities.find(city => {
                return city.id === data?.addresses?.[0]?.address?.postalCode?.slice(0, 2);
              });
              if (!city) {
                throw new Error('Could not retrieve the city.');
              }
              setSelectedCity(city.id);
            }).catch(err => { console.error(err) });
        };
        const error = (err) => { console.warn(err.message) };
        navigator.geolocation.getCurrentPosition(success, error);
      };
    },
    [setSelectedCity]
  );

  const handleCityChange = (event) => {
    const city = cities.find(city => city.id === event.target.value);
    setSelectedCity(city.id);
  };

  return (
    <section id="select-city">
      <select
        id="cities"
        value={selectedCity}
        onChange={handleCityChange}
      >
        {cities.map(city =>
        <option value={city.id} key={city.id}>{city.name}</option>
        )}
      </select>
    </section>
  );
};

export default SelectCity;
