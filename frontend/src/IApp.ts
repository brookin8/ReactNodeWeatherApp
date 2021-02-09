import { IWeatherData } from "./Services";

export interface IAppProps {}

export interface IAppState {
  weatherData: IWeatherData;
  loaded: boolean;
}