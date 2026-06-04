import { updateWeatherBackground } from "./weatherEffects.js";
// fetch
export async function fetchWeatherData(type, location = "Nagoya") {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const queryParams = type === "forecast" ? "&days=1" : "&lang=de";

    const response = await fetch(
      `https://api.weatherapi.com/v1/${type}.json?key=${apiKey}&q=${location}${queryParams}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("message:", error);
  }
}

export async function locationDetailsWeatherEffects() {
  const apiDataCurrent = await fetchWeatherData("current");
  const apiDataForecast = await fetchWeatherData("forecast");

  // 1. Uhrzeit und Wetter-Text extrahieren
  const localTimeHTML = apiDataCurrent.location.localtime;
  const timePart = localTimeHTML.split(" ")[1];
  const currentHour = parseInt(timePart.split(":")[0]);
  const weatherCode = apiDataCurrent.current.condition.code;
  updateWeatherBackground(weatherCode, currentHour);
}

export async function getlocationData() {
  const apiDataCurrent = await fetchWeatherData("current");
  const apiDataForecast = await fetchWeatherData("forecast");

  const maxTemp = apiDataForecast.forecast.forecastday[0].day.maxtemp_c;
  const minTemp = apiDataForecast.forecast.forecastday[0].day.mintemp_c;

  return {
    cityName: apiDataCurrent.location.name,
    temp: Math.round(apiDataCurrent.current.temp_c),
    conditionText: apiDataCurrent.current.condition.text,
    maxTemp: Math.round(apiDataForecast.forecast.forecastday[0].day.maxtemp_c),
    minTemp: Math.round(apiDataForecast.forecast.forecastday[0].day.mintemp_c),
  };
}
