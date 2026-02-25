/* ================= LOADER ================= */

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 2000);
});