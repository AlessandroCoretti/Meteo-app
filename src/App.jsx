import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomHeader from "./components/CustomCarousel";
import CustomDays from "./components/CustomDays";
import CustomMenu from "./components/CustomMenu";
import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

function App() {
  const cities = ["Roma", "Milano", "Napoli", "Torino"];
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(cities[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [bgDaysColor, setBgDaysColor] = useState("");
  const [bgMenuColor, setBgMenuColor] = useState("");

  const fetchWeatherData = async (city) => {
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

      const description = weather.weather[0].description;
      if (description.includes("clear")) {
        setBgImage(
          "https://media.istockphoto.com/id/1200224188/it/foto/nuvole-bianche-e-sole-nel-cielo-blu.jpg?s=612x612&w=0&k=20&c=2uQ9xGZ-mmkiSF6cYiNkMYAb7d6o1V_oatc6DUGgcjY="
        );
        setBgDaysColor("#638c9dc4");
        setBgMenuColor("#638c9d");
      } else if (description.includes("clouds")) {
        setBgImage("https://media.istockphoto.com/id/157527872/it/foto/storm-cloud.jpg?s=612x612&w=0&k=20&c=EJR-bXv7MRmeDrTK5wj35FCSO4ENgdq6t3pez2zQbZg=");
        setBgDaysColor("");
        setBgMenuColor("");
      } else if (description.includes("rain")) {
        setBgImage("https://media.istockphoto.com/id/1464684269/it/foto/pioggia.jpg?s=612x612&w=0&k=20&c=Ax5ExpTNIZjAFd-jRPHptkZlaWWiu0Q87AJ2P_jawuE=");
        setBgDaysColor("");
        setBgMenuColor("");
      } else {
        setBgImage(
          "https://media.istockphoto.com/id/612023744/it/foto/cielo-al-tramonto-blu-e-arancione.jpg?s=612x612&w=0&k=20&c=MOieVs5PySxV2ZfWmHzAbNwB7yTRNblMEn9VEsffJ8E="
        );
        setBgDaysColor("");
        setBgMenuColor("");
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=6&appid=5bc798bf6e0a7f6e2bf47de173ec5151`
      );

      const forecast = await forecastRes.json();
      setForecastData(forecast.list);
    } catch (err) {
      setError(err.message || "Data not found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (selectedIndex) => {
    const selectedCity = cities[selectedIndex];
    setCity(selectedCity);
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  return (
    <div style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
      <Carousel activeIndex={cities.indexOf(city)} onSelect={handleSelect} interval={null} controls={false} indicators={true} touch={true}>
        {cities.map((city, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex justify-content-center pt-4">
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Inserisci città" className="form-control w-50" />
              <button onClick={fetchWeatherData} className="btn btn-primary mx-2">
                Cerca
              </button>
            </div>

            {isLoading && <div>Caricamento...</div>}
            {error && <div className="text-danger">{error}</div>}
            {weatherData && <CustomHeader weatherData={weatherData} />}

            <CustomDays forecastData={forecastData} bgColor={bgDaysColor} />
          </Carousel.Item>
        ))}
      </Carousel>
      <CustomMenu bgColor={bgMenuColor} />
    </div>
  );
}

export default App;
