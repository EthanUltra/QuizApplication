let timeLeft = 60; // 60 seconds
const timerDisplay = document.getElementById("timer");

const countdown = setInterval(() => {
  if (timeLeft <= 0) {
    clearInterval(countdown);
    endQuiz();
  } else {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  }
}, 1000);
