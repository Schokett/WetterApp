export function toggleLoading(isLoading) {
  const container = document.querySelector(".screen__container");
  const screenEL = document.querySelector(".screen__container");
  if (isLoading) {
    container.classList.add("is-loading");
    screenEL.classList.add("center");
  } else {
    container.classList.remove("is-loading");
    screenEL.classList.remove("center");
  }
}
