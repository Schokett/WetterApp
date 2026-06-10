export function getSavedLocations() {
  const dataLocalStorage = [
    {
      locations: {
        city: "Reykjavík",
        country: "Island",
        temp_c: 4,
        condition_text: "Schneeschauer",
        maxtemp_c: 6,
        mintemp_c: -2,
        condition_code: 1255,
      },
    },
    {
      locations: {
        city: "Kyōto",
        country: "Japan",
        temp_c: 22,
        condition_text: "Heiter",
        maxtemp_c: 26,
        mintemp_c: 15,
        condition_code: 1003,
      },
    },
    {
      locations: {
        city: "Kapstadt",
        country: "Südafrika",
        temp_c: 18,
        condition_text: "Teilweise bewölkt",
        maxtemp_c: 21,
        mintemp_c: 12,
        condition_code: 1006,
      },
    },
    {
      locations: {
        city: "Vancouver",
        country: "Kanada",
        temp_c: 14,
        condition_text: "Leichter Regen",
        maxtemp_c: 16,
        mintemp_c: 9,
        condition_code: 1183,
      },
    },
  ];
  return { dataLocalStorage };
}

export function saveFavoriteCity(cityData) {
  const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]");

  const exists = favorites.find((city) => city.name === cityData.name);

  if (!exists) {
    favorites.push(cityData);

    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
    console.log("Stadt hinzugefügt:", cityData);
  } else {
    console.log("Stadt ist bereits in den Favoriten.");
  }
}

export function getFavortiteCity() {
  const storedData = localStorage.getItem("favoriteCities");
  return storedData ? JSON.parse(storedData) : [];
}
