import { IWeatherData, IWeatherQuery } from "../../classes/WeatherClasses";

export interface ILocationPromptProps {
    getWeather: (params: IWeatherQuery) => void;
    cities: Array<string>;
}

export interface ILocationPromptState {
    errorMessage: string;
    weatherParams: IWeatherQuery;
}