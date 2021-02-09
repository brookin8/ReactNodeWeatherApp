import { IWeatherData, IWeatherQuery } from "../Services";

export interface ILocationPromptProps {
    getWeather: (params: IWeatherQuery) => void;
}