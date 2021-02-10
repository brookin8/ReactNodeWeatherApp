import React, { useState } from 'react';
import { IWeatherQuery } from '../../classes/WeatherClasses';
import { ILocationPromptProps } from './ILocationPrompt';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './LocationPrompt.css';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

function LocationPrompt({getWeather, cities}: ILocationPromptProps) {
  const _emptyWeatherParams: IWeatherQuery = {};
  const [weatherParams, setWeatherParams] = useState(_emptyWeatherParams);
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleKeyPress = (e: React.KeyboardEvent<any>) => {
    if(e.key.toLowerCase() === 'enter') {
      e.preventDefault();
      getWeather(weatherParams);
    }
  }
  // Parses user input into IWeatherQuery
  const formatWeatherParams = (value: any) => {
    let formattedWeatherParams: IWeatherQuery = {};

    let strInput = value;
    if(!strInput) return formattedWeatherParams;
    if(strInput.length < 1) {
      setErrorMessage("Location is not valid");
      return formattedWeatherParams;
    }

    // Check for Zip Input First
    if( /^\d+$/.test(strInput[0])) {
      let formattedZip = strInput;

      // Check if they provided in long zip format. If so, trim.
      if(strInput[5] === "-") formattedZip = strInput.slice(0,5);
      // If not right number of characters, return error message
      if(formattedZip.length != 5) setErrorMessage("Zip code is not valid");
      formattedWeatherParams.zip = formattedZip;

    } else { // If City Input

      // City is only required field in this scenario. Expect City, State, Country format
      let strArray = strInput.split(",").map((str: string) => str.trim());
      formattedWeatherParams.city = strArray[0];
      formattedWeatherParams.state = strArray.length > 1 ? strArray[1] : null;
      formattedWeatherParams.country = strArray.length > 2 ? strArray[2] : null;
    }
    return formattedWeatherParams;
  }

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 5
  });

  return (
    <div className="mtb2rem">
      <Autocomplete
        id="autoComplete"
        freeSolo
        options={cities}
        onChange={(event: any, value: any) => setWeatherParams(formatWeatherParams(value))}
        onKeyPress={(e: any) => handleKeyPress(e) }
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} label="Enter Zip or City" 
            margin="normal" variant="filled" 
            className="autoComplete" fullWidth
            inputProps={{
               "data-testid": "autoCompleteText",
            }}
              />
        )}
      />
    </div>
  );
}

export default LocationPrompt;