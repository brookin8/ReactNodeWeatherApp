import React from 'react';
import { shallow } from 'enzyme';
import { IWeatherQuery } from '../classes/WeatherClasses';
import { WeatherService } from './WeatherService';

describe('Weather Service', () => {
    describe('_formatQuery method', () => {
        it('handles zip', () => {
            const testParams: IWeatherQuery = {
                city: 'Charlottesville',
                state: '',
                country: '',
                zip: '22903'
            }
            expect(WeatherService._formatQuery(testParams)).toEqual(`zip=${testParams.zip}`);
        });
        it('handles city', () => {
            const testParams: IWeatherQuery = {
                city: 'Charlottesville',
                state: '',
                country: '',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual(`city=${testParams.city}`);
        });
        it('handles city and state', () => {
            const testParams: IWeatherQuery = {
                city: 'Charlottesville',
                state: 'VA',
                country: '',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual(`city=${testParams.city}&state=${testParams.state}`);
        });
        it('handles city and country', () => {
            const testParams: IWeatherQuery = {
                city: 'Charlottesville',
                state: '',
                country: 'US',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual(`city=${testParams.city}&country=${testParams.country}`);
        });
        it('handles city and state and country', () => {
            const testParams: IWeatherQuery = {
                city: 'Charlottesville',
                state: 'VA',
                country: 'US',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual(`city=${testParams.city}&state=${testParams.state}&country=${testParams.country}`);
        });
        it('handles empty params', () => {
            const testParams: IWeatherQuery = {
                city: '',
                state: '',
                country: '',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual('');
        });
        it('handles no zip and no city', () => {
            const testParams: IWeatherQuery = {
                city: '',
                state: 'VA',
                country: 'US',
                zip: ''
            }
            expect(WeatherService._formatQuery(testParams)).toEqual('');
        });
    });
});