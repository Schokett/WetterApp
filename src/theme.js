// let isInitialized = false;
// const toggleBtn = document.getElementById("theme-toggle");
// const bodyEL = document.querySelector("body");
// export function initThemeLogic() {
//   const savedTheme = localStorage.getItem("theme");

//   if (savedTheme === "dark") {
//     bodyEL.classList.add("darkmode");
//   } else {
//     bodyEL.classList.remove("darkmode");
//   }

//   toggleBtn.addEventListener("click", (event) => {
//     event.stopPropagation();
//     bodyEL.classList.toggle("darkmode");

//     const isDark = bodyEL.classList.contains("darkmode");
//     localStorage.setItem("theme", isDark ? "dark" : "light");

//     console.log("Button geklickt! Status:", isDark ? "dark" : "light");
//     toggleBtn.blur();
//   });
//   isInitialized = true;
// }
