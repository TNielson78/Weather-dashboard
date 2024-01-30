let searchedCities = JSON.parse(localStorage.getItem('search-history')) || []
// User specific api Key for api call
var API = '330f80ef281593b850548bb6ba30d4cf'
var searchBtn = document.getElementById('searchBtn')
var fiveDayWeatherEl = document.querySelector(".five-day-weather")
function getGeolocation(city) {
  var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`
  fetch(geoUrl).then(response => response.json()).then(data => {

    var lat = data[0].lat
    var lon = data[0].lon
    var cityName = data[0].name
    if (searchedCities.indexOf(cityName) === -1) {
      searchedCities.push(cityName)
      localStorage.setItem('search-history', JSON.stringify(searchedCities))
    }

    getWeather(lat, lon)
  })
}
// Lat and Lon added so weather can be city specific
function getWeather(lat, lon) {
  document.getElementById('current-weather').innerHTML = ''
  // Current weather API
  var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API}`
  fetch(weatherUrl).then(response => response.json()).then(data => {
    console.log(data)
    // specific labeling for calling temp, humidity, and windspeed 
    var temp = data.main.temp
    var ptemp = document.createElement('p')
    ptemp.textContent = 'temperature: ' + temp;
    var humidity = data.main.humidity
    var phum = document.createElement('p')
    phum.textContent = 'humidity: ' + humidity;
    var windspeed = data.wind.speed
    var pwind = document.createElement('p')
    pwind.textContent = 'windspeed: ' + windspeed

    console.log(windspeed)
    document.getElementById('current-weather').append(ptemp, phum, pwind)
    document.getElementById('current-city').textContent = data.name
    // search history display
    displaySearchHistory()
  })
  getforecast(lat, lon)
}
// 5 day forecast api 
function getforecast(lat, lon) {
  document.querySelector('.five-day-weather').innerHTML = ''
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API}&units=imperial`
  fetch(forecastUrl).then(response => response.json()).then(data => {
    console.log(data)
    var forecastarray = []
    for (var i = 0; i < data.list.length; i++) {
      var time = data.list[i].dt_txt.split(' ')[1]
      if (time === '12:00:00') {
        forecastarray.push(data.list[i])
      }
    }
    console.log(forecastarray)
    // For loop and code for 5day forecast, display cards.
    for (var i = 0; i < forecastarray.length; i++) {
      var temp = forecastarray[i].main.temp
      var ptemp = document.createElement('p')
      ptemp.textContent = 'temperature: ' + temp;
      var humidity = forecastarray[i].main.humidity
      var phum = document.createElement('p')
      phum.textContent = 'humidity: ' + humidity;
      var windspeed = forecastarray[i].wind.speed
      var pwind = document.createElement('p')
      pwind.textContent = 'windspeed: ' + windspeed
      var cardDiv = document.createElement('div')
      cardDiv.setAttribute('class', 'card xm-5 ')
      cardDiv.setAttribute('style', "width: 13rem;")
      var cardBody = document.createElement('div')
      cardBody.setAttribute('class', 'card-body')
      var cardTitle = document.createElement('h5')
      cardTitle.setAttribute('class', 'card-title')
      cardBody.append(cardTitle)
      cardBody.append(ptemp, phum, pwind)
      cardDiv.append(cardBody)
      document.querySelector('.five-day-weather').append(cardDiv)
    }
  })
}
// Button added that also logs previous city and displays
searchBtn.addEventListener('click', function (event) {
  var cityName = document.getElementById('cityInput').value
  getGeolocation(cityName)
})
function displaySearchHistory() {

  var searchHistoryContainer = document.getElementById("search-history")
  searchHistoryContainer.innerHTML = ""
  for (var i = 0; i < searchedCities.length; i++) {
    var button = document.createElement("button")
    button.classList.add('searchHistoryBtn')
    button.textContent = searchedCities[i]
    button.setAttribute('value', searchedCities[i])
    button.addEventListener('click', function () {
      getGeolocation(this.value)
      console.log(this)
    })
    searchHistoryContainer.appendChild(button)
  }
}
displaySearchHistory()




