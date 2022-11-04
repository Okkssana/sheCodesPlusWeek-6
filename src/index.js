let now = new Date();

let currentDate = document.getElementById('current-date');
let hours = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();

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

let apiKey = 'f7ffe62985ec74cf527d11a19fb3eb21';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mykolaiv&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

function search(event) {
  event.preventDefault();
  let searchInput = document.getElementById('search-text-input');
  let currentCity = document.getElementById('city');
  currentCity.innerHTML = searchInput.value;
  searchInput.value = '';
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
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.getElementById('current-temp');
  temperatureElement.innerHTML = temperature;
  let cityName = document.getElementById('city');
  cityName.innerHTML = response.data.name;
  let temperatureDescription = document.getElementById('current-description');
  temperatureDescription.innerHTML = response.data.weather[0].description;

  let currentFahrenheit = document.getElementById('fahrenheit');
  let currentCelsius = document.getElementById('celsius');

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
