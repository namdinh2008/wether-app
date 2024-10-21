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
  Tooltip,
  Area,
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
  const forecastDates = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  });

  // Prepare data for the temperature chart
  const chartData = data.list.slice(0, 4).map((item, idx) => ({
    name: forecastDays[idx],
    minTemp: Math.round(item.main.temp_min),
  }));

  return (
    <div className="wrap-box">
      <div className="temperature-chart">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" tick={{ fill: "#555", fontSize: 14 }} />
            <YAxis tick={{ fill: "#555", fontSize: 14 }} domain={[0, 50]} />
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
              strokeWidth={3} // Increased strokeWidth for a bolder line
              name="Min Temp"
            />
            <Area
              type="monotone"
              dataKey="minTemp"
              stroke="#8884d8"
              fill="rgba(0, 123, 255, 0.3)" // Blue color fill with 30% opacity
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Accordion allowZeroExpanded className="wrap-flex">
        {data.list.slice(0, 4).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <div className="day">{forecastDates[idx]}</div>
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icon-weather/${item.weather[0].icon}.png`}
                  />
                  <div className="description">Humidity</div>
                  <div className="min-max">{item.main.humidity}%</div>
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
    </div>
  );
};

export default Forecast;
