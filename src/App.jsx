import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Spinner from "./components/Spinner";
import { geocodeCity, fetchCurrentWeather } from "./api";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  // Function to change background based on weather code
  function getBackground(weatherCode) {
    if (weatherCode === undefined) return "default-bg";

    if ([0, 1].includes(weatherCode)) return "clear-bg";
    if ([2, 3].includes(weatherCode)) return "cloudy-bg";
    if ([61, 63, 65].includes(weatherCode)) return "rainy-bg";
    if ([71].includes(weatherCode)) return "snowy-bg";
    if ([95].includes(weatherCode)) return "storm-bg";

    return "default-bg";
  }

  const handleSearch = async (city) => {
    try {
      setError("");
      setLoading(true);
      setWeather(null);

      const loc = await geocodeCity(city);
      setLocation(loc);

      const data = await fetchCurrentWeather(loc.lat, loc.lon);
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Check for night mode
  const isNight =
    weather &&
    new Date(weather.current_weather.time).getHours() >= 18;

  return (
    <div
      className={`container ${
        weather ? getBackground(weather.current_weather.weathercode) : "default-bg"
      } ${isNight ? "night-mode" : "day-mode"}`}
    >
      <h1 className="title">Weather Now</h1>
      <p className="subtitle">Your city’s live weather with a touch of elegance ✨</p>

      <SearchBar onSearch={handleSearch} />

      {loading && <Spinner />}
      {error && <div className="error">{error}</div>}

      {weather && location && (
        <WeatherCard location={location} weatherData={weather} />
      )}

      <footer className="footer">
        Created by <span>Himanshu</span> 🌤️ | Powered by Open-Meteo
      </footer>
    </div>
  );
}

