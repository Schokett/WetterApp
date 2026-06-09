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

export function city() {
  const city = "Osaka";
  return city;
}

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

export async function buildApp() {
  let overviewActive = true;
  if (city) {
    toggleLoading(true, city());
  }
  try {
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
