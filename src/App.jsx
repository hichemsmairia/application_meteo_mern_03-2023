import React, { useState, useEffect } from "react";
import getWeatherForCity from "./services/weatherService";
import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherIcon = (iconParameter) => {
    const icon = `https://openweathermap.org/img/wn/${iconParameter}@2x.png`;
    return <img src={icon} alt="" />;
  };
  const searchWeather = (city) => {
    getWeatherForCity(city).then((result) => {
      console.log(result.data);
      setWeatherData(result.data);
    });
  };
  useEffect(() => {
    searchWeather("paris");
  }, []);
  return (
    <div className="container my-5">
      <h1 className="text-center title">Méteo</h1>
      <form onSubmit={searchWeather}>
        <div className="search-box">
          <input
            type="text"
            name="city"
            placeholder="Nom du ville ?"
            onChange={(e) => setQuery(e.target.value)}
            className="form-control text-muted form-rounded p-4 shadow-sm"
          />
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              searchWeather(query);
            }}
          >
            Rechercher
          </button>
        </div>
      </form>
      <div className="card rounded my-3 shadow-lg back-card">
        <div className="card-top text-center my-3">
          <div className="city-name my-3">
            <p>{weatherData && weatherData.name}</p>
          </div>
        </div>

        <div className="card-body my-5">
          <div className="card-mid row">
            <div className="col-8 text-center temp">
              <span>{weatherData && weatherData.main.temp}&deg;C</span>
            </div>
            <div className="col-4">
              <p className="condition">
                {weatherData && weatherData.weather[0].description}
              </p>
              <p className="high">Max: 30&deg;C</p>
              <p className="low">Min: 27&deg;C</p>
            </div>
          </div>

          <div className="icon-container card shadow mx-auto">
            {getWeatherIcon(weatherData && weatherData.weather[0].icon)}
          </div>
          <div className="card-bottom px-5 py-4 row">
            <div className="col text-center">
              <p>{weatherData && weatherData.main.humidity}%</p>
              <span>Humidité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
