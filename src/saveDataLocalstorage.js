export function saveFavoriteCity(cityData) {
  const saveBtn = document.querySelector(".action-buttons__save");
  const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]");
  const exists = favorites.find((city) => city.name === cityData.name);

  if (!exists) {
    favorites.push(cityData);
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));

    if (saveBtn) saveBtn.style.display = "none";
    console.log("Stadt hinzugefügt");
  } else {
    alert("Stadt ist bereits in den Favoriten.");
    if (saveBtn) saveBtn.style.display = "none";
  }
}

export function getFavortiteCity() {
  const storedData = localStorage.getItem("favoriteCities");
  return storedData ? JSON.parse(storedData) : [];
}

export function isCityFavorite(cityName, cityId) {
  const favorites = getFavortiteCity();
  console.log(cityName, cityId);
  return favorites.some((city) => city.name === cityName && city.id === cityId);
}
