import { IWeatherData, IWeatherQuery } from '../classes/WeatherClasses';

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

        // get current weather data
        const currentWeatherresponse: any = await fetch(`api/currentWeather?${query}`);
        const cwResult: any = await currentWeatherresponse.json();

        // Future State: get daily forecast data for next week
        // const forecastWeatherresponse: any = await fetch(`api/forecastWeather?id=${cwResult.id}`);
        // const fResult: any = await forecastWeatherresponse.json();

        // grab state from cached city data if US city
        let state = '';
        if(cwResult.sys && cwResult.sys.country === "US") {
            let stateResponse = await fetch(`api/getState?id=${cwResult.id}&name=${cwResult.name}&lat=${cwResult.coord.lat}&lon=${cwResult.coord.lon}`);
            let stateResult = await stateResponse.json();
            state = stateResult.state;
        }

        const formattedcwResult: IWeatherData = {
            id: cwResult.id,
            city: cwResult.name,
            state: state,
            country: cwResult.sys ? cwResult.sys.country : '',
            mainDescription: cwResult.weather && cwResult.weather.length > 0 ? cwResult.weather[0].main : '',
            detailedDescription: cwResult.weather && cwResult.weather.length > 0 ? cwResult.weather[0].description : '',
            iconId: cwResult.weather && cwResult.weather.length > 0 ? cwResult.weather[0].icon : '',
            temp: cwResult.main ? cwResult.main.temp : '',
            feelsLike: cwResult.main ? cwResult.main.feels_like : '',
            windSpeed: cwResult.wind ? cwResult.wind.speed : '',
            windDirection: cwResult.wind ? cwResult.wind.deg : '',
            pressure: cwResult.main ? cwResult.main.pressure : '',
            humidity: cwResult.main ? cwResult.main.humidity : '',
            dt: cwResult.dt,
            sunrise: cwResult.sys ? cwResult.sys.sunrise : '',
            sunset: cwResult.sys ? cwResult.sys.sunset : '',
            timezone: cwResult.timezone,
            errorMessage: cwResult.errorMessage
        };

        return formattedcwResult;
    }
}