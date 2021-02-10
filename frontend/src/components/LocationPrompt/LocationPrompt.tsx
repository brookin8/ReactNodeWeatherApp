import React, { useState } from 'react';
import { IWeatherQuery, statesArray } from '../../classes/WeatherClasses';
import { ILocationPromptProps, ILocationPromptState } from './ILocationPrompt';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './LocationPrompt.css';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

class LocationPrompt extends React.Component<ILocationPromptProps,ILocationPromptState> {
  constructor(props: ILocationPromptProps) {
    super(props);
    this.state = {
        weatherParams: {},
        errorMessage: ""
    };
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.formatWeatherParams = this.formatWeatherParams.bind(this);
  }
  setErrorMessage(message: string) : void {
    this.setState({
      errorMessage: message
    });
  }
  handleKeyPress(e: React.KeyboardEvent<any>) : void {
    if(e.key.toLowerCase() === 'enter') {
      e.preventDefault();
      this.props.getWeather(this.state.weatherParams);
    }
  }
  handleOnBlur() : void {
    this.props.getWeather(this.state.weatherParams);
  }
  // Parses user input into IWeatherQuery
  formatWeatherParams(value: any): IWeatherQuery {
    let formattedWeatherParams: IWeatherQuery = {};

    let strInput = value;
    if(!strInput) return formattedWeatherParams;
    if(strInput.length < 1) {
      this.setErrorMessage("Location is not valid");
      return formattedWeatherParams;
    }

    // Check for Zip Input First
    if( /^\d+$/.test(strInput[0])) {
      let formattedZip = strInput;
      // Check if they provided in long zip format. If so, trim.
      if(strInput[5] === "-") formattedZip = strInput.slice(0,5);
      // If not right number of characters, return error message
      if(formattedZip.length != 5) {
        this.setErrorMessage("Zip code is not valid");
        return formattedWeatherParams;
      }
      formattedWeatherParams.zip = formattedZip;
    } else { // If City Input
      // City is only required field in this scenario. Expect City, State, Country format
      let strArray = strInput.split(",").map((str: string) => str.trim());
      formattedWeatherParams.city = strArray[0];
      // Still may be some strange edge cases where a country code is the same as a state code
      // However, this does not appear to currently be affecting performance
      formattedWeatherParams.state = strArray.length > 1 && statesArray.indexOf(strArray[1]) > -1 ? strArray[1] : '';
      formattedWeatherParams.country = strArray.length > 2 ? strArray[2] : 
        strArray.length > 1 && statesArray.indexOf(strArray[1]) < 0 ? strArray[1] : '';
    }
    return formattedWeatherParams;
  }
  render() {
    const filterOptions = createFilterOptions({
      matchFrom: 'start',
      limit: 5
    });
  
    return (
      <div className="mtb2rem" data-testid="locationPrompt">
        <Autocomplete
          id="autoComplete"
          freeSolo
          options={this.props.cities}
          onChange={(event: any, value: any) => this.setState({weatherParams: this.formatWeatherParams(value)})}
          onKeyPress={(e: any) => this.handleKeyPress(e) }
          onBlur={(e:any) => this.handleOnBlur()}
          filterOptions={filterOptions}
          renderInput={(params) => (
            <TextField {...params} label="Enter Zip or City" 
              margin="normal" variant="filled" 
              className="autoComplete" fullWidth
                />
          )}
        />
      </div>
    );
  }
}

export default LocationPrompt;