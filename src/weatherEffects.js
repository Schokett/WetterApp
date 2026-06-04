import * as THREE from "three";
import "vanta/dist/vanta.clouds.min.js";

let weatherEffect = null;
let rainInterval = null;

export function initWeatherBackground() {
  // Auch hier direkt mit lesbarem Hex-String gestartet
  weatherEffect = VANTA.CLOUDS({
    el: "#weather-bg",
    THREE: THREE,
    skyColor: "#3a7bd5",
    cloudColor: "#ddf0ff",
    lightColor: "#ffffff",
    sunColor: "#ffffff",
    speed: 1.0,
  });

  if (weatherEffect) {
    setTimeout(() => {
      weatherEffect.resize();
    }, 100);
  }
}

function startRain() {
  const container = document.getElementById("rain-container");
  if (!container || rainInterval) return;

  rainInterval = setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.style.left = Math.random() * 100 + "%";

    const duration = Math.random() * 0.5 + 0.5;
    drop.style.animationDuration = duration + "s";
    drop.style.height = Math.random() * 40 + 40 + "px";

    container.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, duration * 1000);
  }, 30);
}

function stopRain() {
  clearInterval(rainInterval);
  rainInterval = null;
  const container = document.getElementById("rain-container");
  if (container) container.innerHTML = "";
}

export function updateWeatherBackground(weatherCode, hour) {
  if (!weatherEffect) return;

  // === NUR ZUM TESTEN: EINFREIEREN DER UHRZEIT ===
  // hour = 6; // 6 Uhr morgens (Sunrise)
  // hour = 12; // 12 Uhr mittags (Day)
  // hour = 19; // 19 Uhr abends (Sunset)
  hour = 23; // 23 Uhr nachts (Night)
  // ========================================================

  stopRain();

  let timeOfDay = "day";
  if (hour >= 22 || hour < 5) {
    timeOfDay = "night";
  } else if (hour >= 5 && hour < 8) {
    timeOfDay = "sunrise";
  } else if (hour >= 18 && hour < 22) {
    timeOfDay = "sunset";
  }

  const isRainy =
    (weatherCode >= 1180 && weatherCode <= 1207) ||
    (weatherCode >= 1240 && weatherCode <= 1246) ||
    weatherCode === 1063;

  const isStormy = (weatherCode >= 1273 && weatherCode <= 1282) || weatherCode === 1087;
  const container = document.querySelector(".screen__container");

  const setVantaOptions = (options) => {
    const converted = { ...options };
    if (options.skyColor) converted.skyColor = parseInt(options.skyColor.replace("#", "0x"));
    if (options.cloudColor) converted.cloudColor = parseInt(options.cloudColor.replace("#", "0x"));
    if (options.lightColor) converted.lightColor = parseInt(options.lightColor.replace("#", "0x"));
    if (options.sunColor) converted.sunColor = parseInt(options.sunColor.replace("#", "0x"));
    weatherEffect.setOptions(converted);
  };

  if (isRainy || isStormy) {
    if (container) container.classList.add("is-rainy");
    const isDaytimeRegen = hour >= 5 && hour < 18;

    if (isDaytimeRegen) {
      setVantaOptions({
        skyColor: "#556270",
        cloudColor: "#8a9ba8",
        lightColor: "#999999",
        sunColor: isStormy ? "#d9e5ff" : "#ffffff",
        speed: 0.6,
      });
    } else {
      setVantaOptions({
        skyColor: "#1f242c",
        cloudColor: "#808a96",
        lightColor: "#aaaaaa",
        sunColor: isStormy ? "#99aacc" : "#333333",
        speed: 0.5,
      });
    }

    startRain();
  } else {
    if (container) container.classList.remove("is-rainy");

    switch (timeOfDay) {
      case "night":
        setVantaOptions({
          skyColor: "#617186",
          cloudColor: "#3080a5",
          lightColor: "#1a2636",
          sunColor: "#0ad4e2",
          speed: 0.4,
        });
        break;

      case "sunrise":
        setVantaOptions({
          skyColor: "#7A8EC3",
          cloudColor: "#aea6c3",
          lightColor: "#cabeb4",
          sunColor: "#FF8C42",
          speed: 0.8,
        });
        break;

      case "sunset":
        setVantaOptions({
          skyColor: "#7aa2c3",
          cloudColor: "#bab4c7",
          lightColor: "#8908f1",
          sunColor: "#FF8C42",
          speed: 0.7,
        });
        break;

      case "day":
      default:
        setVantaOptions({
          skyColor: "#6299e6",
          cloudColor: "#ddf0ff",
          lightColor: "#00fa70",
          sunColor: "#708f75",
          speed: 1.0,
        });
        break;
    }
  }
}
