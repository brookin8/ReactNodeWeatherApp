import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';
import ReactDOM from 'react-dom';

describe("<App/>", () => {

  // Initial Render
  it('initially renders without crashing', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    ReactDOM.render(<App />, div);
    expect(screen.getByText('Palmetto WeatherApp')).toBeInTheDocument();
    expect(screen.getByText('Enter Zip or City')).toBeInTheDocument();
    const locationDisplay = screen.queryByTestId('locationDisplay')
    expect(locationDisplay).not.toBeInTheDocument();
    ReactDOM.unmountComponentAtNode(div);
  });
  it('does not initially renders weather display', () => {
    render(<App />);
    expect(screen.queryByTestId('locationDisplay')).not.toBeInTheDocument();
  });
});