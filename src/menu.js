import {} from "./apiFetch.js";

export function updateWeatherCardBackground(weatherCode) {
  let finalColor = "rgba(182, 54, 54, 0.2)"; // Fallback
  if (!weatherCode) {
    return;
  }
  // ================================
  //Wetter Manipulieren!
  // weatherCode = 1069;
  // ================================

  console.log(weatherCode);
  // --- 1. SONNE / KLAR / WOLKEN ---
  const sunAndClouds = [1000, 1003, 1006, 1009];

  // --- 2. NEBEL & DUNST ---
  const fogAndMist = [1030, 1036, 1135, 1147];

  // --- 3. REGEN-WAHRSCHEINLICHKEIT / NIESEL ---
  const lightRainDrizzle = [1063, 1150, 1153, 1168, 1171, 1180, 1183];

  // --- 4. NORMALER / STARKER REGEN ---
  const heavyRain = [1186, 1189, 1192, 1195, 1240, 1243, 1246];

  // --- 5. GEWITTER ---
  const thunderStorm = [1087, 1273, 1276, 1279, 1282];

  // --- 6. SCHNEE-WAHRSCHEINLICHKEIT / GEWÖHNLICHER SCHNEE ---
  const snow = [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258];

  // --- 7. SCHNEEREGEN / EIS / GRAUPEL ---
  const sleetAndIce = [1069, 1072, 1198, 1201, 1204, 1207, 1237, 1249, 1252, 1261, 1264];

  if (sunAndClouds.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #3277DE 0%, #fff1bf 100%)";
  } else if (fogAndMist.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #888F92 0%, #ffffee 100%)";
  } else if (lightRainDrizzle.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #242926 0%, #C4B1B3 100%)";
  } else if (heavyRain.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #373834 0%, #A69796 100%)";
  } else if (thunderStorm.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #262422 0%, #D0ADA1 100%)";
  } else if (snow.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #365358 0%, #FFFFDC 100%)";
  } else if (sleetAndIce.includes(weatherCode)) {
    finalColor = finalColor = "linear-gradient(135deg, #6d7174 0%, #FFFFDC 100%)";
  }

  const locationCard = document.querySelector(".locations__location");
  if (locationCard) {
    locationCard.style.setProperty("--backgroundWeatherCard", finalColor);
  }
}
updateWeatherCardBackground();
