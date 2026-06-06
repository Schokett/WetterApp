import {
  fetchWeatherData,
  getlocationData,
  getForecastWeather,
  getForecastHours,
} from "./apiFetch.js";

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
    imgPicture.src = hour?.condition?.icon
      ? `https:${hour.condition.icon}`
      : "path/to/default-weather-icon.png";

    if (hour?.temp_c !== undefined && hour?.temp_c !== null) {
      const tempRoundOff = Math.floor(hour.temp_c);
      spanTemperature.innerText = `${tempRoundOff}°C`;
    } else {
      spanTemperature.innerText = "--°C";
    }
  });

  console.log(forecastWeatherEL);
}
export async function buildForecastThreeDay() {
  const div = document.createElement("div");
  div.classList.add("forecast-threeDay inline");

  const pTitle = document.createElement("p");
  pTitle.classList.add("forecast-threeDay__title");

  const
}
buildForecastThreeDay();
