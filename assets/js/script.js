// define variable for button
const button = document.getElementById('button-addon2')

// request API for forecast container
function getWeatherData(city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=9997ba272b04892d57f7add3dd35b249&units=imperial';

// fetch API to make GET request to API
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayWeatherData(data);
    });
}

// function to display weather data in forecast container
function displayWeatherData(weatherData) {
    // define variables from data extracted from API
    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    // display data from API to forecast container
    document.getElementById('forecastCity').textContent = cityName;
    document.getElementById('temp').textContent = 'Temperature: ' + temperature +'\u2109';
    document.getElementById('humidity').textContent = 'Humidity: ' + humidity + "%";
    document.getElementById('windSpeed').textContent = 'Wind Speed: ' + windSpeed + 'MPH';
}

// request API for five day container
function getForecastData(city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=9997ba272b04892d57f7add3dd35b249&units=imperial';
    
// fetch API to make GET request to API
fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayForecastData(data);
    });
}

// function to display 5 day weather data in five day container
function displayForecastData(forecastData) {

    let dateEls = document.getElementsByClassName('date');
    let iconEls = document.getElementsByClassName('icon');
    let tempEls = document.getElementsByClassName('temp');
    let humidityEls = document.getElementsByClassName('humidity');
    let windSpeedEls = document.getElementsByClassName('windSpeed');

    // for loop to iterate through 5 days of forecast
    for (let i = 0; i < dateEls.length; i++) {
        let forecastItem = forecastData.list[i*8];

    // define variables from data extracted from API
    let dateTime = forecastItem.dt_txt.slice(0, 10);
    let temperature = forecastItem.main.temp;
    let humidity = forecastItem.main.humidity;
    let windSpeed = forecastItem.wind.speed;

    // display data from API to 5 day container
    dateEls[i].textContent = dateTime;
    iconEls[i].textContent = '\u2600';
    tempEls[i].textContent = 'Temp: ' + temperature + '\u2109';
    humidityEls[i].textContent = 'Humidity: ' + humidity + "%";
    windSpeedEls[i].textContent = 'Wind: ' + windSpeed + 'MPH';
    }
}


// event listener for search button to generate forecast and five day information from API on click
button.addEventListener('click', function (event) {
    event.preventDefault();
    const cityEntry = document.querySelector('.form-control').value;
    document.querySelector('.form-control').value = "";
    getWeatherData(cityEntry);
    getForecastData(cityEntry);

    // grabbing the array from local storage if it exists, and assigning that to searchHistory
    let searchHistory = JSON.parse(localStorage.getItem('city')) || []
    searchHistory.push(cityEntry);
    localStorage.setItem('city', JSON.stringify(searchHistory));

    // create new button based on user searchHistory that will generate the weather data for that city
    let historyButton = document.createElement('button');
    historyButton.textContent = cityEntry
    historyButton.classList.add("btn", "rounded", "btn-outline-secondary", "primary", "mb-1");
    historyButton.addEventListener('click', function (event) { 
        getWeatherData(event.target.textContent);
        getForecastData(event.target.textContent);    
    })

    // attach the button onto page
    document.querySelector('.cityOptions').append(historyButton);
});