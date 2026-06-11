export function saveFavoriteCity(cityData) {
  const saveBtn = document.querySelector(".action-buttons__save");
  const favorites = JSON.parse(localStorage.getItem("favoriteCities") || "[]");
  const exists = favorites.find((city) => city.id === cityData.id);
  const centerPositionEl = document.querySelector(".current-weather");
  if (!exists) {
    favorites.push(cityData);
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));

    //toast Nachricht
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="toast-message__svg">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
        </svg>
      
      <p class="toast-message__title">Erfolgreich</p> 
      <p class="toast-message__cityName">${cityData.name}<span> wurde hinzugefügt</span></p>
    `;

    centerPositionEl.appendChild(toast);
    console.log(toast);

    //start animation toast
    setTimeout(() => toast.classList.add("show"), 10);

    if (saveBtn) saveBtn.style.display = "none";
    // toast entfernen
    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 2000);
  }
}

export function getFavortiteCity() {
  const storedData = localStorage.getItem("favoriteCities");
  return storedData ? JSON.parse(storedData) : [];
}

export function isCityFavorite(cityName, cityId) {
  const favorites = getFavortiteCity();
  console.log("isCityFavorite", cityName, cityId);
  return favorites.some((city) => city.name === cityName && city.id === cityId);
}
