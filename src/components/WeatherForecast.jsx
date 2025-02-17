import { useContext, useState, useEffect } from "react";
import { CityContext } from "../contexts/CityContext.jsx";
import plantPreloader from '../others/plant-preloader.gif';
import cities from "../others/cities.js";
import '../css/weather-icons.css';

function WeatherForecast() {

  const { selectedCity } = useContext(CityContext);

  const [ daily, setDaily ] = useState([]);
  const [ days, setDays ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    const baseURL = 'https://api.tomorrow.io/v4/weather/forecast';
    const city = cities.find(city => city.id === selectedCity).name;
    const apiKey = 'pngbGz0Ku8gfo7JQy8ZBErLWGvvolX4m';
    fetch(`${baseURL}?location=${city}&timesteps=1d&units=metric&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' }
      }
    )
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to fetch response: ' + response.statusText);
        } else { return response.json() }
      })
      .then(data => {
        setDaily(data.timelines.daily.slice(0, 6));
        setDays(sixDays());
        setLoading(false);
      })
      .catch(error => {
        alert('Hava tahminine erişilemedi.');
        console.error('Fetch Error: ', error);
      });
  }, [selectedCity]);

  const sixDays = () => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const todayIndex = new Date().getDay();
    const sixDays = [];
    for (let i = 0; i < 6; i++) {
      sixDays.push(days[(todayIndex + i) % 7]);
    };
    return sixDays;
  };

  return (
    <section id='daily-forecast'>
      {loading &&
      <div className='preloader'>
        <img src={plantPreloader} alt='Yükleniyor...' />
      </div>
      }
      {!loading &&
      <ul className="wc-list">
        {daily.map((day, index) => (
        <li key={index}>
          <p>{days[index]}</p>
          <div className={`wc${day.values.weatherCodeMin}`}></div>
          <div className="temperatures">
            <div>{Math.round(day.values.temperatureMin)}&#176;</div>
            <div>{Math.round(day.values.temperatureMax)}&#176;</div>
          </div>
        </li>
        ))}
      </ul>
      }
    </section>
  );
};

export default WeatherForecast;
