/* ================= LOADER ================= */

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 2000);
});

/* ================= LIQUID DISTORTION ================= */

const canvas = document.getElementById("liquid");
const ctx = canvas.getContext("2d");

let ripples = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.strength = 1;
  }

  update() {
    this.radius += 1.5;
    this.strength *= 0.97;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.5,
      this.x,
      this.y,
      this.radius
    );

    gradient.addColorStop(0, `rgba(255,255,255,${this.strength * 0.08})`);
    gradient.addColorStop(1, `rgba(255,255,255,0)`);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let lastSpawn = 0;

window.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastSpawn > 60) {
    ripples.push(new Ripple(e.clientX, e.clientY));
    lastSpawn = now;
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ripples = ripples.filter(r => r.strength > 0.02);

  ripples.forEach(r => {
    r.update();
    r.draw();
  });

  requestAnimationFrame(animate);
}

animate();