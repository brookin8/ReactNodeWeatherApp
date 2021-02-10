import React, { Props } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import LocationPrompt from './LocationPrompt';
import { createMount } from "@material-ui/core/test-utils";
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import App from '../../App';
import { ILocationPromptProps } from './ILocationPrompt';

jest.doMock('./ComponentToMock', () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

// Rendering
function renderLocationPrompt(props: Partial<ILocationPromptProps> = {}) {
  const defaultProps: ILocationPromptProps = {
    getWeather() {
      return;
    },
    cities: []
  };
  return render(<LocationPrompt {...defaultProps} {...props} />);
}

test("should display user instructions for search", async () => {
  const { queryById } = renderLocationPrompt();

  const loginForm = await findById("autoCOmplete");

  expect(loginForm).toHaveFormValues({
    username: "",
    password: "",
    remember: true
  });
});

describe("<LocationPrompt/>", () => {
  let wrapper: any;
  let mount: any;
  const props = {
    getWeather: jest.fn(),
    cities: []
  };

  beforeEach(() => {
      mount = createMount();
      wrapper = mount(renderLocationPrompt());
  });

  // must be called first
  it("should render ", () => {
    expect(wrapper.find(Typography).at(0)).toHaveLength(1);
      expect(
          wrapper
              .find(Typography)
              .at(0)
              .text(),
      ).toContain("Edit Profile");
  });
  it("calls getWeather on Enter key press", () => {
      const input = screen.getByTestId("locationPrompt");
      fireEvent.keyDown(input, { target: { value: "new value" }, key: 'Enter'});
      expect(props.getWeather).toHaveBeenCalledTimes(1);
  });

  it("should render <EditProfileForm/>", () => {
      expect(wrapper).toHaveLength(1);
  });

});