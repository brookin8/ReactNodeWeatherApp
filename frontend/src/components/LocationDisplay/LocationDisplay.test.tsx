import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LocationDisplay from './LocationDisplay';
import ReactDOM from 'react-dom';
import { IWeatherData } from '../../classes/WeatherClasses';

describe("<LocationDisplay/>", () => {
  const errorProps: IWeatherData = {
    
  };

  
  // Conditional Render
  it('initially renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('initially renders header', () => {
    render(<App />);
    expect(screen.getByText('Palmetto WeatherApp')).toBeInTheDocument();
  });

  it('initally renders picker', () => {
    render(<App />);
    expect(screen.getByText('Enter Zip or City')).toBeInTheDocument();
  });

  it('does not initially renders weather display', () => {
    render(<App />);
    expect(screen.queryByTestId('locationDisplay')).not.toBeInTheDocument();
  });

  // Data Fetch
  /*it("renders user data", async () => {
      const fakeUser = {
        name: "Joni Baez",
        age: "32",
        address: "123, Charming Avenue"
      };
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(fakeUser)
        })
      );
    
      // Use the asynchronous version of act to apply resolved promises
      await act(async () => {
        render(<User id="123" />, container);
      });
    
      expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
      expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
      expect(container.textContent).toContain(fakeUser.address);
    
      // remove the mock to ensure tests are completely isolated
      global.fetch.mockRestore();
  });*/
});