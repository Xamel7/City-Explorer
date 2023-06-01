import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Weather from './comp/weather';
import Movies from './comp/Movies'

function App() {

  const [displayCityInfo, setDisplayCityInfo] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [error, setError] = useState(null);

  const [weatherData, setWeatherData] = useState([]);
  const [catchError, setCatchError] = useState(null);

  const [movieData, setMovieData] = useState([]);
  const [show, setShow] = useState(false);
  const [movieError, setMovieError] = useState('');


  
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

    const weatherResponse = axios.get(`https://city-explorer-api-a4iy.onrender.com/weatherData?searchQuery=${inputCity}`)

    weatherResponse.then(function (res) {
      // console.log(res.data)
      setWeatherData(res.data)
      setCatchError(null);
    }).catch(function (catchError) {
      console.log(catchError.message)
      setCatchError(catchError.message)
    })

    let movieResponse = axios.get(`https://city-explorer-api-a4iy.onrender.com/movie?searchQuery=${inputCity}`)
    movieResponse.then(function(response){
      setMovieData(response.data)
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
      <Movies movieData={movieData} />
      {catchError}
    </div>
  );
}

export default App;