import "./styles/_main.scss";
import "./styles/cityOverview.scss";
import "./styles/loading.scss";
import "./styles/weatherEffects.scss";
import * as cityOverview from "./cityOverview.js";
import * as weatherEffects from "./weatherEffects.js";
import * as toggleLoading from "./toggleLoading.js";
import * as apiFetch from "./apiFetch.js";
import * as weatherApp from "./weatherApp.js";

const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  const bodyEL = document.querySelector("body");

  bodyEL.classList.toggle("darkmode");
});
