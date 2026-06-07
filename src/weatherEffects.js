import * as THREE from "three";
import "vanta/dist/vanta.clouds.min.js";

let weatherEffect = null;
let rainInterval = null;
let snowInterval = null;

// =========================================================================
// 🛠️ TEST-EINSTELLUNGEN (MANUELLER SCHALTER)
// =========================================================================
// const DEBUG_MODE = false; // Auf 'true' setzen, um den Testmodus zu aktivieren!

// const TEST_WEATHER = {
// hour: 12, // 5 = Sunrise, 12 = Day, 19 = Sunset, 23 = Night

// ENTFERNE DIE ZWEI SCHRÄGSTRICHE (//) VOR DEM CODE, ZUM TESTEN:
// code:
// --- SONNE / KLAR / WOLKEN ---
//1000, // Sunny / Clear
//  1003, // Partly cloudy
// 1006, // Cloudy
// 1009, // Overcast

// --- NEBEL & DUNST ---
//1030, // Mist
//  1135, // Fog
//  1147, // Freezing fog

// --- REGEN-WAHRSCHEINLICHKEIT / NIESEL ---
//1063, // Patchy rain possible
//1150, // Patchy light drizzle
// 1153, // Light drizzle
//  1168, // Freezing drizzle
// 1171, // Heavy freezing drizzle
//  1180, // Patchy light rain
// 1183, // Light rain

// --- NORMALER / STARKER REGEN ---
//  1186, // Moderate rain at times
//  1189, // Moderate rain
//  1192, // Heavy rain at times
//  1195, // Heavy rain
//  1240, // Light rain shower
//  1243, // Moderate or heavy rain shower
//  1246, // Torrential rain shower

// --- GEWITTER ---
//  1087, // Thundery outbreaks possible
//  1273, // Patchy light rain with thunder
// 1276, // Moderate or heavy rain with thunder
//  1279, // Patchy light snow with thunder
//  1282, // Moderate or heavy snow with thunder

// --- SCHNEE-WAHRSCHEINLICHKEIT / GEWÖHNLICHER SCHNEE ---
// 1066, // Patchy snow possible
// 1114 // Blowing snow
//1117, // Blizzard
//1210, // Patchy light snow
//  1213, // Light snow
// 1216 // Patchy moderate snow
// 1219, // Moderate snow
// 1222, // Patchy heavy snow
// 1225, // Heavy snow
// 1255, // Light snow showers
// 1258, // Moderate or heavy snow showers

// --- SCHNEEREGEN / EIS / GRAUPEL ---
//  1069, // Patchy sleet possible
//  1072, // Patchy freezing drizzle possible
//1198, // Light freezing rain
//  1201, // Moderate or heavy freezing rain
//  1204, // Light sleet
//  1207, // Moderate or heavy sleet
//  1237, // Ice pellets
//  1249, // Light sleet showers
//  1252, // Moderate or heavy sleet showers
//  1261, // Light showers of ice pellets
//  1264, // Moderate or heavy showers of ice pellets
// };
// =========================================================================

export function initWeatherBackground() {
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

function startRain(intensity = "moderate") {
  const container = document.getElementById("rain-container");
  if (!container || rainInterval) return;

  let spawnRate = 30;
  let maxOpacity = 0.7;
  let dropWidth = "1px";

  if (intensity === "drizzle") {
    spawnRate = 60;
    maxOpacity = 0.55;
    dropWidth = "0.9px";
  } else if (intensity === "heavy") {
    spawnRate = 15;
    maxOpacity = 0.9;
    dropWidth = "1.5px";
  }

  rainInterval = setInterval(() => {
    const drop = document.createElement("div");
    drop.classList.add("drop");
    drop.style.left = Math.random() * 100 + "%";
    drop.style.width = dropWidth;

    let baseDuration = 0.5;
    if (intensity === "drizzle") baseDuration = 0.9;
    if (intensity === "heavy") baseDuration = 0.3;

    const duration = Math.random() * 0.4 + baseDuration;
    drop.style.animationDuration = duration + "s";

    const heightMultiplier = intensity === "drizzle" ? 20 : 40;
    const baseHeight = intensity === "drizzle" ? 15 : 40;
    drop.style.height = Math.random() * heightMultiplier + baseHeight + "px";

    drop.style.opacity = Math.random() * maxOpacity;

    container.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, duration * 1000);
  }, spawnRate);
}

