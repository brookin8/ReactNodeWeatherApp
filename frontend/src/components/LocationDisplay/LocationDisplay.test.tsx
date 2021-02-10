import React, { Component } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LocationDisplay from './LocationDisplay';
import ReactDOM from 'react-dom';
import { IWeatherData } from '../../classes/WeatherClasses';
import { shallow } from 'enzyme';

describe("<LocationDisplay/>", () => {
  const errorProps: IWeatherData = {
    id: -1,
    temp: -1,
    feelsLike: -1,
    windSpeed: -1,
    city: '',
    state: '',
    country: '',
    mainDescription: '',
    detailedDescription: '',
    iconId: '',
    errorMessage: 'There is an error'
  };

  const dataProps: IWeatherData = {
    id: 1,
    temp: 1,
    feelsLike: 1,
    windSpeed: 1,
    city: '',
    state: '',
    country: '',
    mainDescription: '',
    detailedDescription: '',
    iconId: '',
    errorMessage: ''
  };

  // Renders
  it('renders data display', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<LocationDisplay weatherData={dataProps}/>, div);
    expect(screen.getByTestId('dataDisplay')).toBeInTheDocument();
    const errorDisplay = screen.queryByTestId('errorDisplay')
    expect(errorDisplay).not.toBeInTheDocument();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders error display', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<LocationDisplay weatherData={errorProps}/>, div);
    expect(screen.getByTestId('errorDisplay')).toBeInTheDocument();
    const dataDisplay = screen.queryByTestId('dataDisplay')
    expect(dataDisplay).not.toBeInTheDocument();
    ReactDOM.unmountComponentAtNode(div);
  });
});