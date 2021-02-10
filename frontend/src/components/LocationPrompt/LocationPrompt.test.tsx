import React, { Props } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LocationPrompt from './LocationPrompt';
import { createMount } from "@material-ui/core/test-utils";
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import App from '../../App';
import { ILocationPromptProps } from './ILocationPrompt';
import { shallow } from 'enzyme';
import { IWeatherQuery } from '../../classes/WeatherClasses';

// Test onChange
// Test Keypress

describe("<LocationPrompt/>", () => {
  const testProps: any = {
    getWeather: (params: IWeatherQuery) => {},
    cities: ['City1', 'City2', 'City3']
  };

  // Renders
  it('initially renders without crashing', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<LocationPrompt {... testProps} />, div);
    expect(screen.getByTestId('locationPrompt')).toBeInTheDocument();
    ReactDOM.unmountComponentAtNode(div);
  });

  // Methods
  describe('formatWeatherParams method', () => {
    it('handles empty params', () => {
      let expectedWeatherParams: IWeatherQuery = {};
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('')).toEqual(expectedWeatherParams);
    });
    it('handles 5 digit zip', () => {
      let expectedWeatherParams: IWeatherQuery = {
        zip: '22903'
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('22903')).toEqual(expectedWeatherParams);
    });
    it('handles 9 digit zip', () => {
      let expectedWeatherParams: IWeatherQuery = {
        zip: '22903'
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('22903-0456')).toEqual(expectedWeatherParams);
    });
    it('handles invalid zip', () => {
      let expectedWeatherParams: IWeatherQuery = {};
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('229034')).toEqual(expectedWeatherParams);
    });
    it('handles city', () => {
      let expectedWeatherParams: IWeatherQuery = {
        city: 'Charlottesville',
        state: '',
        country: ''
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('Charlottesville')).toEqual(expectedWeatherParams);
    });
    it('handles city and state with space after comma', () => {
      let expectedWeatherParams: IWeatherQuery = {
        city: 'Charlottesville',
        state: 'VA',
        country: ''
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('Charlottesville, VA')).toEqual(expectedWeatherParams);
    });
    it('handles city and state with no space after comma', () => {
      let expectedWeatherParams: IWeatherQuery = {
        city: 'Charlottesville',
        state: 'VA',
        country: ''
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('Charlottesville,VA')).toEqual(expectedWeatherParams);
    });
    it('handles city and country', () => {
      let expectedWeatherParams: IWeatherQuery = {
        city: 'Charlottesville',
        state: '',
        country: 'US'
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('Charlottesville, US')).toEqual(expectedWeatherParams);
    });
    it('handles city, state, and country', () => {
      let expectedWeatherParams: IWeatherQuery = {
        city: 'Charlottesville',
        state: 'VA',
        country: 'US'
      };
      const wrapper = shallow(<LocationPrompt {... testProps}/>);
      const instance = wrapper.instance() as any;
      expect(instance.formatWeatherParams('Charlottesville, VA, US')).toEqual(expectedWeatherParams);
    });
  })

});