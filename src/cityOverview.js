import {
  fetchWeatherData,
  getlocationData,
  getForecastWeather,
  getForecastHours,
  getForcastThreeDays,
  getCurrentStatisticsData,
} from "./apiFetch.js";
import { toggleLoading } from "./toggleLoading.js";

// Menu Button
const menuButton = document.querySelector(".action-buttons__menu");
const menuEl = document.querySelector(".menu");

if (menuButton && menuEl) {
  menuButton.addEventListener("click", function () {
    toggleLoading(true);

    menuEl.classList.add("is-active");

    toggleLoading(false);
  });
}

// Build Framwork CurrentWether
export async function buildCurrentWether() {
  const currentWetherEl = document.querySelector(".current-weather");
  const screenEL = document.querySelector(".screen__container");

  try {
    const weather = await getlocationData();

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

export async function buildForecastWeather() {
  const weather = await getForecastWeather();
  const weatherHours = await getForecastHours();
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
export async function buildForecastThreeDay() {
  const weatherData = await getForcastThreeDays();

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

export async function buildCurrentStatisticsCards() {
  const apiData = await getCurrentStatisticsData();
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
