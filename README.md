# ReactNodeWeatherApp
A weather app built using React, Typescript and Node

# Basic Architecture & Technologies
- Frontend: React, Typescript, Material-UI
- Backend: Node, Express
- Frontend communicates with backend through WeatherService, and http-proxy-middleware
- Basic testing implemented using Jest
- The city.list.min.json file is a download that the API utilized here provides that includes all of the cities they have weather information for. I used it to implement an autocomplete feature.

# To Run in Development
- Run npm i from the command line in root, frontend, and backend directories
- Navigate back to root directory, and run "npm run dev" (Concurrently will start up both the back and front end)

# Future Enhancements
- Optimize autocomplete - look into virtualization, store city data in a much better (sorted) way, use cases for caching
- More error handling
- Jest Best Practices & Additional Tests (Not my expertise) - Would add tests for hooks
- Material UI Best Practices (First time using - selected for access to autocomplete feature)
- Front page defaults to either last searched location weather, or uses GPS for current location
- Hourly/Weekly Forecast
- IE compatibility (if needed)
- Convert css to sass/templates
- Move service & shared classes out to custom npm packages