import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./forecast.css";

const WEEK_DAY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const currentDayIndex = new Date().getDay();
  const forecastDays = WEEK_DAY.slice(currentDayIndex, WEEK_DAY.length).concat(
    WEEK_DAY.slice(0, currentDayIndex)
  );

  // Generate an array of dates for the forecast
  const forecastDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  });

  // Prepare data for the temperature chart
  const chartData = data.list.slice(0, 7).map((item, idx) => ({
    name: forecastDays[idx],
    minTemp: Math.round(item.main.temp_min),
    maxTemp: Math.round(item.main.temp_max),
  }));

  return (
    <>
      <label className="title">
        <h3>Daily</h3>
      </label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icon-weather/${item.weather[0].icon}.png`}
                  />
                  <label className="day">
                    {forecastDays[idx]} ({forecastDates[idx]})
                  </label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-detail-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hPa</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Wind speeds:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Sea level:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-detail-grid-item">
                  <label>Feels like:</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="temperature-chart">
        <label className="title">
          <h3>Temperature</h3>
        </label>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 14 }} />
            <YAxis tick={{ fill: "#555", fontSize: 14 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
            />
            <Line
              type="monotone"
              dataKey="minTemp"
              stroke="#8884d8"
              strokeWidth={3} // Increased strokeWidth for bolder line
              name="Min Temp"
            />
            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#82ca9d"
              strokeWidth={3} // Increased strokeWidth for bolder line
              name="Max Temp"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Forecast;
