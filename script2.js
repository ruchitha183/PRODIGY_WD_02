let [hrs, mins, secs] = [0, 0, 0];
let timer = null;
let isRunning = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

function updateDisplay() {
  const h = hrs < 10 ? "0" + hrs : hrs;
  const m = mins < 10 ? "0" + mins : mins;
  const s = secs < 10 ? "0" + secs : secs;
  display.innerText = `${h}:${m}:${s}`;
}

function stopwatch() {
  secs++;
  if (secs === 60) {
    secs = 0;
    mins++;
    if (mins === 60) {
      mins = 0;
      hrs++;
    }
  }
  updateDisplay();
}

function start() {
  if (!isRunning) {
    timer = setInterval(stopwatch, 1000);
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
  [hrs, mins, secs] = [0, 0, 0];
  updateDisplay();
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
  }
}
