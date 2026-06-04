import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";
import { toggleLoading } from "./toggleLoading.js";
import { fetchWeatherData } from "./apiFetch.js";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

// Build Framwork CurrentWether
async function buildCurrentWether() {
  const currentWetherEl = document.querySelector(".current-weather");
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
    div.classList.add("current-weather");

    const spanCity = document.createElement("span");
    spanCity.classList.add("current-weather__city");

    const spanTemperature = document.createElement("span");
    spanTemperature.classList.add("current-weather__temperature");

    const spanCondition = document.createElement("span");
    spanCondition.classList.add("current-weather__condition", "small");

    const spanLowestAndHighest = document.createElement("span");
    spanLowestAndHighest.classList.add("current-weather__lowest-and-highest", "small");

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
