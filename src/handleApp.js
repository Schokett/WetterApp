import { buildApp, clearOverview } from "./weatherApp";
import { displayData, displayHTML } from "./menu.js";
import { toggleLoading } from "./toggleLoading.js";
//Menu Ansicht

export async function renderMenu() {
  const menuEl = document.querySelector(".menu");
  const screenEL = document.querySelector(".screen__container");
  try {
    toggleLoading(true);
    menuEl.classList.add("is-active");
    await clearOverview();
    await displayHTML();
    await displayData();
    await cardEventListener();
  } catch (error) {
    if (screenEL) {
      screenEL.innerHTML = "<p>Fehler beim Laden der Übersicht</p>";
    }
  } finally {
    toggleLoading(false);
  }
}
renderMenu();

export function cardEventListener() {
  const locationEL = document.querySelector(".locations");
  const menuEl = document.querySelector(".menu");
  locationEL.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".locations__location");
    if (!clickedCard) return;
    const cityName = clickedCard.querySelector(".locations__city-name").textContent;
    const cityId = clickedCard.querySelector(".locations__city-name").dataset.id;

    menuEl.classList.remove("is-active");
    buildApp(cityName, cityId);
  });
}
