import React from 'react';
import { IWeatherQuery } from '../Services';
import { ILocationPromptProps } from './ILocationPrompt';
import './LocationPrompt.css';

function LocationPrompt({getWeather}: ILocationPromptProps) {
  const weatherParams: IWeatherQuery = {
    city: 'London'
  };
  return (
    <div>
      <div>{`Get Weather`}</div>
      <button onClick={(e) => getWeather(weatherParams)}>{"Get Weather in London"}</button>
    </div>
  );
}

export default LocationPrompt;