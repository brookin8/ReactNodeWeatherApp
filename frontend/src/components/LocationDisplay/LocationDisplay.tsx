import React from 'react';
import Grid from '@material-ui/core/Grid';
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
    
    <div className="locationDisplayCard mb30">
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
          <Grid container>
            <Grid item xs>
              <div className="locationName textAlignLeft">{weatherData.city}, {displayName} Weather</div>
              <div className="textAlignLeft">{getCurrentTime(weatherData.timezone)}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <div className="textAlignLeft mainTemp">{Math.round(weatherData.temp)}&deg;F</div>
            </Grid>
            <Grid item xs>
            {weatherData.iconId && 
              <div className="textAlignRight">
                <img src={"http://openweathermap.org/img/wn/" + weatherData.iconId + "@2x.png"}/>
              </div>}
            </Grid>
          </Grid>
          <Grid container className="mb30">
            <Grid item xs>
              {weatherData.feelsLike && 
                <div className="textAlignLeft">Feels Like {Math.round(weatherData.feelsLike)}&deg;F</div>}
            </Grid>
            <Grid item xs>
              <div className="textAlignRight mainDescription">{weatherData.mainDescription}</div>
            </Grid>
          </Grid>
          {weatherData.detailedDescription && 
          <Grid container>
            <Grid item xs>
              <span className="textAlignLeft">
                {"Current condition is " + weatherData.detailedDescription}{weatherData.humidity ? ` with ${weatherData.humidity}% humidity. ` : ". "}
              </span>
              {weatherData.windSpeed &&
              <span className="textAlignLeft">Winds are at {Math.round(weatherData.windSpeed)} mph.</span>}
            </Grid>
          </Grid>}
        </div>}
    </div>
  );
}

export default LocationDisplay;