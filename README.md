# ReactNodeWeatherApp
A weather app built using React, Typescript and Node

# Basic Architecture & Technologies
- Frontend: React, Typescript, HTML, CSS
- Backend: Node, Express
- Frontend communicates with backend through WeatherService, and http-proxy-middleware
- Basic testing implemented using Jest

# TODO
- Implement Tests
- Ensure mobile compatibility X

# To Run in Development
- Run npm i from the command line in root, frontend, and backend directories
- Navigate back to root directory, and run "npm run dev" (Concurrently will start up both the back and front end)

# Future Enhancements
- Typeahead/Autocomplete for cities - storing formatted cities to ultimately pass through to prompt/form component, but was not able to find quickly implemented autocomplete/suggestion component for React and Typescript 
- Front page defaults to either last searched location weather, or uses GPS for current location
- Hourly Forecast
- IE compatibility (if needed)
- Loading functionality (if needed)
- Convert css to sass
- Move service & shared classes out to custom npm packages