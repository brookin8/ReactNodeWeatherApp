import { IWeatherData, IWeatherQuery } from "../../classes/WeatherClasses";

export interface ILocationPromptProps {
    getWeather: (params: IWeatherQuery) => void;
}