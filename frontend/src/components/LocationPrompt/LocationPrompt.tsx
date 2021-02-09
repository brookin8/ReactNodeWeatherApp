import React, { useState } from 'react';
import { Form, Button, FormControl, InputGroup, Row, Col } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi';
import { IWeatherQuery } from '../../classes/WeatherClasses';
import { ILocationPromptProps } from './ILocationPrompt';
import './LocationPrompt.css';

function LocationPrompt({getWeather}: ILocationPromptProps) {
  const _emptyWeatherParams: IWeatherQuery = {};
  const [weatherParams, setWeatherParams] = useState(_emptyWeatherParams);
  const [errorMessage, setErrorMessage] = useState("");
  
  // Parses user input into IWeatherQuery
  const formatWeatherParams = (e: React.ChangeEvent<any>) => {
    let formattedWeatherParams: IWeatherQuery = {};

    let strInput = e.target.value;
    if(strInput.length < 1) setErrorMessage("Location is not valid")

    // Check for Zip Input First
    if( /^\d+$/.test(strInput[0])) {
      let formattedZip = strInput;

      // Check if they provided in long zip format. If so, trim.
      if(strInput[5] === "-") formattedZip = strInput.slice(0,5);
      // If not right number of characters, return error message
      if(formattedZip.length != 5) setErrorMessage("Zip code is not valid")
      formattedWeatherParams.zip = formattedZip;

    } else { // If City Input

      // City is only required field in this scenario. Expect City, State, Country format
      let strArray = strInput.split(",").map((str: string) => str.trim());
      formattedWeatherParams.city = strArray[0];
      formattedWeatherParams.state = strArray.length > 1 ? strArray[1] : null;
      formattedWeatherParams.country = strArray.length > 2 ? strArray[2] : null;
    }
    console.log(formattedWeatherParams);
    return formattedWeatherParams;
  }
  return (
    <div className="mtb2rem">
      <Form>
        <Form.Row>
            <Col>
            <InputGroup className="locationSearchInput">
              <FormControl
                id={"location"} 
                placeholder="Search Location" 
                onChange={(e) => setWeatherParams(formatWeatherParams(e))}
              />
              <InputGroup.Append>
                <InputGroup.Text> 
                  <div 
                    className="locationSearchButton" 
                    onClick={(e) => getWeather(weatherParams)}>
                    <FiSearch />
                  </div>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}

export default LocationPrompt;