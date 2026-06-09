import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";
import { toggleLoading } from "./toggleLoading.js";
import { fetchWeatherData, locationDetailsWeatherEffects } from "./apiFetch.js";
import {
  buildCurrentWether,
  buildForecastWeather,
  buildForecastThreeDay,
  buildCurrentStatisticsCards,
  initOverview,
} from "./cityOverview.js";
export let cityName = "Osaka";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

export async function buildApp(city = "osaka") {
  cityName = city;
  // clearOverview();
  let overviewActive = true;
  if (cityName) {
    toggleLoading(true, city);
  }
  try {
    console.log(city);
    await locationDetailsWeatherEffects();
    initOverview();
    await buildCurrentWether();
    await buildForecastWeather();
    await buildForecastThreeDay();
    await buildCurrentStatisticsCards();
  } catch (error) {
    const screenEL = document.querySelector(".screen__container");
    if (screenEL) {
      screenEL.innerHTML = "<p>Fehler beim Laden der Wetterdetails</p>";
    }
    console.error("Fehler beim App-Aufbau:", error);
  } finally {
    toggleLoading(false);
  }
  return { overviewActive };
}
buildApp();
export function clearOverview() {
  const overviewContainer = document.querySelector(".app-content-scrollable");
  if (overviewContainer) {
    overviewContainer.innerHTML = "";
  }
}