function stopRain() {
  clearInterval(rainInterval);
  rainInterval = null;
  const container = document.getElementById("rain-container");
  if (container) {
    const drops = container.querySelectorAll(".drop");
    drops.forEach((d) => d.remove());
  }
}

// === SCHNEE STEUERUNG ===
function startSnow(intensity = "moderate") {
  const container = document.getElementById("rain-container");
  if (!container || snowInterval) return;

  let spawnRate = 100;
  let minSpeed = 3;
  let maxSpeed = 6;

  if (intensity === "light") {
    spawnRate = 350;
    minSpeed = 5;
    maxSpeed = 8;
  } else if (intensity === "heavy") {
    spawnRate = 20;
    minSpeed = 1;
    maxSpeed = 3;
  }

  snowInterval = setInterval(() => {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");
    flake.style.left = Math.random() * 100 + "%";

    const sizeMultiplier = intensity === "heavy" ? 5 : 4;
    const size = Math.random() * sizeMultiplier + 2 + "px";
    flake.style.width = size;
    flake.style.height = size;

    const duration = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    flake.style.animationDuration = duration + "s";

    container.appendChild(flake);

    setTimeout(() => {
      flake.remove();
    }, duration * 1000);
  }, spawnRate);
}

function stopSnow() {
  clearInterval(snowInterval);
  snowInterval = null;
  const container = document.getElementById("rain-container");
  if (container) {
    const flakes = container.querySelectorAll(".snowflake");
    flakes.forEach((f) => f.remove());
  }
}

// === STERNE STEUERUNG ===
function startStars() {
  const container = document.getElementById("stars-container");
  if (!container || container.children.length > 0) return;

  const numberOfStars = 40;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 70 + "%";

    const size = Math.random() * 2 + 1 + "px";
    star.style.width = size;
    star.style.height = size;

    const duration = Math.random() * 3 + 2 + "s";
    const delay = Math.random() * 5 + "s";
    star.style.setProperty("--duration", duration);
    star.style.animationDelay = delay;

    container.appendChild(star);
  }
}

function stopStars() {
  const container = document.getElementById("stars-container");
  if (container) container.innerHTML = "";
}

