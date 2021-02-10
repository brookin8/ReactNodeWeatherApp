import { IWeatherData } from "./classes/WeatherClasses";

export interface IAppProps {}

export interface IAppState {
  weatherData: IWeatherData;
  loaded: boolean;
  cities: Array<string>;
}