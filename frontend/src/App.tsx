import React from 'react';
import './App.css';
import { IWeatherData, IWeatherQuery, WeatherService } from './Services';
import LocationPrompt from './LocationPrompt/LocationPrompt';
import LocationDisplay from './LocationDisplay/LocationDisplay';
import { IAppProps, IAppState } from './IApp';

class App extends React.Component<IAppProps,IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
        weatherData: {
          id: -1,
          city: '',
          state: '',
          country: '',
          mainDescription: '',
          detailedDescription: '',
          errorMessage: ''
        },
        loaded: false
    };
    this.getWeather = this.getWeather.bind(this);
  }

  async getWeather(params: IWeatherQuery): Promise<void> {
    let _weatherData = await WeatherService.getWeather(params);
    this.setState({
      weatherData: _weatherData,
      loaded: true
    });
  }

  render() {
    //let response: any = fetch('api/greeting').then((resp) => resp.json()).then(data => console.log(data));
    return (
      <div className="App">
        <LocationPrompt getWeather={this.getWeather}/>
        {this.state.loaded && <LocationDisplay weatherData={this.state.weatherData}/>}
      </div>
    );
  }
}

export default App;
