import { getFavortiteCity } from "./saveDataLocalstorage.js";
import { getlocationData, searchCity } from "./apiFetch.js";

export function updateWeatherCardBackground(weatherCode, currentHour, element) {
  let finalColor = "rgba(182, 54, 54, 0.2)"; // Fallback
  if (!weatherCode) {
    return;
  }
  const isNight = currentHour >= 20 || currentHour < 6;
  //   console.log("hier", currentHour);
  // ================================
  //Wetter Manipulieren!
  // weatherCode = 1069;
  // ================================

  //   console.log(weatherCode);
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
    finalColor = isNight
      ? "linear-gradient(135deg, #111E3A 0%, #324976 100%)" // Nacht-Himmel (Klar/Wolken)
      : "linear-gradient(135deg, #3277DE 0%, #fff1bf 100%)"; // Tag
  } else if (fogAndMist.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #2C3A47 0%, #576574 100%)" // Düsterer Nebel
      : "linear-gradient(135deg, #888F92 0%, #ffffee 100%)";
  } else if (lightRainDrizzle.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #1B2120 0%, #4A5351 100%)" // Nächtlicher Niesel
      : "linear-gradient(135deg, #242926 0%, #C4B1B3 100%)";
  } else if (heavyRain.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #1F201D 0%, #3D3D3A 100%)" // Nasser Asphalt / Starkregen nachts
      : "linear-gradient(135deg, #373834 0%, #A69796 100%)";
  } else if (thunderStorm.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #141210 0%, #4D3D38 100%)" // Dunkles Gewitter
      : "linear-gradient(135deg, #262422 0%, #D0ADA1 100%)";
  } else if (snow.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #1C2E31 0%, #4C6569 100%)" // Nacht-Schnee
      : "linear-gradient(135deg, #365358 0%, #FFFFDC 100%)";
  } else if (sleetAndIce.includes(weatherCode)) {
    finalColor = isNight
      ? "linear-gradient(135deg, #3A3E41 0%, #5D6366 100%)" // Gefrorene Nacht
      : "linear-gradient(135deg, #6d7174 0%, #FFFFDC 100%)";
  }

  // const locationCard = document.querySelector(".locations__location");
  // if (locationCard) {
  //   locationCard.style.setProperty("--backgroundWeatherCard", finalColor);
  // }

  if (element) {
    element.style.setProperty("--backgroundWeatherCard", finalColor);
  }

  return finalColor;
}
updateWeatherCardBackground();

export async function displayHTML() {
  const menu = document.querySelector(".menu");
  menu.innerHTML = `<div class="menu__header">
            <p class="menu__title">Städte verwalten</p>
            <button class="menu__config">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="menu__svg">
                <path
                  fill-rule="evenodd"
                  d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="menu__searchbar">
            <div class="search-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="search-box__icon">
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd" />
              </svg>

              <input type="text" placeholder="Ort eingeben" class="search-box__input" />
            </div>
          </div>
          <div class="locations"></div>
  `;
  searchCityField();
}

export async function searchCityField() {
  const searchbarEL = document.querySelector(".menu__searchbar");
  const searchBox = document.querySelector(".search-box");
  const weather = searchCity();
  const searchFieldEL = document.querySelector(".search-box__input");

  const suggestionList = document.createElement("div");
  suggestionList.className = "search-box__suggestions";

  searchFieldEL.addEventListener("input", async (event) => {
    const query = event.target.value;

    const suggestions = await searchCity(query);

    console.log(suggestions);
    suggestionList.innerHTML = suggestions
      // .map((city) => `<div class="search-box__suggestion-item">${city.name}, ${city.country}</div>`)
      .map(
        (city) => `
    <div class="search-box__suggestion-item" data-name="${city.name}">
      <span class="search-box__city-name">${city.name}</span>
      <span class="search-box__city-country">${city.country}</span>
    </div>`,
      )
      .join("");

    if (query) {
      searchbarEL.appendChild(suggestionList);
      searchFieldEL.classList.add("search-is-active");
      suggestionList.classList.add("search-is-active");
    } else {
      searchbarEL.removeChild(suggestionList);
      searchFieldEL.classList.remove("search-is-active");
      suggestionList.classList.remove("search-is-active");
    }
  });
}

export async function displayData() {
  const locations = document.querySelector(".locations");
  const savedFavorites = await getFavortiteCity();
  const cityNames = savedFavorites.map((item) => item.name);
  const weather = await getlocationData();
  const weatherPromises = cityNames.map((name) => getlocationData(name));
  const weatherResults = await Promise.all(weatherPromises);

  weatherResults.forEach((item) => {
    // 1. Element ERST erstellen
    const card = document.createElement("div");
    card.classList.add("locations__location");

    card.innerHTML = `
      <div class="locations__container-top">
        <div class="locations__city-info">
          <p class="locations__city-name">${item.cityName}</p>
          <p class="locations__country-name">${item.country}</p>
        </div>
        <p class="locations__temperature">${item.temp}°</p>
      </div>
      <div class="locations__container">
        <p class="locations__title">${item.conditionText}</p>
        <p class="locations__temperatureHighLow">H:${item.maxTemp}° T:${item.minTemp}°</p>
      </div>
    `;

    const weatherCode = item.weatherCode;
    const currentHour = new Date().getHours();
    const color = updateWeatherCardBackground(weatherCode, currentHour, card);

    locations.appendChild(card);
  });
}
