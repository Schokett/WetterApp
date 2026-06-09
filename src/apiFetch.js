import { updateWeatherBackground } from "./weatherEffects.js";
import { updateWeatherCardBackground } from "./menu.js";

export async function fetchWeatherData({
  type = "forecast",
  location = "Frankfurt am main",
  day = 1,
} = {}) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const queryParams = type === "forecast" ? `&days=${day}` : "";

    const response = await fetch(
      `https://api.weatherapi.com/v1/${type}.json?key=${apiKey}&q=${location}${queryParams}&lang=de`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("message:", error);
  }
}
export async function locationDetailsWeatherEffects() {
  const apiDataCurrent = await fetchWeatherData({ type: "current" });
  const apiDataForecast = await fetchWeatherData({ type: "forecast" });

  // 1. Uhrzeit und Wetter-Text extrahieren
  const localTimeHTML = apiDataCurrent.location.localtime;
  const timePart = localTimeHTML.split(" ")[1];
  const currentHour = parseInt(timePart.split(":")[0]);
  const weatherCode = apiDataCurrent.current.condition.code;
  updateWeatherBackground(weatherCode, currentHour);
  updateWeatherCardBackground(weatherCode, currentHour);
}

export async function getlocationData() {
  const apiDataCurrent = await fetchWeatherData({ type: "current" });
  const apiDataForecast = await fetchWeatherData({ type: "forecast" });

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
export async function getForecastWeather() {
  const apiDataForecast = await fetchWeatherData({ type: "forecast" });
  const weatherConditonData = apiDataForecast.forecast.forecastday[0].day.condition.text;
  const weatherWindData = apiDataForecast.forecast.forecastday[0].day.maxwind_kph;

  const forecastDescription = `Heute ${weatherConditonData}. Wind bis zu ${weatherWindData} km/h.`;
  return { forecastDescription };
}

export async function getForecastHours() {
  const apiDataForecast = await fetchWeatherData({ type: "forecast" });
  const weatherHoursData = apiDataForecast.forecast.forecastday[0].hour;

  //holt Eintrag der aktuell ist
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const currentHourWeatherData = weatherHoursData.find((hour) => {
    return hour.time_epoch <= currentTimestamp && hour.time_epoch + 3600 > currentTimestamp;
  });

  //alle Einträge die Größer sind als der aktuelle
  const forecastHourWeatherData = weatherHoursData.filter((hour) => {
    return hour.time_epoch > currentHourWeatherData.time_epoch;
  });

  //vom nächsten tag einträge holen bis ingesamt [23] Einträge vorhanden sind
  const apiDataForecastNextDay = await fetchWeatherData({ type: "forecast", day: 2 });
  const weatherHoursNextDayData = apiDataForecastNextDay.forecast.forecastday[1].hour;

  let hourData24hFusion = [currentHourWeatherData, ...forecastHourWeatherData];
  hourData24hFusion = [...hourData24hFusion, ...weatherHoursNextDayData];

  const hourData24h = hourData24hFusion.slice(0, 24);

  return {
    hourData24h,
  };
}

export async function getForcastThreeDays() {
  const apiDataForecast = await fetchWeatherData({ type: "forecast", day: 3 });
  const weatherDateData = apiDataForecast.forecast.forecastday;

  const dates = weatherDateData.map((day, index) => {
    if (index === 0) {
      return "Heute";
    }
    const allDates = day.date;
    const dateObj = new Date(allDates);

    const weekdaysShort = dateObj.toLocaleDateString("de-DE", { weekday: "short" });
    return weekdaysShort;
  });

  const icons = weatherDateData.map((day, index) => {
    const icon = day.day.condition.icon;
    return icon;
  });

  return {
    weatherDateData,
    dates,
    icons,
  };
}

export async function getCurrentStatisticsData() {
  const dataCurrent = await fetchWeatherData({ type: "current", day: 1 });
  const dataForecast = await fetchWeatherData({ type: "forecast", day: 1 });

  const astro = dataForecast.forecast.forecastday[0].astro;
  const sunrise24 = new Date(`2000/01/01 ${astro.sunrise}`).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset24 = new Date(`2000/01/01 ${astro.sunset}`).toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    dataCurrent,
    sunrise: sunrise24,
    sunset: sunset24,
  };
}
getCurrentStatisticsData();
