import {
  fetchWeatherData,
  getlocationData,
  getForecastWeather,
  getForecastHours,
  getForcastThreeDays,
  getCurrentStatisticsData,
} from "./apiFetch.js";
import { toggleLoading } from "./toggleLoading.js";
import { renderMenu } from "./handleApp.js";
import { cityId, cityName } from "./weatherApp.js";
import { saveFavoriteCity } from "./saveDataLocalstorage.js";

export function initOverview() {
  const overviewContainer = document.querySelector(".app-content-scrollable");
  if (!overviewContainer) return;

  overviewContainer.innerHTML = `<div class="action-buttons">
            <button class="action-buttons__menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="action-icon">
                <path
                  fill-rule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clip-rule="evenodd" />
              </svg>
            </button>
            <button class="action-buttons__save">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="action-icon">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
            </button>
          </div>
          <div class="current-weather"></div>
          <div class="forecast-weather inline"></div>
          <div class="forecast-threeDay inline"></div>
          <div class="current-statistics inline"></div>
          <div class="current-statistics-container inline"></div>
  `;
  menuButton();
  saveButton();
}

export async function buildCurrentWether(city) {
  const currentWetherEl = document.querySelector(".current-weather");
  const screenEL = document.querySelector(".screen__container");

  try {
    const weather = await getlocationData(city);

    const div = document.createElement("div");
    div.classList.add("current-weather");

    const spanCity = document.createElement("span");
    spanCity.classList.add("current-weather__city");

    const spanTemperature = document.createElement("span");
    spanTemperature.classList.add("current-weather__temperature");

    const spanCondition = document.createElement("span");
    spanCondition.classList.add("current-weather__condition", "small");

    const spanLowestAndHighest = document.createElement("span");
    spanLowestAndHighest.classList.add("current-weather__lowest-and-highest", "small");

    div.appendChild(spanCity);
    div.appendChild(spanTemperature);
    div.appendChild(spanCondition);
    div.appendChild(spanLowestAndHighest);

    spanCity.innerText = weather.cityName;
    spanTemperature.innerText = `${weather.temp}°`;
    spanCondition.innerText = weather.conditionText;
    spanLowestAndHighest.innerText = `H:${weather.maxTemp}° T:${weather.minTemp}°`;

    currentWetherEl.appendChild(div);
  } catch (error) {
    screenEL.innerHTML = "<p>Fehler beim Laden der Wetterdaten.</p>";
    console.log(error);
  }
}

