import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";
import { toggleLoading } from "./toggleLoading.js";
import { fetchWeatherData, locationDetailsWeatherEffects } from "./apiFetch.js";
import {
  buildCurrentWether,
  buildForecastWeather,
  buildForecastThreeDay,
  buildCurrentStatisticsCards,
} from "./cityOverview.js";
import { city } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

async function buildApp() {
  if (city) {
    toggleLoading(true, city());
  } else {
    toggleLoading(true);
  }
  try {
    await locationDetailsWeatherEffects();
    buildCurrentWether();
    buildForecastWeather();
    buildForecastThreeDay();
    buildCurrentStatisticsCards();
  } catch (error) {
    const screenEL = document.querySelector(".screen__container");
    if (screenEL) {
      screenEL.innerHTML = "<p>Fehler beim Laden der Wetterdetails</p>";
    }
    console.error("Fehler beim App-Aufbau:", error);
  } finally {
    toggleLoading(false);
  }
}
buildApp();
