var searchHistory = []
var API = '330f80ef281593b850548bb6ba30d4cf'
var searchBtn = document.getElementById('searchBtn')
var fiveDayWeatherEl = document.querySelector(".five-day-weather")
function getGeolocation(city) {
  var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`
  fetch(geoUrl).then(response => response.json()).then(data => {
    console.log(data)
    var lat = data[0].lat
    var lon = data[0].lon
    var cityName = data[0].name
    if (searchHistory.indexOf(cityName) === -1) {
      searchHistory.push(cityName)
      localStorage.setItem('search-history', JSON.stringify(searchHistory))
    }

    getWeather(lat, lon)
  })
}
function getWeather(lat, lon) {
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API}`
  fetch(weatherUrl).then(response => response.json()).then(data => {
    console.log(data)
    console.log('success')
  })

}
searchBtn.addEventListener('click', function (event) {
  var cityName = document.getElementById('cityInput').value
  getGeolocation(cityName)
})

// new code for test from chat gpt
// Define an array to store previously searched cities
let searchedCities = [];

// Function to fetch weather data for a city
async function fetchWeatherData(city) {
  try {
    const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API}'; // Replace with your API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


// Function to display weather data
function displayWeatherData(city, weatherData) {
  const weatherContainer = document.getElementById('weatherContainer');
  const cityElement = document.createElement('div');
  cityElement.innerHTML = `<h2>${city}</h2>`;
  // Extract and display relevant weather information here
  // For example: cityElement.innerHTML += `<p>Temperature: ${weatherData.main.temp}°C</p>`;
  weatherContainer.appendChild(cityElement);
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', async () => {
  const cityInput = document.getElementById('cityInput');
  const city = cityInput.value;
  if (city) {
    const weatherData = await fetchWeatherData(city);
    if (weatherData) {
      searchedCities.push(city);
      displayWeatherData(city, weatherData);
    }
  }
});

// Loop through previously searched cities and display weather data
for (const city of searchedCities) {
  fetchWeatherData(city)
    .then((weatherData) => {
      if (weatherData) {
        displayWeatherData(city, weatherData);
      }
    });
}

        // Test code for current weather conditions.........
  const apiKey = '330f80ef281593b850548bb6ba30d4cf'
  const city = 'Salt lake'; // Replace with the desired city

  const weatherContainer = document.getElementById('weather-container');

  // Api request
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API}`)
            .then(response => response.json())
            .then(data => {
                // Extract relevant weather information from the API response
                const temperature = data.main.temp;
  const conditions = data.weather[0].description;

  // weather container update function
  weatherContainer.innerHTML = `
  <h2>Current Weather in ${city}</h2>
  <p>Temperature: ${temperature}°C</p>
  <p>Conditions: ${conditions}</p>
  `;
            })
            .catch(error => {
    console.error('Error fetching weather data:', error);
  weatherContainer.innerHTML = 'Error fetching weather data';
            });


