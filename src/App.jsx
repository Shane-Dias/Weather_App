import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); // Stores the weather data
  const [errormsg, setErrormsg] = useState("")
  const [loading, setLoading] = useState(false)
  const apikey= import.meta.env.VITE_API_KEY
  const weatherdata = async () => {
    setLoading(true)
    try {
      const fetchdata = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );
      if (fetchdata.ok) {
        const data = await fetchdata.json();
        setWeather(data);
        setErrormsg("")
        console.log(data);
        console.log(fetchdata)
      }
      else{
        setWeather(null)
        setErrormsg("You have entered an invaild city name.")
      }
    } catch (error) {
      setErrormsg("Something went wrong while fetching data")
    }
    finally{
      setLoading(false)
    }
  };
  // useEffect(() => {
  //   weatherdata()
  // }, [])

  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const handleClick = (e) => {
    weatherdata();
  };

  return (
    <>
      <div className="container">
        <div className="flex">
          <div className="input">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleChange}
              disabled={loading}
            />
            <button type="button" onClick={handleClick} disabled={loading}>
              {loading?<div className="loader"></div>:"Enter"}
            </button>
          </div>
          <div className="weatherdata">
            {weather && <div className="cityname">{weather.name.toUpperCase()}</div>}
            {errormsg && <div className="error">{errormsg}</div>}
            {weather && (
              <div className="output">
                <div className="temp">
                  <p>Temperature:{weather.main.temp}°C</p>
                  <p style={{ marginLeft: "20px" }}>
                    Feels like:{weather.main.feels_like}°C
                  </p>
                </div>
                <div className="humidity">
                  <p>Humidity:{weather.main.humidity}%</p>
                </div>
                <div className="pressure">
                  <p>Air Pressure:{weather.main.pressure} hPa</p>
                </div>
                <div className="desc">
                  <p>{weather.weather[0].description}.</p>
                </div>
                <div className="wind-visibility">
                  <p>Wind Speed:{(weather.wind.speed * 3.6).toFixed(1)}km/hr</p>
                  <p style={{ marginLeft: "20px" }}>
                    Visibility:{weather.visibility / 1000}km
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
//City Name
//Temp and feels like
//Humidity
//Air pressure
//Weather description
//wind and visibility
