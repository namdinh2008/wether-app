import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer,
  CartesianGrid
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
    <CartesianGrid strokeDasharray="3 3" /> {/* Add this for grid lines */}
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
      name="Temp"
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
    </div>
  );
};

export default Forecast;
