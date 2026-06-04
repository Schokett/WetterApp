// fetch
export async function fetchWeatherData(type) {
  try {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const queryParams = type === "forecast" ? "&days=1" : "&lang=de";

    const response = await fetch(
      `https://api.weatherapi.com/v1/${type}.json?key=${apiKey}&q=köln${queryParams}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("message:", error);
  }
}
