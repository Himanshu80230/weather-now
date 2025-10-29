import { weatherCodeMap } from "../utils/weatherCodeMap";

export default function WeatherCard({ location, weatherData }) {
  const cw = weatherData.current_weather;
  const mapping = weatherCodeMap[cw.weathercode] || {
    label: "Unknown",
    icon: "❓",
  };

  return (
    <div className="weather-card">
      <div className="weather-main">
        <span className="weather-icon">{mapping.icon}</span>
        <div className="weather-info">
          <h2>
            {location.name}, {location.country}
          </h2>
          <p>{mapping.label}</p>
        </div>
        <div className="weather-temp">
          <h1>{Math.round(cw.temperature)}°C</h1>
          <p>Wind: {cw.windspeed} km/h</p>
        </div>
      </div>

      <div className="weather-extra">
        <p>Time: {new Date(cw.time).toLocaleString()}</p>
        <p>Code: {cw.weathercode}</p>
      </div>
    </div>
  );
}
