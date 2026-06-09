import "./styles/_main.scss";
import "./styles/cityOverview.scss";
import "./styles/loading.scss";
import "./styles/weatherEffects.scss";
import "./styles/menu.scss";
import "./styles/smartphone.scss";
import * as cityOverview from "./cityOverview.js";
import * as weatherEffects from "./weatherEffects.js";
import * as toggleLoading from "./toggleLoading.js";
import * as apiFetch from "./apiFetch.js";
import * as weatherApp from "./weatherApp.js";
import * as menu from "./menu.js";
import * as saveDataLocalstorage from "./saveDataLocalstorage.js";
import * as handelApp from "./handleApp.js";
import { buildApp } from "./weatherApp.js";

let controller = new AbortController();

if (!window.hasThemeListener) {
  window.hasThemeListener = true;

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("#theme-toggle");

    if (btn) {
      const bodyEL = document.querySelector("body");
      bodyEL.classList.toggle("darkmode");

      const isDark = bodyEL.classList.contains("darkmode");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      console.log("Button geklickt! Status:", isDark ? "dark" : "light");
      btn.blur();
    }
  });
}

function initSmartphoneStatus() {
  const infoContainer = document.querySelector(".smartphone-info");
  if (!infoContainer) return;

  infoContainer.innerHTML = `
    <div class="status-bar-left">
      <span id="status-time">00:00</span>
    </div>
    <div class="status-bar-right">
      <svg class="status-bar-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 22h20V2z" opacity="0.3"/>
        <path d="M17 7L2 22h15z"/>
      </svg>
      <div class="status-bar-battery">
        <div class="status-bar-battery__level"></div>
      </div>
    </div>
  `;

  const timeElement = document.querySelector("#status-time");

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    if (timeElement) {
      timeElement.textContent = `${hours}:${minutes}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}
initSmartphoneStatus();

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
