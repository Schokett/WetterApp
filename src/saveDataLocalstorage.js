export function saveFavoriteCity(cityData) {
  const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]");

  const exists = favorites.find((city) => city.name === cityData.name);

  if (!exists) {
    favorites.push(cityData);

    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
    alert("Stadt hinzugefügt:", cityData);
  } else {
    alert("Stadt ist bereits in den Favoriten.");
  }
}

export function getFavortiteCity() {
  const storedData = localStorage.getItem("favoriteCities");
  return storedData ? JSON.parse(storedData) : [];
}
