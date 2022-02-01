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

//Search API
function showWeather(response) {
  let h1 = document.querySelector("#h1");
  h1.innerHTML = response.data.name;
  let mainDegree = document.querySelector("#mainDegree");
  mainDegree.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].main;

  //Weekly Weather Icons
  let weatherIconElement1 = document.querySelector(".svg-1");
  let weatherIconElement2 = document.querySelector(".svg-2");
  let weatherIconElement3 = document.querySelector(".svg-3");
  let weatherIconElement4 = document.querySelector(".svg-4");
  let weatherIconElement5 = document.querySelector(".svg-5");
  weatherIconElement1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//Root Function
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".input-search").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5b69fb0f2c8bd35132203c6577c67c4&units=imperial
`;
  axios.get(apiURL).then(showWeather);
  //axious.get(apiURL).then(weeklyWeather);
}

//Run Function
let searchButton = document.querySelector(".search-bar");
searchButton.addEventListener("submit", searchCity);

//Theme-Button
document.querySelector(".theme-button").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

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
