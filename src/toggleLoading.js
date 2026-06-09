import { fetchWeatherData } from "./apiFetch.js";

export async function toggleLoading(isLoading, location = "") {
  const container = document.querySelector(".screen__container");
  const titleCityEL = document.querySelector(".loading-overlay__title-city");

  if (isLoading) {
    container.classList.add("is-loading");

    if (titleCityEL && location !== "") {
      titleCityEL.innerText = `Lade Wetter für ${location}...`;
      console.log("lade stadt");
    } else {
      titleCityEL.innerText = `Lade Übersicht...`;
      console.log("lade übersicht");
    }
  } else {
    container.classList.remove("is-loading");
  }
}
