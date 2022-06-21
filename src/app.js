//Day and Time
let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = document.querySelector("#day");
let time = document.querySelector("#time");
day.innerHTML = days[currentDate.getDay()];
if (currentDate.getMinutes() < 10) {
  time.innerHTML = ` ${currentDate.getHours()}:0${currentDate.getMinutes()}`;
} else {
  time.innerHTML = ` ${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

//Weekly Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weekly-weather");
  let forecastHTML = `<div class="row mx-auto">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2 day">
            ${formatDay(forecastDay.dt)} <br />
            <div class="svg">
            <img class="img" src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="70px" />
            </div>
            ${Math.round(forecastDay.temp.day)}°F
          </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//Hourly Forecast
function formatHour(timestamp) {
  let amPm = "";
  let hour = new Date(timestamp * 1000);
  let curHour = hour.getHours();
  if (curHour < 12) {
    amPm = "AM";
  } else {
    amPm = "PM";
  }
  let forecastHour = `${curHour}:00 ${amPm}`;
  return forecastHour;
}
function displayForecastHour(response) {
  let hourForecast = response.data.hourly.slice(1, 5);
  let forecastHourElement = document.querySelector(".hourly-weather");
  let forecastHourHTML = `<div class="row ">`;
  hourForecast.forEach(function (forecastHour, index) {
    if (index < 6) {
      forecastHourHTML =
        forecastHourHTML +
        `
<div class="col ">
            ${formatHour(forecastHour.dt)} <br />
            <div class="svg">
            <img class="img" src="http://openweathermap.org/img/wn/${
              forecastHour.weather[0].icon
            }@2x.png" width="70px" />
            </div>
           <strong> ${Math.round(forecastHour.temp)} °F </strong>
          </div>
  `;
    }
  });
  forecastHourHTML = forecastHourHTML + `</div>`;
  forecastHourElement.innerHTML = forecastHourHTML;
  console.log(forecastHourHTML);
}

//Api Call for Forecasts
function getForecast(coordinates) {
  let apiURL = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=f5b69fb0f2c8bd35132203c6577c67c4&units=imperial`;
  axios.get(apiURL).then(displayForecast);
  axios.get(apiURL).then(displayForecastHour);
}

//Search
function displayTemperature(response) {
  console.log(response.data);
  let mainDegree = document.querySelector("#mainDegree");
  let h1 = document.querySelector("#h1");
  let description = document.querySelector("#weather-description");

  let maxTemp = document.querySelector("#max-temp");
  let lowTemp = document.querySelector("#low-temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector(".humidity-perc");

  fahrenheitTemp = response.data.main.temp;

  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  mainDegree.innerHTML = Math.round(fahrenheitTemp);
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5b69fb0f2c8bd35132203c6577c67c4&units=imperial
`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".input-search").value;
  //Made another correction, instead of city.value i put city instead.
  search(city);
}

function showCelciusmTemp(event) {
  event.preventDefault();
  let mainDegree = document.querySelector("#mainDegree");
  let cTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  mainDegree.innerHTML = cTemp;
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let mainDegree = document.querySelector("#mainDegree");
  mainDegree.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("submit", handleSubmit);

let celciusTemp = document.querySelector("#cTemp");
celciusTemp.addEventListener("click", showCelciusmTemp);

let fahrenheitLink = document.querySelector("#fTemp");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Brooklyn");
