import { buildApp, clearOverview } from "./weatherApp";
import { displayData, displayHTML } from "./menu.js";
import { toggleLoading } from "./toggleLoading.js";
//Menu Ansicht

export async function renderMenu() {
  const menuEl = document.querySelector(".menu");
  const screenEL = document.querySelector(".screen__container");
  try {
    toggleLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 6000));
    menuEl.classList.add("is-active");
    clearOverview();
    await displayHTML();
    await displayData();
    cardEventListener();
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

    menuEl.classList.remove("is-active");
    buildApp(cityName);
  });
}
