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

// export async function buildForecastWeatherDescription() {
//   const descriptionEL = document.querySelector(".forecast-weather__description");
//   const weather = await getForecastWeather();

//   descriptionEL.innerText = weather.forecastDescription;
// }

export async function buildForecastWeather() {
  const weather = await getForecastWeather();
  const weatherHours = await getForecastHours();
  const forecastWeatherEL = document.querySelector(".forecast-weather");

  const p = document.createElement("p");
  p.classList.add("forecast-weather__description");

  const divForecast = document.createElement("div");
  divForecast.classList.add("forecast-weather__hour-forecast");

  const divView = document.createElement("div");
  divView.classList.add("forecast-weather__hour-view");

  const spanTime = document.createElement("span");
  spanTime.classList.add("forecast-weather__time");

  const imgPicture = document.createElement("img");
  imgPicture.classList.add("forecast-weather__picture");

  const spanTemperature = document.createElement("span");
  spanTemperature.classList.add("forecast-weather__temperature");

  forecastWeatherEL.append(p, divForecast, divView);
  divView.append(spanTime, imgPicture, spanTemperature);

  p.innerText = weather.forecastDescription;
  spanTime.innerText = "jetzt";
  imgPicture.src = weatherHours.hourData24h[0].condition.icon;
  spanTemperature.innerText = weatherHours.hourData24h[0].temp_c;

  // console.log(weather);
  console.log(weatherHours.hourData24h);
}
