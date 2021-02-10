import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ILocationDisplayProps } from './ILocationDisplay';
import './LocationDisplay.css';

function LocationDisplay({weatherData}: ILocationDisplayProps) {

  const displayName = weatherData.state ? `${weatherData.state}` : `${weatherData.country}`;
  
  // Get current local time in displayed location
  const getCurrentTime = (timezoneOffset: number = 0) => {

     let d = new Date()
      let localTime = d.getTime()
      let localOffset = d.getTimezoneOffset() * 60000
      let utc = localTime + localOffset
      let timeZoneAdjusted = utc + (1000 * timezoneOffset)
      let date = new Date(timeZoneAdjusted);
   
    return (date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
  }
  
  return (
    
    <div className="locationDisplayCard">
        {weatherData.errorMessage &&
          <div className="errorMessage">Unable to Retrieve Weather Data: {weatherData.errorMessage}</div>
        }
        {(weatherData.id === undefined || weatherData.id < 0) &&
          <div className="errorMessage">
            No weather data found for that location.
          </div>
        }
        {(!weatherData.errorMessage && weatherData.id !== undefined && weatherData.id >= 0) &&
        <div>
          <Row>
            <Col xs={10}>
              <div className="locationName textAlignLeft">{weatherData.city}, {displayName} Weather</div>
              {weatherData.dt && 
              <div className="textAlignLeft">{getCurrentTime(weatherData.timezone)}</div>}
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="textAlignLeft mainTemp">{Math.round(weatherData.temp)}&deg;F</div>
            </Col>
            <Col>
              {weatherData.iconId && 
              <div className="textAlignRight">
                <img src={"http://openweathermap.org/img/wn/" + weatherData.iconId + "@2x.png"}/>
              </div>}
            </Col>
          </Row>
          <Row className="mb30">
            <Col>
              {weatherData.feelsLike && 
              <div className="textAlignLeft">Feels Like {Math.round(weatherData.feelsLike)}&deg;F</div>}
            </Col>
            <Col>
              <div className="textAlignRight mainDescription">{weatherData.mainDescription}</div>
            </Col>
          </Row>
          {weatherData.detailedDescription && 
          <Row>
            <Col>
              <span className="textAlignLeft">
                {"Current condition is " + weatherData.detailedDescription}{weatherData.humidity ? ` with ${weatherData.humidity}% humidity. ` : ". "}
              </span>
              {weatherData.windSpeed &&
              <span className="textAlignLeft">Winds are at {Math.round(weatherData.windSpeed)} mph.</span>}
            </Col>
          </Row>}
        </div>}
    </div>
  );
}

export default LocationDisplay;