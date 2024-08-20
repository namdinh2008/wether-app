import React from 'react';
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  // Function to convert degrees to compass points
  const convertDegreeToCompassPoint = (deg) => {
    const compassPoints = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    const index = Math.round(deg / 22.5) % 16; // 360 / 16 = 22.5 degrees
    return compassPoints[index];
  };

  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };

  const windDirection = convertDegreeToCompassPoint(data.wind.deg); // Convert wind direction

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="date">{getCurrentDate()}</p> {/* Display current date */}
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`icon-weather/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row up">
            <span className="parameter-label">Details</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Feel like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s {windDirection}</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
