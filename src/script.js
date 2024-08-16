function searchResults(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let searchInput = document.querySelector("#search-input");
  city.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchResults);
