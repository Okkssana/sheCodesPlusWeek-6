let currentFahrenheit = null;
let currentCelsius = null;

let windSpeed = null;
let lat = null;
let lon = null;
let oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
let currentUrl = 'https://api.openweathermap.org/data/2.5/weather?';
let apiOptions = 'units=metric&';
let apiKey = '&appid=6a48a550fc04f170639e60d52b8a6bc5';
let cityName = '';

let fahrenheit = document.getElementById('fahrenheit');
fahrenheit.addEventListener('click', intoFahrenheit);

let celsius = document.getElementById('celsius');
celsius.addEventListener('click', intoCelsius);

let currentLocation = document.getElementById('current-location');
currentLocation.addEventListener('click', getCurrentPosition);

let form = document.querySelector('#search-form');
form.addEventListener('submit', search);

function showCity() {
  lat = 'lat=48.162381&';
  lon = 'lon=30.439030&';
  let file = currentUrl + lat + lon + apiOptions + apiKey;
  axios.get(file).then(showTemperature);
}

function intoFahrenheit(e) {
  e.preventDefault();
  fahrenheit.classList.add('active');
  celsius.classList.remove('active');
  document.getElementById('wind').innerHTML = Math.round(windSpeed * 2.237);
  document.getElementById('wind-indicator').innerHTML = 'mph';
  getImperialForecast();
}

function intoCelsius(e) {
  e.preventDefault();
  celsius.classList.add('active');
  fahrenheit.classList.remove('active');
  document.getElementById('current-temp').innerText = currentCelsius;
  document.getElementById('wind').innerHTML = Math.round(windSpeed);
  document.getElementById('wind-indicator').innerHTML = 'm/s';
  getMetricForecast();
}

function search(e) {
  e.preventDefault();
  let searchInput = document.getElementById('search-text-input');
  let city = searchInput.value;
  searchInput.value = '';
  fahrenheit.classList.remove('active');
  celsius.classList.add('active');
  let apiKey = '6a48a550fc04f170639e60d52b8a6bc5';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function weekFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = days[date.getDay()];
  return day;
}

function currentDayFormat(timestamp) {
  let weekDay = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let date = new Date(timestamp * 1000);
  let currentDate = document.getElementById('current-date');
  let minutes = date.getMinutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  currentDate.innerHTML = `${weekDay[day]}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response);

  document.getElementById('city').innerHTML = response.data.name;
  let currentImg = document.querySelector('.main__current-img');
  currentImg.setAttribute('src', `images/${response.data.weather[0].icon}.png`);
  currentImg.setAttribute('alt', response.data.weather[0].description);
  document.getElementById('current-description').innerHTML =
    response.data.weather[0].description;
  document.getElementById('humidity').innerHTML = response.data.main.humidity;
  windSpeed = response.data.wind.speed;
  document.getElementById('wind').innerHTML = Math.round(windSpeed);
  lat = `lat=${response.data.coord.lat}&`;
  lon = `lon=${response.data.coord.lon}&`;
  getMetricForecast();
}

function getMetricForecast() {
  let file = oneCallUrl + lat + lon + apiOptions + apiKey;
  axios.get(file).then(showCurrentMetricForecast);
  axios.get(file).then(showHourlyMetricForecast);
  axios.get(file).then(showDailyMetricForecast);
}

function showCurrentMetricForecast(response) {
  console.log(response);

  currentCelsius = Math.round(response.data.current.temp);
  document.getElementById('current-temp').innerHTML = currentCelsius;
  currentDayFormat(response.data.current.dt);
}

function showHourlyMetricForecast(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyForecastElement = document.getElementById('hourly-forecast');
  let hourlyForecastHTML = '';
  hourlyForecast.forEach(function (forecastHour, index) {
    let now = new Date(forecastHour.dt * 1000);
    let hours = now.getHours();
    let temp = Math.round(forecastHour.temp);
    if (index < 10 && index % 2) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<li>
          <div class="main__time-box">
            <p class="main__day-time" id="time-now">${hours}</p>
            <p id="time-format">00</p>
          </div>
          <img class="main__day-img" src="images/${forecastHour.weather[0].icon}.png" />
          <p class="main__day-temp" id="day-temp-now">${temp}</p>
          <span>˚</span>
        </li>`;
    }
    hourlyForecastElement.innerHTML = hourlyForecastHTML;
  });
}

