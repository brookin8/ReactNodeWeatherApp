const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();
// const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const apiKey = process.env.API_KEY;
const apiURL = process.env.API_URL;
const port = 3001;
// app.use(pino);

const getQuery = function(params) {
  let query = params.zip ? `zip=${params.zip}` : 
    (`q=${params.city}` + ( params.state ? `,${params.state}` : '') + ( params.country ? `,${params.country}` : params.state ? 'US' : ''));
  return query;
}

app.get('/api/weather', async (req, res) => {
  
  if(!req.query.zip && !req.query.city) {res.status(500).send(JSON.stringify({ errorMessage: `Please provide a location` }))};
  let query = getQuery(req.query);
  console.log(req.query);
  console.log(`${apiURL}?${query}&units=imperial&appid=${apiKey}`);
  res.setHeader('Content-Type', 'application/json');
  try {
    //const { apiRoute } = req.params
    const apiResponse = await fetch(
      `${apiURL}?${query}&units=imperial&appid=${apiKey}`
    );
    const apiResponseJson = await apiResponse.json();
    res.send(apiResponseJson);
  } catch (err) {
    console.log(err);
    res.status(500).send(JSON.stringify({ errorMessage: `There was an error processing the request` }));
  }
});

app.listen(port, () =>
  console.log('Express server is running on localhost:3001')
);