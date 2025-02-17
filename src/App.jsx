import './css/App.css';
import CityProvider from './contexts/CityContext.jsx';
import SelectCity from './components/SelectCity.jsx';
import WeatherForecast from './components/WeatherForecast.jsx';

function App() {

  return (
    <main>
      <h1>Hava Tahmini</h1>
    <CityProvider>
      <SelectCity />
      <WeatherForecast />
    </CityProvider>
    </main>
  );
};

export default App;
