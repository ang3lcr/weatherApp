import axios from "axios";
import { useEffect, useState } from "react";

function Card() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFarenheit, setIsFarenheit] = useState(true);

  let weatherUrl;
  let apiKey = "953649b7d1a1947b183b4d9462971683"
  const success = (position) => {



    function changeUnits(){
      setIsCelsius(!isCelsius)
      setIsFarenheit(!isFarenheit)
    }



    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

  }


  navigator.geolocation.getCurrentPosition(success)


  useEffect(() => {
      axios.get(weatherUrl).then((res) => {
      setWeather(res.data);
    });
  }, []);


console.log(weather);


  return (


    <div className="App">


    <h1>Weather App</h1>
    <h2>{weather.name}, {weather?.sys?.country}</h2>

    <div className="container">

    <div className="element-1">
      <img className="icon-img" src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`} />
    </div>


    <div className="element-2">
      <ul>
        <li>Wind Speed: {weather.wind?.speed}</li>
        <li>Clouds: {weather.clouds?.all}%</li>
        <li>Pressure: {weather.main?.pressure} mb</li>
        </ul>
    </div>
    </div>



    <button>°F / °C</button>

    </div>

  )
}

export default Card;
