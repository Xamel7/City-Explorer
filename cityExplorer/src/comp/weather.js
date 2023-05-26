import React from 'react'

function Weather(props) {

    return <div>
            {props.weatherData.map(function(element){
                return <h1>{element.date} {element.description}</h1>
            })}
        </div>
}
export default Weather