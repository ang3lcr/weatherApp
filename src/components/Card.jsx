import axios from "axios";
import { useEffect, useState } from "react";
import './Card.css'

function Card() {
  const [weather, setWeather] = useState({});
  const [isCelsius, setIsCelsius] = useState(true);
  const [isFarenheit, setIsFarenheit] = useState(true);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  let apiKey = "953649b7d1a1947b183b4d9462971683"
  let weatherUrl;




  const success = (position) => {
     latitude = position.coords.latitude
     longitude = position.coords.longitude
  }

useEffect(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);

  })

}, [])

useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then((res) => {
    setWeather(res.data);
  });
}, []);


function changeUnits(){
  setIsCelsius(!isCelsius)
  setIsFarenheit(!isFarenheit)
}








  return (
    <div className="card">
    <h1>Weather App</h1>
    <h2>{weather.name}, {weather?.sys?.country}</h2>



    <div className="element-1">
      <img className="icon-img" src={`http://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} />
    </div>

    <div className="degrees" >
            {isCelsius ? weather.main.temp : weather.main.temp * 1.8}{" "}
            {isCelsius ? "C°" : "F°"}
        </div>


    <div className="element-2">
      <ul className="list">
        <li>Wind Speed: {weather.wind?.speed}</li>
        <li>Clouds: {weather.clouds?.all}%</li>
        <li>Pressure: {weather.main?.pressure} mb</li>
      </ul>
    </div>
    <button onClick={changeUnits}>°F / °C</button>

    </div>

  )
}

export default Card;
