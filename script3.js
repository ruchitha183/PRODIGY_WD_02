let hrs = 0, mins = 0, secs = 0, ms = 0;
let timer = null;
let isRunning = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

// Update the displayed time with milliseconds
function updateDisplay() {
  const h = hrs < 10 ? "0" + hrs : hrs;
  const m = mins < 10 ? "0" + mins : mins;
  const s = secs < 10 ? "0" + secs : secs;
  const milli = ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
  display.innerText = `${h}:${m}:${s}:${milli}`;
}

// Stopwatch logic increments ms by 10 every tick (100 ticks per second)
function stopwatch() {
  ms += 10;
  if (ms >= 1000) {
    ms = 0;
    secs++;
    setProgress((secs / 60) * 100);
    if (secs >= 60) {
      secs = 0;
      mins++;
      if (mins >= 60) {
        mins = 0;
        hrs++;
      }
    }
  }
  updateDisplay();
}

function start() {
  if (!isRunning) {
    timer = setInterval(stopwatch, 10);
    isRunning = true;
  }
}

function pause() {
  clearInterval(timer);
  isRunning = false;
}

function stop() {
  clearInterval(timer);
  isRunning = false;
  [hrs, mins, secs, ms] = [0, 0, 0, 0];
  updateDisplay();
  setProgress(0);
}

function reset() {
  stop();
  lapsContainer.innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = display.innerText;
    const lapItem = document.createElement("div");
    lapItem.classList.add("lap-item");
    lapItem.innerText = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapItem);
    // Scroll laps to bottom
    lapsContainer.scrollTop = lapsContainer.scrollHeight;
  }
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});