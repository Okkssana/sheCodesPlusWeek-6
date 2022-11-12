let now = new Date();

let currentDate = document.getElementById('current-date');
let hours = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();
let currentFahrenheit = document.getElementById('fahrenheit');
let currentCelsius = document.getElementById('celsius');

let weekDay = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
let currentUrl = 'https://api.openweathermap.org/data/2.5/weather?';
let city = 'q=Kyiv&';
let lat = 'lat=46.635417&';
let lon = 'lon=32.616867&';
let apiOptions = 'units=metric&';
let apiKey = 'appid=001bc651977f4b024af4d84282b0f02a';
let file = currentUrl + city + apiOptions + apiKey;
axios.get(file).then(showTemperature);

function search(event) {
  event.preventDefault();
  let searchInput = document.getElementById('search-text-input');
  // let currentCity = document.getElementById('city');
  // currentCity.innerHTML = searchInput.value;
  let city = searchInput.value;
  searchInput.value = '';
  currentFahrenheit.classList.remove('active');
  currentCelsius.classList.add('active');
  let apiKey = '001bc651977f4b024af4d84282b0f02a';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = days[date.getDay()];

  return day;
}

let form = document.querySelector('#search-form');
form.addEventListener('submit', search);

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${weekDay[day]}, ${hours}:${minutes}`;

// let temperature = 14;
// let temperature = 14;

let firstDay = document.getElementById('day-1');
let secondDay = document.getElementById('day-2');
let thirdDay = document.getElementById('day-3');
let fourthDay = document.getElementById('day-4');
let fifthDay = document.getElementById('day-5');
let sixthDay = document.getElementById('day-6');
let seventhDay = document.getElementById('day-7');

firstDay.innerHTML = days[day];
if (day === 0) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day + 2];
  fourthDay.innerHTML = days[day + 3];
  fifthDay.innerHTML = days[day + 4];
  sixthDay.innerHTML = days[day + 5];
  seventhDay.innerHTML = days[day + 6];
}
if (day === 1) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day + 2];
  fourthDay.innerHTML = days[day + 3];
  fifthDay.innerHTML = days[day + 4];
  sixthDay.innerHTML = days[day + 5];
  seventhDay.innerHTML = days[day - 1];
}
if (day === 2) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day + 2];
  fourthDay.innerHTML = days[day + 3];
  fifthDay.innerHTML = days[day + +4];
  sixthDay.innerHTML = days[day - 2];
  seventhDay.innerHTML = days[day - 1];
}
if (day === 3) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day + 2];
  fourthDay.innerHTML = days[day + 3];
  fifthDay.innerHTML = days[day - 3];
  sixthDay.innerHTML = days[day - 2];
  seventhDay.innerHTML = days[day - 1];
}
if (day === 4) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day + 2];
  fourthDay.innerHTML = days[day - 4];
  fifthDay.innerHTML = days[day - 3];
  sixthDay.innerHTML = days[day - 2];
  seventhDay.innerHTML = days[day - 1];
}
if (day === 5) {
  secondDay.innerHTML = days[day + 1];
  thirdDay.innerHTML = days[day - 5];
  fourthDay.innerHTML = days[day - 4];
  fifthDay.innerHTML = days[day - 3];
  sixthDay.innerHTML = days[day - 2];
  seventhDay.innerHTML = days[day - 1];
}
if (day === 6) {
  secondDay.innerHTML = days[day - 6];
  thirdDay.innerHTML = days[day - 5];
  fourthDay.innerHTML = days[day - 4];
  fifthDay.innerHTML = days[day - 3];
  sixthDay.innerHTML = days[day - 2];
  seventhDay.innerHTML = days[day - 1];
}

function showTemperature(response) {
  console.log(response.data);
  let cityName = document.getElementById('city');
  cityName.innerHTML = response.data.name;
  let currentImg = document.querySelector('.main__current-img');
  currentImg.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentImg.setAttribute('alt', 'response.data.weather[0].description');
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById('current-temp');
  temperatureElement.innerHTML = temperature;
  let temperatureDescription = document.getElementById('current-description');
  temperatureDescription.innerHTML = response.data.weather[0].description;
  document.getElementById('humidity').innerHTML = response.data.main.humidity;
  document.getElementById('wind').innerHTML = Math.round(
    response.data.wind.speed
  );

  currentFahrenheit.addEventListener('click', function (e) {
    document.getElementById('current-temp').innerText = Math.round(
      temperature * 1.8 + 32
    );
    currentFahrenheit.classList.add('active');
    currentCelsius.classList.remove('active');
  });
  currentCelsius.addEventListener('click', function (e) {
    document.getElementById('current-temp').innerText = temperature;
    currentCelsius.classList.add('active');
    currentFahrenheit.classList.remove('active');
  });

  let lat = `lat=${response.data.coord.lat}&`;
  let lon = `lon=${response.data.coord.lon}&`;
  file = oneCallUrl + lat + lon + apiOptions + apiKey;
  axios.get(file).then(showHourlyDailyForecast);
}
function showHourlyDailyForecast(params) {
  let time = hours;
  let timeNow = document.getElementById('time-now');
  timeNow.innerHTML = time;
  // document.getElementById('time-now').innerHTML = time;
  let time1 = document.getElementById('time1');
  time1.innerHTML = time + 2;
  let time2 = document.getElementById('time2');
  time2.innerHTML = time + 4;
  let time3 = document.getElementById('time3');
  time3.innerHTML = time + 6;
  let time4 = document.getElementById('time4');
  time4.innerHTML = time + 8;
  // document.getElementById('time3').innerHTML = time + 6;
  // let time4 = document.getElementById('time4');
  // time4.innerHTML = time + 8;
  if (time1.innerHTML > 24) {
    time1.innerHTML = time1.innerHTML - 24;
  }

  if (time2.innerHTML > 24) {
    time2.innerHTML = time2.innerHTML - 24;
  }
  if (time3.innerHTML > 24) {
    time3.innerHTML = time3.innerHTML - 24;
  }
  if (time4.innerHTML > 24) {
    time4.innerHTML = time4.innerHTML - 24;
  }
}
function showPosition(position) {
  let apiKey = 'f7ffe62985ec74cf527d11a19fb3eb21';
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentPosition() {
  // e.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.getElementById('current-location');
currentLocation.addEventListener('click', getCurrentPosition);
