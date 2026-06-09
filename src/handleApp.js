import { buildApp, clearOverview } from "./weatherApp";
import { cardEventListener } from "./main.js";
import { displayData, displayHTML } from "./menu.js";
import { toggleLoading } from "./toggleLoading.js";
//Menu Ansicht

export async function renderMenu() {
  const menuEl = document.querySelector(".menu");
  try {
    toggleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 6000));
    menuEl.classList.add("is-active");
    clearOverview();
    displayHTML();
    displayData();
    cardEventListener();
  } catch (error) {
    if (screenEL) {
      screenEL.innerHTML = "<p>Fehler beim Laden der Übersicht</p>";
    }
  } finally {
    toggleLoading(false);
  }
}
