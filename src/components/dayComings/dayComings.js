import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
  } from "react-accessible-accordion";
import "./dayComings.css";



const DayComings = ({ data }) => {
    if (!data || !data.list) {
        return <p></p>; // Fallback for missing data
      }

    const forecastDates = Array.from({ length: 4 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
      });
  return (
    <Accordion allowZeroExpanded className="wrap-flex comings-day">
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
                  <div className="min-max">{Math.round(item.main.temp)}°C</div>
                  <div className="description">{item.main.humidity}% Humidity</div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              {/* <div className="daily-details-grid">
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
              </div> */}
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
  )
}

export default DayComings;
