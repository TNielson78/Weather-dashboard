var searchHistory = []
var API = '330f80ef281593b850548bb6ba30d4cf'
var searchBtn = document.getElementById('searchBtn')
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

        getWeather(lat,lon)
    })
}
function getWeather(lat,lon){
    var weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API}`
    fetch(weatherUrl).then(response => response.json()).then(data => {
        console.log(data)
    })

}
searchBtn.addEventListener('click', function (event) {
    var cityName = document.getElementById('city-name').value
    getGeolocation(cityName)
})