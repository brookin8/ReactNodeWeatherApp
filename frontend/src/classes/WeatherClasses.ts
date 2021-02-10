export interface IWeatherQuery {
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
}

export interface IWeatherData {
    id: number;
    city: string;
    state: string;
    country: string;
    mainDescription: string;
    detailedDescription: string;
    temp: number;
    feelsLike: number;
    windSpeed: number;
    iconId: string;
    windDirection?: string;
    pressure?: number;
    humidity?: number;
    dt?: number;
    sunrise?: number;
    sunset?: number;
    timezone?: number;
    errorMessage: string;
}

export const statesArray = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
