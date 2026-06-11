import { initWeatherBackground, updateWeatherBackground } from "./weatherEffects.js";
import { isCityFavorite } from "./saveDataLocalstorage.js";
import { toggleLoading } from "./toggleLoading.js";
import { fetchWeatherData, locationDetailsWeatherEffects } from "./apiFetch.js";
import {
  buildCurrentWether,
  buildForecastWeather,
  buildForecastThreeDay,
  buildCurrentStatisticsCards,
  initOverview,
} from "./cityOverview.js";
export let cityName = "";
export let cityId = null;

document.addEventListener("DOMContentLoaded", () => {
  initWeatherBackground();
});

export async function buildApp(city = "osaka", id = null) {
  cityName = city;
  cityId = id;

  let overviewActive = true;
  if (cityName) {
    toggleLoading(true, city);
  }
  try {
    await locationDetailsWeatherEffects(cityId);
    initOverview();
    await buildCurrentWether(cityId);
    await buildForecastWeather(cityId);
    await buildForecastThreeDay(cityId);
    await buildCurrentStatisticsCards(cityId);
    const saveBtn = document.querySelector(".action-buttons__save");
    if (saveBtn && isCityFavorite(cityName, cityId)) {
      saveBtn.style.display = "none";
    }
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
export function clearOverview() {
  const overviewContainer = document.querySelector(".app-content-scrollable");
  if (overviewContainer) {
    overviewContainer.innerHTML = "";
  }
}