function showDailyMetricForecast(response) {
  let dailyForecast = response.data.daily;
  let dailyForecastElement = document.getElementById('week-forecast');
  let dailyForecastHTML = '';
  dailyForecast.forEach(function (forecastDay, index) {
    if (index != 0 && index < 7) {
      dailyForecastHTML =
        dailyForecastHTML +
        `<li class="main__week-item">
                <p class="main__week-day" id="day-1">${weekFormat(
                  forecastDay.dt
                )}</p>
                <img
                  class="main__week-img"
                  src="images/${forecastDay.weather[0].icon}.png"
                  alt="img"
                />
                <div class="main__week-max-box">
                  <span class="main__week-max-temp" id="max-temp1">${Math.round(
                    forecastDay.temp.max
                  )}</span>
                  <span class="main__week-max-deg">˚</span>
                </div>
                <div class="main__week-min-box">
                  <span class="main__week-min-temp" id="min-temp1">${Math.round(
                    forecastDay.temp.min
                  )}</span>
                  <span class="main__week-min-deg">˚</span>
                </div>
              </li>`;
    }
    dailyForecastElement.innerHTML = dailyForecastHTML;
  });
}

function getImperialForecast() {
  let apiOptions = 'units=imperial&';
  let file = oneCallUrl + lat + lon + apiOptions + apiKey;
  axios.get(file).then(showCurrentImperialForecast);
  axios.get(file).then(showHourlyImperialForecast);
  axios.get(file).then(showDailyImperialForecast);
}

function showCurrentImperialForecast(response) {
  document.getElementById('current-temp').innerText = Math.round(
    response.data.current.temp
  );
}

function showHourlyImperialForecast(response) {
  let hourlyForecast = response.data.hourly;
  let hourlyForecastElement = document.getElementById('hourly-forecast');
  let hourlyForecastHTML = '';
  hourlyForecast.forEach(function (forecastHour, index) {
    let now = new Date(forecastHour.dt * 1000);
    let hours = now.getHours();
    let temp = Math.round(forecastHour.temp);
    if (index < 10 && index % 2) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<li>
          <div class="main__time-box">
            <p class="main__day-time" id="time-now">${hours}</p>
            <p id="time-format">00</p>
          </div>
          <img class="main__day-img" src="images/${forecastHour.weather[0].icon}.png" />
          <p class="main__day-temp" id="day-temp-now">${temp}</p>
          <span>˚</span>
        </li>`;
    }
    hourlyForecastElement.innerHTML = hourlyForecastHTML;
  });
}

function showDailyImperialForecast(response) {
  let dailyForecast = response.data.daily;
  let dailyForecastElement = document.getElementById('week-forecast');
  let dailyForecastHTML = '';
  dailyForecast.forEach(function (forecastDay, index) {
    if (index != 0 && index < 7) {
      dailyForecastHTML =
        dailyForecastHTML +
        `<li class="main__week-item">
                <p class="main__week-day" id="day-1">${weekFormat(
                  forecastDay.dt
                )}</p>
                <img
                  class="main__week-img"
                  src="images/${forecastDay.weather[0].icon}.png"
                  alt="img"
                />
                <div class="main__week-max-box">
                  <span class="main__week-max-temp" id="max-temp1">${Math.round(
                    forecastDay.temp.max
                  )}</span>
                  <span class="main__week-max-deg">˚</span>
                </div>
                <div class="main__week-min-box">
                  <span class="main__week-min-temp" id="min-temp1">${Math.round(
                    forecastDay.temp.min
                  )}</span>
                  <span class="main__week-min-deg">˚</span>
                </div>
              </li>`;
    }
    dailyForecastElement.innerHTML = dailyForecastHTML;
  });
}

function showPosition(position) {
  let apiKey = '6a48a550fc04f170639e60d52b8a6bc5';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  celsius.classList.add('active');
  fahrenheit.classList.remove('active');
}

function getCurrentPosition(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

showCity();
