import * as THREE from "three";
import "vanta/dist/vanta.clouds.min.js";

let weatherEffect = null;
let rainInterval = null;

export function initWeatherBackground() {
  weatherEffect = VANTA.CLOUDS({
    el: "#weather-bg",
    THREE: THREE,
    skyColor: 0x3a7bd5,
    cloudColor: 0xddf0ff,
    lightColor: 0xffffff,
    sunColor: 0xffffff,
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
  if (isRainy || isStormy) {
    const isDaytimeRegen = hour >= 5 && hour < 18;

    if (isDaytimeRegen) {
      weatherEffect.setOptions({
        skyColor: 0x556270,
        cloudColor: 0x8a9ba8,
        lightColor: 0x999999,
        sunColor: isStormy ? 0xd9e5ff : 0xffffff,
        speed: 0.6,
      });
    } else {
      weatherEffect.setOptions({
        skyColor: 0x1f242c,
        cloudColor: 0x808a96,
        lightColor: 0xaaaaaa,
        sunColor: isStormy ? 0x99aacc : 0x333333,
        speed: 0.5,
      });
    }

    startRain();
  } else {
    if (container) container.classList.remove("is-rainy");
    switch (timeOfDay) {
      case "night":
        weatherEffect.setOptions({
          skyColor: 0x060c17,
          cloudColor: 0x1c2d42,
          lightColor: 0x223344,
          sunColor: 0x778899,
          speed: 0.4,
        });
        break;

      case "sunrise":
        weatherEffect.setOptions({
          skyColor: 0xff7e5f,
          cloudColor: 0xfeb47b,
          lightColor: 0xffd1b3,
          sunColor: 0xfffcfa,
          speed: 0.8,
        });
        break;

      case "sunset":
        weatherEffect.setOptions({
          skyColor: 0xe65c00,
          cloudColor: 0x4f2649,
          lightColor: 0xff7a00,
          sunColor: 0xf9d423,
          speed: 0.7,
        });
        break;

      case "day":
      default:
        weatherEffect.setOptions({
          skyColor: 0x3a7bd5,
          cloudColor: 0xddf0ff,
          lightColor: 0xffffff,
          sunColor: 0xffffff,
          speed: 1.0,
        });
        break;
    }
  }
}
