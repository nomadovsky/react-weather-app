import styled from "styled-components";
import React, { useEffect, useState } from "react";
import CityWeatherDetails from "./components/CityWeather";
import Forecast from "./components/Forecast";
import VideoBg from "./components/VideoBg";
import SearchBar from "./components/SearchBar";
import "./styles/App.css";

const Container = styled.div`
  inset: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    rgb(75, 119, 141, 0.6),
    rgb(143, 217, 168, 0.6)
  );
`;
const App = () => {
  const [data, setData] = useState({});
  const [value, setValue] = useState("");
  const [state, setState] = useState("");
  const [forecastData, setForecastData] = useState(null);

  const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
  const API = `http://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=${APIKey}&units=metric`;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data.cod === 200) {
          const lat = data.coord.lat;
          const lon = data.coord.lon;
          const API_FORECAST = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&hourly&appid=${APIKey}&units=metric`;
          fetch(API_FORECAST)
            .then((res) => res.json())
            .then((forecastData) => setForecastData(forecastData));
        }
      });
  }, [API]);

  const handleOnChange = (e) => setValue(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setState(value);
    setValue("");
  };

  return (
    <>
      <VideoBg data={data} />
      <Container>
        <form onSubmit={handleOnSubmit}>
          <SearchBar value={value} onChange={handleOnChange} />
        </form>
        <CityWeatherDetails data={data} />
      </Container>
      {forecastData ? <Forecast data={forecastData} /> : null}
    </>
  );
};

export default App;
