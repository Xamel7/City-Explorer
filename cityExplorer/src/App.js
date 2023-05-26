import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Weather from './comp/weather';

function App() {
  const [displayCityInfo, setDisplayCityInfo] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [error, setError] = useState(null);
  const [catchError, setCatchError] = useState(null);
  const [weatherData, setWeatherData] = useState([]);
  const mapData = `https://maps.locationiq.com/v3/staticmap?key=${process.env.
    REACT_APP_LOCATION_API_KEY}&center=${displayCityInfo.lat},${displayCityInfo.lon}&zoom=13`

  function radar(event) {
    setInputCity(event.target.value)
  }

  const button = () => {
    const apiKey = axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.
      REACT_APP_LOCATION_API_KEY}&q=${inputCity}&format=json`)
      .then(function (response) {
        setDisplayCityInfo(response.data[0])
        setError(null)
      }).catch(function (error) {
        setError(error.message)
      })

    const weatherResponse = axios.get(`http://localhost:3000/weatherData?searchQuery=${inputCity}`)
    weatherResponse.then(function (res) {
      console.log(res.data)
      setWeatherData(res.data)
      setCatchError(null);
    }).catch(function (catchError) {
      console.log(catchError.message)
      setCatchError(catchError.message)
    })
    return apiKey
  }

  let mapElement = displayCityInfo ? <img src={mapData} alt="mapImage" /> : <></>

  return (
    <div className="App">
      <header className="App-header">


        <Form.Control onChange={radar} type="text" placeholder="Explore the world!" />
        <Button onClick={button}>Explore!</Button>
        {displayCityInfo.display_name}
        {displayCityInfo.lon}
        {displayCityInfo.lat}
        {mapElement}
        <p style={{ color: 'white' }}> {error}</p>
      </header>
      <Weather weatherData={weatherData} />
      {catchError}
    </div>
  );
}

export default App;