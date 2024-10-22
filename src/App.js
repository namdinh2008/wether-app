import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import { useState } from "react";
function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({
          city: searchData.label,
          ...forecastResponse,
        });
      })
      .catch((err) => console.log(err));

  };

  console.log(forecast);
  return (
    <div>
      <h1 className="title-header">Weather Forecast</h1>
      <Search onSearchChange={handleOnSearchChange} />
      <div className="container">
        <div className="contai">
          {currentWeather && <CurrentWeather data={currentWeather} />}
        </div>
        <div className="two-block">{forecast && <Forecast data={forecast} />}</div>
      </div>
    </div>
  );
}

export default App;
