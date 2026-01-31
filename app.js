// ===== Live Background (Canvas) =====
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.3,
    dy: Math.random() * 0.3
  });
}

function animateBackground() {
  ctx.fillStyle = "rgb(15, 18, 30)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x > canvas.width) p.x = 0;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(animateBackground);
}

animateBackground();
// ===== End Live Background =====

const startBtn = document.querySelector(".btn-start");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");
const messageEl = document.querySelector(".app-message");

const bell = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3");

let totalSeconds = 25 * 60;
let interval = null;
let running = false;

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
}

startBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    messageEl.textContent = "focus time 💻";
    startBtn.textContent = "pause";

    interval = setInterval(() => {
      totalSeconds--;
      updateDisplay();
      const totalTime = sessionAmount * 60;
updateRing(totalSeconds, totalTime);


      if (totalSeconds <= 0) {
        clearInterval(interval);
        bell.play();
        messageEl.textContent = "session complete 🎉";
        startBtn.textContent = "reset";
        running = false;
      }
    }, 1000);
  } else {
    // pause
    clearInterval(interval);
    running = false;
    messageEl.textContent = "paused ⏸";
    startBtn.textContent = "resume";
  }
});

// reset when finished
startBtn.addEventListener("dblclick", () => {
  clearInterval(interval);
  totalSeconds = 25 * 60;
  updateDisplay();
  messageEl.textContent = "press start to begin";
  startBtn.textContent = "start";
  running = false;
});
const progressRing = document.querySelector(".progress-ring");
const FULL_DASH = 754;

function updateRing(timeLeft, totalTime) {
  const offset = FULL_DASH - (timeLeft / totalTime) * FULL_DASH;
  progressRing.style.strokeDashoffset = offset;
}
const audio = new Audio("https://cdn.pixabay.com/audio/2022/10/30/audio_5c98a2a3b3.mp3");
audio.loop = true;

const soundBtn = document.getElementById("sound-toggle");
let soundOn = false;

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundOn ? audio.play() : audio.pause();
  soundBtn.textContent = soundOn ? "sound off" : "sound on";
});


