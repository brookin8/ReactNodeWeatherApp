import React from 'react';
import './App.css';
import { IWeatherQuery } from './classes/WeatherClasses';
import { WeatherService } from './services/WeatherService';
import LocationPrompt from './components/LocationPrompt/LocationPrompt';
import LocationDisplay from './components/LocationDisplay/LocationDisplay';
import { IAppProps, IAppState } from './IApp';
import { Col, Container, Row } from 'react-bootstrap';

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
    return (
      <Container className="App" fluid>
        <div className="centerChildren">
            <div className="maxWidth">
              <Row>
                <Col>
                  <div className="appName">Palmetto WeatherApp</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <LocationPrompt getWeather={this.getWeather}/>
                </Col>
              </Row>
              {this.state.loaded && 
              <Row>
                <Col>
                  <LocationDisplay weatherData={this.state.weatherData}/>
                </Col>
              </Row>}
            </div>
        </div>
      </Container>
    );
  }
}

export default App;
