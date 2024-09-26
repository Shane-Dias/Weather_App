import React from 'react';
import {useEffect,useState} from 'react';
import './App.css'

const App = () => {
  const [city, setCity] = useState("Delhi")
  const [weather, setWeather] = useState(null) // Stores the weather data 
  const apikey='6a1e90f3f6eb5aa5d6838f1bf94b60c6'

  const weatherdata= async () => {
    try {
      const fetchdata=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
      const data= await fetchdata.json();
      setWeather(data)
      console.log(data)
      // console.log(fetchdata)
    } catch (error) {
      console.error(`Some error occured:${error}`)
    }
  }
  // useEffect(() => {
  //   weatherdata()
  // }, [])

  const handleChange= (e) => {
    setCity(e.target.value)
  }
  const handleClick= (e) => {
    weatherdata()
  }
  
  
  return (
    <div>
      <div className="input" >
        <input type="text" placeholder='Enter city name' value={city} onChange={handleChange} /> 
        <button type="button" onClick={handleClick}>Enter</button>
      </div>
      <div className="weatherdata">
        <div className="cityname">{city}</div>
        {
          weather?(
          <div className="output">
            <div className='temp'>
            <p>Temperature:{weather.main.temp}°C</p>
            <p>Feels link:{weather.main.feels_like}°C</p>
            </div>
            <div className="humidity">
              <p>Humidity:{weather.main.humidity}%</p>
            </div>
            <div className="pressure">
              <p>Pressure:{weather.main.pressure}hPa</p>
            </div>
            <div className="desc">
              <p>{weather.weather[0].description}.</p>
            </div>
            <div className="wind/visibilty" style={{display:'flex', gap:'5px'}}>
              <p>Wind Speed:{(weather.wind.speed*3.6).toFixed(1)}km/hr</p>
              <p>Visibility:{weather.visibility/1000}km</p>
            </div>
          </div>
          ):(<div className="loading">Loading...</div>)
        }
      </div>
    </div>
  )
}

export default App
//City Name
//Temp and feels like
//Humidity
//Air pressure
//Weather description
//wind and visibility