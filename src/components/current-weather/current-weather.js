import React from "react";
import { useEffect, useState } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  // Function to convert degrees to compass points
  const [currentDateTime, setCurrentDateTime] = useState("");

  const convertDegreeToCompassPoint = (deg) => {
    const compassPoints = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16; // 360 / 16 = 22.5 degrees
    return compassPoints[index];
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "p.m" : "a.m";
      const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

      // Format date
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      const formattedDate = now.toLocaleDateString(undefined, options);

      // Combine time and date
      const formattedDateTime = `${formattedTime} ${formattedDate}`;
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime(); // Set the initial date and time
    const intervalId = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const windDirection = convertDegreeToCompassPoint(data.wind.deg); // Convert wind direction

  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="date">{currentDateTime}</p>
          <p className="city">{data.city}</p>
        </div>
      </div>
      <div className="bottom">
        <div className="icon-temp">
        <img
          alt="weather"
          className="weather-icon"
          src={`icon-weather/${data.weather[0].icon}.png`}
        />
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        </div>
        <p className="weather-description">{data.weather[0].description}</p>
        <div className="details">
          <div className="parameter-row">
            <div className="parameter-label">Humidity</div>
            <div className="parameter-value">{data.main.humidity}%</div>
          </div>
          <div className="parameter-row">
            <div className="parameter-label">Wind Speed</div>
            <div className="parameter-value">
              {data.wind.speed} m/s {windDirection}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
