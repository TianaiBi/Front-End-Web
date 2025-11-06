const frame = document.getElementById("frame");
const ball = document.getElementById("ball");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

const movement = 7; // pixels per frame
let direction = 1;  // 1 = right, -1 = left
let animationId = null;

function moveBall() {
  const xBall = parseFloat(getComputedStyle(ball).left);
  const xMax = parseFloat(getComputedStyle(frame).width);
  const ballWidth = parseFloat(getComputedStyle(ball).width);

  // Move the ball first
  const newPosition = xBall + movement * direction;
  ball.style.left = newPosition + "px";

  // Then check if it hit the edges and reverse for NEXT frame
  if (newPosition + ballWidth >= xMax || newPosition <= 0) {
    direction *= -1;
  }

  animationId = requestAnimationFrame(moveBall);
}

// Start animation
startBtn.onclick = () => {
  if (!animationId) {
    animationId = requestAnimationFrame(moveBall);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
};

// Stop animation
stopBtn.onclick = () => {
  cancelAnimationFrame(animationId);
  animationId = null;
  startBtn.disabled = false;
  stopBtn.disabled = true;
};