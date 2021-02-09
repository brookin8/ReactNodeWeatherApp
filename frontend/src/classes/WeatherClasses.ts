export interface IWeatherQuery {
    city?: string;
    state?: string;
    country?: string;
    zip?: number;
}

export interface IWeatherData {
    id: number;
    city: string;
    state: string;
    country: string;
    mainDescription: string;
    detailedDescription: string;
    iconId?: string;
    temp: number;
    feelsLike?: number;
    windSpeed?: number;
    windDirection?: string;
    pressure?: number;
    humidity?: number;
    dt?: number;
    sunrise?: number;
    sunset?: number;
    timezone?: number;
    errorMessage: string;
}
