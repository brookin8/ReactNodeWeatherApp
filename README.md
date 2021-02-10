# ReactNodeWeatherApp
A weather app built using React, Typescript and Node

# Basic Architecture & Technologies
- Frontend: React, Typescript, Material-UI
- Backend: Node, Express
- Frontend communicates with backend through WeatherService, and http-proxy-middleware
- Basic testing implemented using Jest
- The city.list.min.json file is a download that the API utilized here provides. It includes all of the cities that API has weather information for (I used it to implement an autocomplete feature). 

# To Run in Development
- Run npm i from the command line in root, frontend, and backend directories
- Navigate back to root directory, and run "npm run dev" (Concurrently will start up both the back and front end)
- Make sure you have a .env file in the backend directory on the same level as server.js with the following variables defined: NODE_ENV=development, API_KEY=*******************************, API_URL=http://api.openweathermap.org/data/2.5, PORT = 3001

# Future Enhancements
- Optimize autocomplete (look into virtualization, store city data in a much better (sorted) way, use cases for caching)
- More/Better error handling
- Jest: Implement Best Practices & Add Tests for React Hooks, and for Node backend (Jest is not my expertise)
- Material UI: Implement Best Practices (This was my first time using, mainly for the autocomplete component)
- Front page defaults to either last searched location weather, or uses GPS for current location
- Hourly/Weekly Forecast
- Internet Explorer & other older browser compatibility (if needed)
- Convert css to sass/templates
- Move service & shared classes out to custom npm packages
