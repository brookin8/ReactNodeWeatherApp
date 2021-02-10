'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const apiKey = process.env.API_KEY;
const apiURL = process.env.API_URL;
const port = 3001;
let cityCache = [];


// Grab array of cities with corresponding data from API
const getCityData = function() {
  if(cityCache.length < 1) {
    let rawdata = fs.readFileSync('city.list.min.json');
    let cities = JSON.parse(rawdata);
    cityCache = cities;
  }
}

const getQuery = function(params) {
  let query = params.zip ? `zip=${params.zip}` : 
    (`q=${params.city}` + ( params.state ? `,${params.state}` : '') + ( params.country ? `,${params.country}` : params.state ? 'US' : ''));
  return query;
}

app.get('/api/currentWeather', async (req, res) => {
  if(!req.query.zip && !req.query.city) {
    res.status(500).send(JSON.stringify({ errorMessage: `Please provide a location` }))
  };
  
  let query = getQuery(req.query);
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const apiResponse = await fetch(
      `${apiURL}/weather?${query}&units=imperial&appid=${apiKey}`
    );
    const apiResponseJson = await apiResponse.json();
    res.send(apiResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ errorMessage: `There was an error processing the request` }));
  }
});

app.get('/api/forecastWeather', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const apiResponse = await fetch(
      `${apiURL}/daily?id=${req.query.id}&cnt=7&units=imperial&appid=${apiKey}`
    );
    const apiResponseJson = await apiResponse.json();
    res.send(apiResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ errorMessage: `There was an error processing the request` }));
  }
});

// Gets state back for US cities from stored city values (not provided in API response)
app.get('/api/getState', async (req, res) => {  
  res.setHeader('Content-Type', 'application/json');
  console.log(req.query.id);
  console.log(req.query.lat);
  console.log(req.query.lon);
  let test = cityCache.find(city => city.name === "Charlottesville" && city.state === "VA");
  console.log(test);
  try {
    const filterResponse = req.query.id > 0 
      ? cityCache.find(city => city.id.toString() === req.query.id)
      : cityCache.find(city => (
        city.name === req.query.name 
        && city.coord.lat.toString().slice(0,3) === req.query.lat.slice(0,3)
        && city.coord.lon.toString().slice(0,3) === req.query.lon.slice(0,3)
      ));
    const filterResponseJson = filterResponse ? JSON.stringify(filterResponse) : JSON.stringify({});
    res.send(filterResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ errorMessage: `There was an error processing the request` }));
  }
});

// Future State - Autocomplete
/*
app.get('/api/loadCities', async (req, res) => {  

  res.setHeader('Content-Type', 'application/json');
  try {
    const cityResponse = cityCache.map(city => city.name + (city.state ? `, ${city.state}` : '') + `, ${city.country}`);
    const cityResponseJson = cityResponse && cityResponse.length > 0 ? JSON.stringify(cityResponse) : JSON.stringify([]);
    res.send(cityResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ errorMessage: `There was an error processing the request` }));
  }
});
*/

app.listen(port, () =>
  console.log('Express server is running on localhost:3001'),
  getCityData()
);