export async function buildForecastWeather(city) {
  const weather = await getForecastWeather(city);
  const weatherHours = await getForecastHours(city);
  const forecastWeatherEL = document.querySelector(".forecast-weather");

  const p = document.createElement("p");
  p.classList.add("forecast-weather__description");
  forecastWeatherEL.appendChild(p);
  p.innerText = weather.forecastDescription;

  const divForecast = document.createElement("div");
  divForecast.classList.add("forecast-weather__hour-forecast");
  forecastWeatherEL.appendChild(divForecast);

  //Schleife zum durchlaufen der 24 Stunden
  weatherHours.hourData24h.forEach((hour, index) => {
    const divView = document.createElement("div");
    divView.classList.add("forecast-weather__hour-view");
    divForecast.appendChild(divView);

    const spanTime = document.createElement("span");
    spanTime.classList.add("forecast-weather__time");

    const imgPicture = document.createElement("img");
    imgPicture.classList.add("forecast-weather__picture");

    const spanTemperature = document.createElement("span");
    spanTemperature.classList.add("forecast-weather__temperature");

    divView.append(spanTime, imgPicture, spanTemperature);

    if (index === 0) {
      spanTime.innerText = "Jetzt";
    } else {
      const fullTime = hour.time.split(" ")[1];
      const cutTime = fullTime.split(":")[0] + " Uhr";
      spanTime.innerText = cutTime;
    }
    imgPicture.src = hour?.condition?.icon ? `https:${hour.condition.icon}` : "/";

    if (hour?.temp_c !== undefined && hour?.temp_c !== null) {
      const tempRoundOff = Math.floor(hour.temp_c);
      spanTemperature.innerText = `${tempRoundOff}°C`;
    } else {
      spanTemperature.innerText = "--°C";
    }
  });
}
export async function buildForecastThreeDay(city) {
  const weatherData = await getForcastThreeDays(city);

  const forecastThreeDayEl = document.querySelector(".forecast-threeDay");
  const pTitle = document.createElement("p");
  pTitle.classList.add("forecast-threeDay__title");
  pTitle.innerText = "Vorhersage für die nächsten 3 Tage:";
  forecastThreeDayEl.appendChild(pTitle);

  weatherData.weatherDateData.forEach((element, index) => {
    const divContainer = document.createElement("div");
    divContainer.classList.add("forecast-threeDay__threeDay-container");
    forecastThreeDayEl.appendChild(divContainer);

    const pDay = document.createElement("p");
    pDay.classList.add("forecast-threeDay__day");
    pDay.innerText = weatherData.dates[index];

    const img = document.createElement("img");
    img.classList.add("forecast-threeDay__img");
    img.src = weatherData.icons?.[index] ? `https:${weatherData.icons?.[index]}` : "/";

    const pHighTe = document.createElement("p");
    pHighTe.classList.add("forecast-threeDay__highestTemp");
    pHighTe.innerText = `H:${Math.floor(element.day.maxtemp_c)}°`;

    const pLowTe = document.createElement("p");
    pLowTe.classList.add("forecast-threeDay__lowestTemp");
    pLowTe.innerText = `T:${Math.floor(element.day.mintemp_c)}°`;

    const pWindTe = document.createElement("p");
    pWindTe.classList.add("forecast-threeDay__WindTempo");
    pWindTe.innerText = `Wind: ${Math.floor(element.day.maxwind_kph)} km/h`;

    divContainer.append(pDay, img, pHighTe, pLowTe, pWindTe);
  });
}

export async function buildCurrentStatisticsCards(city) {
  const apiData = await getCurrentStatisticsData(city);
  const currentStatisticsEL = document.querySelector(".current-statistics");

  const currentStatisticsCard = `<div class="current-statistics__card">
              <p class="card__title">Feuchtigkeit</p>
              <span class="card__content">${apiData.dataCurrent.current.humidity}%</span>
            </div>
            <div class="current-statistics__card">
              <p class="card__title">Gefühlt</p>
              <span class="card__content">${apiData.dataCurrent.current.feelslike_c}°</span>
            </div>

            <div class="current-statistics__card">
              <p class="card__title">Niederschlag</p>
              <span class="card__content">${apiData.dataCurrent.current.precip_mm}mm</span>
            </div>
            <div class="current-statistics__card">
              <p class="card__title">UV-Index</p>
              <span class="card__content">${apiData.dataCurrent.current.uv}</span>
            </div>`;
  currentStatisticsEL.innerHTML = currentStatisticsCard;

  const currentStatisticsConatinerEL = document.querySelector(".current-statistics-container");
  const currentStatisticsContainerCard = `<div class="current-statistics-container__card">
              <img src="Sonnenaufgang.png" class="card__img" />
              <span class="card__content">
                Sonnenaufgang
                <br />
                ${apiData.sunrise} Uhr
              </span>
            </div>
            <div class="current-statistics-container__card">
              <span class="card__content">
                Sonnenuntergang
                <br />
                ${apiData.sunset} Uhr
              </span>
              <img src="Sonnenuntergang.png" class="card__img" />
            </div>`;
  currentStatisticsConatinerEL.innerHTML = currentStatisticsContainerCard;
}

function menuButton() {
  const menuBtn = document.querySelector(".action-buttons__menu");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      renderMenu();
    });
  }
}
let isSaveListenerActive = false;
async function saveButton() {
  if (isSaveListenerActive) return;
  document.addEventListener("click", (event) => {
    const saveBtn = event.target.closest(".action-buttons__save");

    if (saveBtn) {
      const newCity = {
        name: cityName,
        savedAt: new Date().toISOString(),
        id: cityId,
      };
      console.log("hier saved", newCity);

      saveFavoriteCity(newCity);
    }

    saveBtn.classList.add("is-saved");
  });
  isSaveListenerActive = true;
}
