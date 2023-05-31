import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from 'react-bootstrap'
import React from 'react';

function Movie({id, poster_path, title, overview, release_date}) {
  return (
    <Card key={id} style={{ width: '15rem' }}>
      <Card.Img variant='bottom' src={"https://image.tmdb.org/t/p/w500/" + poster_path} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{overview}</Card.Text>
        <Card.Text>Release Date: {release_date}</Card.Text>
      </Card.Body>
    </Card>
  )
}

function Movies(props) {
  return (
    <div className='Card'>
      {props.movieData.map((movieData) => (
        <Movie
          id={movieData.id}
          title={movieData.title}
          poster_path={movieData.poster_path}
          overview={movieData.overview}
          release_date={movieData.release_date} 
          />
      ))}
    </div>
  )
}

export default Movies