export function updateWeatherBackground(weatherCode, hour) {
  if (!weatherEffect) return;

  // if (DEBUG_MODE) {
  //   weatherCode = TEST_WEATHER.code;
  //   hour = TEST_WEATHER.hour;
  //   console.log(
  //     `%c[Wetter-Testmodus AKTIV] Code: ${weatherCode}, Stunde: ${hour}`,
  //     "color: #ff0055; font-weight: bold;",
  //   );
  // }

  stopRain();
  stopSnow();
  stopStars();

  const container = document.querySelector(".screen__container");
  const vantaEl = document.getElementById("weather-bg");
  if (container) {
    container.classList.remove("is-rainy", "is-stormy", "is-foggy", "is-snowy");
  }
  if (vantaEl) {
    vantaEl.classList.remove("is-sunny");
  }

  let timeOfDay = "day";
  if (hour >= 22 || hour < 5) timeOfDay = "night";
  else if (hour >= 5 && hour < 8) timeOfDay = "sunrise";
  else if (hour >= 18 && hour < 22) timeOfDay = "sunset";

  const isFoggy = [1030, 1135, 1147].includes(weatherCode);

  const isDrizzle =
    (weatherCode >= 1150 && weatherCode <= 1171) || [1063, 1180, 1183].includes(weatherCode);

  const isHeavyRain = [1192, 1195, 1246].includes(weatherCode);

  const isNormalRain =
    (weatherCode >= 1186 && weatherCode <= 1189) || (weatherCode >= 1240 && weatherCode <= 1243);

  const isSnowy =
    (weatherCode >= 1210 && weatherCode <= 1225) ||
    (weatherCode >= 1255 && weatherCode <= 1258) ||
    (weatherCode >= 1114 && weatherCode <= 1117) ||
    weatherCode === 1066;

  const isSleetOrIce =
    (weatherCode >= 1204 && weatherCode <= 1207) ||
    (weatherCode >= 1249 && weatherCode <= 1252) ||
    (weatherCode >= 1237 && weatherCode <= 1264) ||
    [1069, 1072, 1168, 1171, 1198, 1201].includes(weatherCode);

  const isStormy = (weatherCode >= 1273 && weatherCode <= 1282) || weatherCode === 1087;

  const setVantaOptions = (options) => {
    const converted = { ...options };
    if (options.skyColor) converted.skyColor = parseInt(options.skyColor.replace("#", "0x"));
    if (options.cloudColor) converted.cloudColor = parseInt(options.cloudColor.replace("#", "0x"));
    if (options.lightColor) converted.lightColor = parseInt(options.lightColor.replace("#", "0x"));
    if (options.sunColor) converted.sunColor = parseInt(options.sunColor.replace("#", "0x"));
    weatherEffect.setOptions(converted);
  };

  const isDaytime = hour >= 5 && hour < 18;

  // A) NEBEL
  if (isFoggy) {
    if (container) container.classList.add("is-foggy");
    setVantaOptions({
      skyColor: isDaytime ? "#a3b1c1" : "#2c3540",
      cloudColor: isDaytime ? "#e0e6ed" : "#4f5d73",
      lightColor: "#888888",
      sunColor: "#555555",
      speed: 0.2,
    });
  }

  // B) GEWITTER
  else if (isStormy) {
    if (container) container.classList.add("is-stormy", "is-rainy");
    const stormSky = isDaytime ? "#334155" : "#1e293b";
    const stormCloud = isDaytime ? "#cbd5e1" : "#64748b";

    setVantaOptions({
      skyColor: stormSky,
      cloudColor: stormCloud,
      lightColor: isDaytime ? "#475569" : "#334155",
      sunColor: "#22d3ee",
      speed: 1.5,
    });

    if (weatherCode === 1279 || weatherCode === 1282) {
      startSnow();
    } else {
      startRain("heavy");
    }
  }

  // C) REGEN
  else if (isDrizzle || isNormalRain || isHeavyRain) {
    if (container) container.classList.add("is-rainy");

    setVantaOptions({
      skyColor: isDaytime ? (isHeavyRain ? "#3b444b" : "#556270") : "#1f242c",
      cloudColor: isDaytime ? (isHeavyRain ? "#5a6570" : "#8a9ba8") : "#808a96",
      lightColor: isHeavyRain ? "#777777" : "#999999",
      sunColor: "#ffffff",
      speed: isHeavyRain ? 0.9 : 0.5,
    });

    if (isHeavyRain) {
      startRain("heavy");
    } else if (isDrizzle) {
      startRain("drizzle");
    } else {
      startRain("moderate");
    }
  }

  // D) SCHNEE / SCHNEEREGEN / EIS
  else if (isSnowy || isSleetOrIce) {
    setVantaOptions({
      skyColor: isDaytime ? "#8797a8" : "#1a212a",
      cloudColor: isDaytime ? "#ffffff" : "#5d6975",
      lightColor: "#000000",
      sunColor: "#000000",
      speed: 0.4,
    });

    if (isSnowy) {
      if (weatherCode === 1066 || weatherCode === 1210 || weatherCode === 1255) {
        startSnow("light");
      } else if (
        weatherCode === 1114 ||
        weatherCode === 1117 ||
        weatherCode === 1222 ||
        weatherCode === 1225
      ) {
        startSnow("heavy");
      } else {
        startSnow("moderate");
      }
    } else {
      startRain("drizzle");
      startSnow("moderate");
    }
  }

  // E) KLAR / BEWÖLKT (Standard nach Tageszeit)
  else {
    switch (timeOfDay) {
      case "night":
        setVantaOptions({
          skyColor: "#0b132b",
          cloudColor: "#1c2541",
          lightColor: "#000000",
          sunColor: "#ffffff",
          speed: 0.3,
        });
        startStars();
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
        if (weatherCode === 1000) {
          if (vantaEl) vantaEl.classList.add("is-sunny"); // Schaltet Vanta über CSS aus!
        } else {
          setVantaOptions({
            skyColor: "#3a7bd5",
            cloudColor: "#ddf0ff",
            lightColor: "#ffffff",
            sunColor: "#fff7e6",
            speed: 1.0,
          });
        }
        break;
    }
  }
}
