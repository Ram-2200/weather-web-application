//Javascriptpro_
//Dont forget to follow me on github,instagram and codepen.

let cityNameInput = document.querySelector('.container .search-box input');
let weatherInfoBox = document.querySelector('.container .weather-info-box');
let weather_img = document.querySelector('.container .weather-img img');
let weatherTemp = document.querySelector('.container .weather-info-box .temp');
let weatherMain = document.querySelector('.container .weather-info-box .weather_main_1');
let weatherDescrip = document.querySelector('.container .weather-info-box .weather_descrip');
let weatherLocation = document.querySelector('.container .weather-info-box .location');
let otherWeatherInfo = document.querySelector('.container .other-weather-info');

let apiKey = ''; // OpenWeatherMap API Key

cityNameInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && cityNameInput.value.trim() !== '') {
        getWeatherInfo(cityNameInput.value.trim());
    }
});

let getWeatherInfo = (cityName) => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(res => {

            // Check whether the API request was successful
            if (!res.ok) {
                throw new Error('City not found');
            }

            return res.json();
        })
        .then(data => {

            // Weather image
            weather_img.src =
                `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            // Main weather information
            weatherMain.innerHTML = data.weather[0].main;

            weatherDescrip.innerHTML =
                data.weather[0].description;

            weatherLocation.innerHTML =
                `<i class="fa-solid fa-location-dot"></i> ${data.name}`;

            weatherTemp.innerHTML =
                `${data.main.temp}&#176;`;

            // Additional weather information
            otherWeatherInfo.innerHTML = `
                <div class="wind-speed">
                    <span>Feels like</span>
                    <p>${data.main.feels_like}&#176;</p>
                </div>

                <div class="min-temp">
                    <span>Min Temp</span>
                    <p>${data.main.temp_min}&#176;</p>
                </div>

                <div class="Humidity">
                    <span>Humidity</span>
                    <p>${data.main.humidity}%</p>
                </div>

                <div class="wind-speed">
                    <span>Wind speed</span>
                    <p>${data.wind.speed} Km/H</p>
                </div>

                <div class="max-temp">
                    <span>Max temp</span>
                    <p>${data.main.temp_max}&#176;</p>
                </div>

                <div class="pressure">
                    <span>Pressure</span>
                    <p>${data.main.pressure} mbar</p>
                </div>
            `;
        })

        // Handle API/network errors
        .catch(error => {

            console.error('Weather API Error:', error);

            weatherMain.innerHTML = 'Unable to fetch weather';

            weatherDescrip.innerHTML =
                'Please check the city name and try again.';

            weatherLocation.innerHTML =
                `<i class="fa-solid fa-location-dot"></i> ${cityName}`;

            weatherTemp.innerHTML = '--&#176;';

            otherWeatherInfo.innerHTML = `
                <div class="weather-error">
                    <p>Weather information is currently unavailable.</p>
                </div>
            `;
        });
};

// Default city
getWeatherInfo('San Francisco');
