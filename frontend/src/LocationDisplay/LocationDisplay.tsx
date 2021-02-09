import React from 'react';
import { ILocationDisplayProps } from './ILocationDisplay';
import './LocationDisplay.css';

function LocationDisplay({weatherData}: ILocationDisplayProps) {
  
  return (
    <div>
        {JSON.stringify(weatherData)}
    </div>
  );
}

export default LocationDisplay;