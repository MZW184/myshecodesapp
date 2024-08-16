function refreshWeather(response) {
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(response.data.daily[0].temperature.day);
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "248a5b083cf5484310345e4f53aedobt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function searchResults(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchResults);

searchCity("Paris");
