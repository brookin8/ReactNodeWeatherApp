import React from 'react';
import './App.css';
import { IWeatherQuery } from './classes/WeatherClasses';
import { WeatherService } from './services/WeatherService';
import LocationPrompt from './components/LocationPrompt/LocationPrompt';
import LocationDisplay from './components/LocationDisplay/LocationDisplay';
import { IAppProps, IAppState } from './IApp';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

class App extends React.Component<IAppProps,IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
        weatherData: {
          id: -1,
          temp: -1,
          city: '',
          state: '',
          country: '',
          mainDescription: '',
          detailedDescription: '',
          iconId: '',
          errorMessage: ''
        },
        loaded: false,
        cities: Array<string>()
    };
    this.getWeather = this.getWeather.bind(this);
  }

  async componentDidMount() {
    let _cities = await WeatherService.loadCities();
    console.log(_cities.length);
    this.setState({
      cities: _cities
    })
  }

  async getWeather(params: IWeatherQuery): Promise<void> {
    let _weatherData = await WeatherService.getWeather(params);
    this.setState({
      weatherData: _weatherData,
      loaded: true
    });
  }

  render() {
    return (
      <Container className="App">
        <div className="centerChildren">
            <div>
              <Grid container>
                <Grid item xs>
                  <div className="appName">Palmetto WeatherApp</div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <LocationPrompt getWeather={this.getWeather} cities={this.state.cities}/>
                </Grid>
              </Grid>
              {this.state.loaded && <Grid container>
                <Grid item xs>
                  <LocationDisplay data-testid="locationDisplay" weatherData={this.state.weatherData}/>
                </Grid>
              </Grid>}
            </div>
        </div>
      </Container>
    );
  }
}

export default App;
