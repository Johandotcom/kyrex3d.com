/* ================= LOADER ================= */

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 2000);
});

/* ================= CAROUSEL ================= */

const track = document.getElementById("carouselTrack");
const thumb = document.getElementById("scrollbarThumb");
const scrollbar = document.querySelector(".carousel-scrollbar");

// Duplicate cards for infinite scroll
const cards = Array.from(track.children);
cards.forEach(card => track.appendChild(card.cloneNode(true)));

let position = 0;
let autoSpeed = 0.35;
let velocity = 0;
let isDragging = false;
let isThumbDragging = false;
let lastX = 0;

function animate() {

  const totalWidth = track.scrollWidth / 2;

  if (!isDragging && !isThumbDragging) {
    position -= autoSpeed;
    position += velocity;
    velocity *= 0.95;
  }

  if (Math.abs(position) >= totalWidth) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  // Scrollbar sync
  const progress = Math.abs(position % totalWidth) / totalWidth;
  const scrollbarWidth = scrollbar.offsetWidth - thumb.offsetWidth;
  thumb.style.transform = `translateX(${progress * scrollbarWidth}px)`;

  requestAnimationFrame(animate);
}

animate();

/* ================= DRAG CAROUSEL ================= */

function startDrag(e) {
  isDragging = true;
  velocity = 0;
  lastX = e.clientX;
}

function onDrag(e) {
  if (!isDragging) return;
  const delta = e.clientX - lastX;
  position += delta;
  velocity = delta;
  lastX = e.clientX;
}

function stopDrag() {
  isDragging = false;
}

track.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", stopDrag);
window.addEventListener("mouseleave", stopDrag);

/* ================= DRAG SCROLLBAR ================= */

thumb.addEventListener("mousedown", (e) => {
  isThumbDragging = true;
  e.stopPropagation();
});

window.addEventListener("mousemove", (e) => {
  if (!isThumbDragging) return;

  const rect = scrollbar.getBoundingClientRect();
  const scrollbarWidth = scrollbar.offsetWidth - thumb.offsetWidth;

  let offset = e.clientX - rect.left;
  offset = Math.max(0, Math.min(offset, scrollbarWidth));

  const progress = offset / scrollbarWidth;
  const totalWidth = track.scrollWidth / 2;

  position = -progress * totalWidth;
});

window.addEventListener("mouseup", () => {
  isThumbDragging = false;
});

/* ================= CLICK BAR TO JUMP ================= */

scrollbar.addEventListener("click", (e) => {
  if (e.target === thumb) return;

  const rect = scrollbar.getBoundingClientRect();
  const scrollbarWidth = scrollbar.offsetWidth - thumb.offsetWidth;

  let offset = e.clientX - rect.left;
  offset = Math.max(0, Math.min(offset, scrollbarWidth));

  const progress = offset / scrollbarWidth;
  const totalWidth = track.scrollWidth / 2;

  position = -progress * totalWidth;
});

/* ================= HOVER SPEED CONTROL ================= */

track.addEventListener("mouseenter", () => autoSpeed = 0.15);
track.addEventListener("mouseleave", () => autoSpeed = 0.35);