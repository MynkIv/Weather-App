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

function displayForecast(response) {
  let forecastElement = document.querySelector(".weekly-weather");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row mx-auto">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="col-2 day">
            ${day} <br />
            <div class="svg">
            <img class="img" src="images/day.svg" width="70px" />
            </div>
            41°F
          </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let apiURL = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=f5b69fb0f2c8bd35132203c6577c67c4&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

//Search
function displayTemperature(response) {
  console.log(response.data);
  let mainDegree = document.querySelector("#mainDegree");
  let h1 = document.querySelector("#h1");
  let description = document.querySelector("#weather-description");
  //Temporarily Disconnecting the Icon
  // let weatherIconElement1 = document.querySelector(".svg-1");
  let maxTemp = document.querySelector("#max-temp");
  let lowTemp = document.querySelector("#low-temp");
  let windElement = document.querySelector("#wind");

  //Temporarily Comment this out
  // displayForecast();

  fahrenheitTemp = response.data.main.temp;

  windElement.innerHTML = Math.round(response.data.wind.speed);
  maxTemp.innerHTML = `H:${Math.round(response.data.main.temp_max)}°F  `;
  lowTemp.innerHTML = `| L:${Math.round(response.data.main.temp_min)}°F`;
  mainDegree.innerHTML = Math.round(fahrenheitTemp);
  h1.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  //Temporarily Disconnecting the Icon
  //weatherIconElement1.setAttribute(
  // "src",
  //  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  //);
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

//Theme - Button;
document.querySelector(".theme-button").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

//Original Code//
//function showWeather(response) {
// let h1 = document.querySelector("#h1");
// h1.innerHTML = response.data.name;
// let mainDegree = document.querySelector("#mainDegree");
// mainDegree.innerHTML = Math.round(response.data.main.temp);
// let description = document.querySelector("#weather-description");
// description.innerHTML = response.data.weather[0].main;
// //Weekly Weather Icons
// let weatherIconElement1 = document.querySelector(".svg-1");
// let weatherIconElement2 = document.querySelector(".svg-2");
// let weatherIconElement3 = document.querySelector(".svg-3");
// let weatherIconElement4 = document.querySelector(".svg-4");
//let weatherIconElement5 = document.querySelector(".svg-5");
//weatherIconElement1.setAttribute(
//  "src",
//  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
// );
//}

//Root Function//
//function search(city) {
//let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5b69fb0f2c8bd35132203c6577c67c4&units=imperial
//`;
//  axios.get(apiURL).then(showWeather);
//}

//function searchCity(event) {
// event.preventDefault();
// let city = document.querySelector(".input-search").value;
// showWeather(city.value);
//}

//Run Function
//let searchButton = document.querySelector(".search-bar");
//searchButton.addEventListener("submit", searchCity);
//search("New York");

//Temperature
//function celciusTemp() {
// let mainDegree = document.querySelector("#mainDegree");
//mainDegree.innerHTML = "5";
//}
//let celcius = document.querySelector("#cTemp");

//celcius.addEventListener("click", celciusTemp);

//function fahrenheitTemp() {
// let mainDegree = document.querySelector("#mainDegree");
// mainDegree.innerHTML = "41";
//}
//let fahrenheit = document.querySelector("#fTemp");

//fahrenheit.addEventListener("click", fahrenheitTemp);
