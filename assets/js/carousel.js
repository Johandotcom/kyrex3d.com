var carousel = document.getElementById("carousel");
var prev = document.querySelector(".prev");
var next = document.querySelector(".next");

var isDown = false;
var startX;
var scrollLeft;


/* Arrows */
next.addEventListener("click", function() {
  carousel.scrollLeft += 380;
});

prev.addEventListener("click", function() {
  carousel.scrollLeft -= 380;
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  // Always show loader for 3 seconds
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 3000);
});