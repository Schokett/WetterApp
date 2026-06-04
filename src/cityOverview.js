import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});
// fetch
async function fetchWeatherData(type) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const queryParams = type === "forecast" ? "&days=1" : "&lang=de";

    const response = await fetch(
      `https://api.weatherapi.com/v1/${type}.json?key=${apiKey}&q=nagoya${queryParams}`,
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
  const screenEL = document.querySelector(".screen__container");

  toggleLoading(true);
  try {
    const apiDataCurrent = await fetchWeatherData("current");
    const apiDataForecast = await fetchWeatherData("forecast");

    // 1. Uhrzeit und Wetter-Text extrahieren
    const localTimeHTML = apiDataCurrent.location.localtime;
    const timePart = localTimeHTML.split(" ")[1];
    const currentHour = parseInt(timePart.split(":")[0]);
    const weatherCode = apiDataCurrent.current.condition.code;
    updateWeatherBackground(weatherCode, currentHour);

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
    spanTemperature.innerText = `${Math.round(apiDataCurrent.current.temp_c)}°`;
    spanCondition.innerText = apiDataCurrent.current.condition.text;
    spanLowestAndHighest.innerText = `H:${Math.round(maxTemp)}° T:${Math.round(minTemp)}°`;

    currentWetherEl.appendChild(div);
  } catch (error) {
    screenEL.innerHTML = "<p>Fehler beim Laden der Wetterdaten.</p>";
    console.log(error);
  } finally {
    toggleLoading(false);
  }
}
buildCurrentWether();

function toggleLoading(isLoading) {
  const container = document.querySelector(".screen__container");
  const screenEL = document.querySelector(".screen__container");
  if (isLoading) {
    container.classList.add("is-loading");
    screenEL.classList.add("center");
  } else {
    container.classList.remove("is-loading");
    screenEL.classList.remove("center");
  }
}
