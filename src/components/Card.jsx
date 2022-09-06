import axios from "axios";
import { useEffect, useState } from "react";

function Card() {
  const [weather, setWeather] = useState({});
  const [isDecimeters, setIsDecimeters] = useState(true);
  const [isHectograms, setIsHectograms] = useState(true);



  let weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=10&lon=11&appid=$953649b7d1a1947b183b4d9462971683"

  const success = (position) => {

    const latitude = position.coords.latitude
    const longitude = position.coords.longitude


    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=953649b7d1a1947b183b4d9462971683`
  }

  navigator.geolocation.getCurrentPosition(success)


  useEffect(() => {
      axios.get(weatherUrl).then((res) => {
      setWeather(res.data);
    });
  }, []);

  const changeUnits = () => {
    setIsDecimeters(!isDecimeters);
    setIsHectograms(!isHectograms);
  };


  return (


    <div className="App">


    <h1>Weather App</h1>
    <h2>{weather.name}, {weather.sys?.country}</h2>





    </div>

  )
}

export default Card;
