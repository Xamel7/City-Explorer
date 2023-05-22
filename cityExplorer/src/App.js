import logo from './logo.svg';
import './App.css';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';

function App() {
  let typedText = ""
  const [displayCityInfo, setDisplayCityInfo] = useState("");
  const [inputCity, setInputCity] = useState("");

  function radar(event){
    setInputCity(event.target.value)
  }

  const button = async () => {
    const apiKey = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.
    REACT_APP_LOCATION_API_KEY}&q=${inputCity}&format=json`)
      .then(async function(response){
        setDisplayCityInfo(response.data[0])
      })
      
      return apiKey
  }
  
  return (
    <div className="App">
      <header className="App-header">
        

        <Form.Control onChange={radar} type="text" placeholder="Explore the world!" />
        <Button onClick={ button }>Explore!</Button>
        {displayCityInfo.display_name}
        {displayCityInfo.lon}
        {displayCityInfo.lat}

      </header>
    </div>
  );
}

export default App;
