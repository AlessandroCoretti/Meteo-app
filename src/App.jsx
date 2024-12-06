import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomHeader from "./components/CustomCarousel";
import CustomDays from "./components/CustomDays";
import CustomMenu from "./components/CustomMenu";
import { useState, useEffect } from "react";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Roma");
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const locationRes = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=5bc798bf6e0a7f6e2bf47de173ec5151`);
      const locationData = await locationRes.json();

      if (!locationData || locationData.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon, name } = locationData[0];
      if (!lat || !lon || !name) {
        throw new Error("Not found data for location");
      }

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5bc798bf6e0a7f6e2bf47de173ec5151`
      );
      const weather = await weatherRes.json();
      if (!weather.main) {
        throw new Error("weather not found");
      }

      setWeatherData({
        city: name,
        temperature: Math.round(weather.main.temp),
        minTemp: Math.round(weather.main.temp_min),
        maxTemp: Math.round(weather.main.temp_max),
        description: weather.weather[0].description,
      });
    } catch (err) {
      setError(err.message || "Data not found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Inserisci città" className="form-control w-50" />
        <button onClick={fetchWeatherData} className="btn btn-primary mx-2">
          Cerca
        </button>
      </div>

      {isLoading && <div>Caricamento...</div>}
      {error && <div className="text-danger">{error}</div>}
      {weatherData && <CustomHeader weatherData={weatherData} />}

      <CustomDays />
      <CustomMenu />
    </>
  );
}

export default App;
