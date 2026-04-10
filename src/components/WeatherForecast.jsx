import { useContext, useState, useEffect } from "react";
import { CityContext } from "../contexts/CityContext.jsx";
import plantPreloader from '../others/plant-preloader.gif';
import cities from "../others/cities.js";
import '../css/weather-icons.css';

const baseUrl = 'https://api.tomorrow.io/v4/weather/forecast';
const apiKey = 'pngbGz0Ku8gfo7JQy8ZBErLWGvvolX4m';

function WeatherForecast() {

  const { selectedCity } = useContext(CityContext);

  const [ daily, setDaily ] = useState([]);
  const [ days, setDays ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ failure, setFailure] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFailure(false);
    const city = cities.find(city => city.id === selectedCity).name;
    fetch(`${baseUrl}?location=${city}&timesteps=1d&units=metric&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' }
      }
    )
      .then(response => {
        if(!response.ok) {
          throw new Error('Could not fetch the weather forecast.');
        }
        return response.json();
      })
      .then(data => {
        const daily = data?.timelines?.daily?.slice(0, 6);
        if (!daily) {
          throw new Error('Could not retrieve the daily data.');
        };
        setDaily(daily);
        setDays(sixDays());
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setFailure(true);
        console.error(err);
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
      {loading ?
      <div className='preloader'>
        <img src={plantPreloader} alt='Yükleniyor...' />
      </div>
      :
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
      {failure &&
      <div className="failure">
        Hava tahminine erişilemedi.
      </div>
      }
    </section>
  );
};

export default WeatherForecast;
