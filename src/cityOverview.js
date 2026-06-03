// fetch
async function fetchCurrentWeather() {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    console.log("Mein Key lautet live:", apiKey);

    const response = await fetch(
      "https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=nagoya&lang=de",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("message:", error);
  }
}
async function fetchWeatherForecast() {
  try {
    const response = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=nagoya&days=1",
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("message:", error);
  }
}
// Build Framwork CurrentWether
async function buildCurrentWether() {
  const currentWetherEl = document.querySelector(".current-wether");
  const apiDataCurrent = await fetchCurrentWeather();
  const apiDataForecast = await fetchWeatherForecast();
  const maxTemp = apiDataForecast.forecast.forecastday[0].day.maxtemp_c;
  const minTemp = apiDataForecast.forecast.forecastday[0].day.mintemp_c;

  const div = document.createElement("div");
  div.classList.add("current-wether");

  const spanCity = document.createElement("span");
  spanCity.classList.add("current-wether__city");

  const spanTemperature = document.createElement("span");
  spanTemperature.classList.add("current-wether__temperature");

  const spanCondition = document.createElement("span");
  spanCondition.classList.add("current-wether__condition", "small");

  const spanLowestAndHighest = document.createElement("span");
  spanLowestAndHighest.classList.add("current-wether__lowest-and-highest", "small");

  div.appendChild(spanCity);
  div.appendChild(spanTemperature);
  div.appendChild(spanCondition);
  div.appendChild(spanLowestAndHighest);

  spanCity.innerText = apiDataCurrent.location.name;
  spanTemperature.innerText = apiDataCurrent.current.temp_c + "°";
  spanCondition.innerText = apiDataCurrent.current.condition.text;
  spanLowestAndHighest.innerText = `H:${Math.round(maxTemp)}° T:${Math.round(minTemp)}°`;

  console.log(apiDataCurrent);

  currentWetherEl.appendChild(div);
}
buildCurrentWether();
