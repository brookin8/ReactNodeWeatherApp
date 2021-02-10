# ReactNodeWeatherApp
A weather app built using React, Typescript and Node

# Basic Architecture & Technologies
- Frontend: React, Typescript, Material-UI
- Backend: Node, Express
- Frontend communicates with backend through WeatherService, and http-proxy-middleware
- Basic testing implemented using Jest

# TODO
- Implement Tests

# To Run in Development
- Run npm i from the command line in root, frontend, and backend directories
- Navigate back to root directory, and run "npm run dev" (Concurrently will start up both the back and front end)

# Future Enhancements
- Optimize autocomplete (look into virtualization, store data sorted, find way to filter cities more logically)
- Front page defaults to either last searched location weather, or uses GPS for current location
- Hourly/Weekly Forecast
- Jest Best Practices (Not my expertise)
- IE compatibility (if needed)
- Convert css to sass/templates
- Move service & shared classes out to custom npm packages