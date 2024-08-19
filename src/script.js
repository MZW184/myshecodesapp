function refreshWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(response.data.daily[0].temperature.day);

  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.daily[0].condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.daily[0].temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.daily[0].wind.speed} km/h`;

  let time = document.querySelector("#time");
  let date = new Date(response.data.daily[0].time * 1000);
  time.innerHTML = formatDate(new Date());

  let image = document.querySelector("#image");
  image.src = response.data.daily[0].condition.icon_url;
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hour = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "248a5b083cf5484310345e4f53aedobt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchResults(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

//forecast api
function getForecast(city) {
  let apiKey = "248a5b083cf5484310345e4f53aedobt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Weather forecast
function displayForecast(response) {
  console.log(response.data);
  const forecast = document.querySelector("#forecast");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastContent = "";

  days.forEach(function (day) {
    forecastContent += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌦️</div>
        <div class="weather-forecast-temperature">
          <div class="weather-temp">
            <strong>12°</strong>
          </div>
          <div class="weather-temp">8°</div>
        </div>
      </div>
    `;
  });

  forecast.innerHTML = forecastContent;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchResults);

searchCity("Paris");
displayForecast();
