import axios from "axios";

// Convert a city name to coordinates
export async function geocodeCity(city) {
  const q = encodeURIComponent(city);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1&language=en&format=json`;
  const res = await axios.get(url);
  const data = res.data;

  if (!data.results || data.results.length === 0)
    throw new Error("City not found");

  const { name, country, latitude: lat, longitude: lon } = data.results[0];
  return { name, country, lat, lon };
}

// Get current weather by coordinates
export async function fetchCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const res = await axios.get(url);
  const data = res.data;

  if (!data.current_weather)
    throw new Error("Weather data not available");

  return data;
}
