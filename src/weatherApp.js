import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";
import { toggleLoading } from "./toggleLoading.js";
import { fetchWeatherData, locationDetailsWeatherEffects } from "./apiFetch.js";
import {
  buildCurrentWether,
  buildForecastWeather,
  buildForecastThreeDay,
  buildCurrentStatisticsCards,
} from "./cityOverview.js";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

async function buildApp() {
  toggleLoading(true);

  try {
    await locationDetailsWeatherEffects();
    buildCurrentWether();
    // buildForecastWeather();
    // buildForecastThreeDay();
    buildCurrentStatisticsCards();
  } catch (error) {
    screenEL.innerHTML = "<p>Fehler beim Laden der Wetterdetails</p>";
    console.log(error);
  } finally {
    toggleLoading(false);
  }
}
buildApp();
