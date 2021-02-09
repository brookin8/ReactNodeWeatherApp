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
    temp?: number;
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

export const WeatherService = { 
    getWeather: async function(params: IWeatherQuery): Promise<IWeatherData> {
        let query = '';
        if(params.zip) {
            query += `zip=${params.zip}`;
        }
        else if(params.city) {
            query = `city=${params.city}`;
            query += params.state ? `&state=${params.state}` : ''; 
            query += params.country ? `&country=${params.country}` : '';
        } 

        // add error handling
        const response: any = await fetch(`api/weather?${query}`);
        const result: any = await response.json();

        const formattedResult: IWeatherData = {
            id: result.id,
            city: result.name,
            state: '', // Enhancement: Pull in State
            country: result.sys ? result.sys.country : '',
            mainDescription: result.weather && result.weather.length > 0 ? result.weather[0].main : '',
            detailedDescription: result.weather && result.weather.length > 0 ? result.weather[0].description : '',
            temp: result.main ? result.main.temp : '',
            feelsLike: result.main ? result.main.feels_like : '',
            windSpeed: result.wind ? result.wind.speed : '',
            windDirection: result.wind ? result.wind.deg : '',
            pressure: result.main ? result.main.pressure : '',
            humidity: result.main ? result.main.humidity : '',
            dt: result.dt,
            sunrise: result.sys ? result.sys.sunrise : '',
            sunset: result.sys ? result.sys.sunset : '',
            timezone: result.timezone,
            errorMessage: result.errorMessage
        };

        return formattedResult;
    }
}