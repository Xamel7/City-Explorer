import React from 'react'

function WeatherDay({ date, description }) {
    return (
        <div>
            <h3>Date: { date }</h3>
            <p>Description: { description }</p>
        </div>
    );
}

function Weather(props) {
    return <div>
            {props.weatherData.map(function(element) {
                return <WeatherDay date={ element.date } description={ element.description }/>
            })}
        </div>
}
export default Weather