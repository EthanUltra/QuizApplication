let currentQuestion = 0;
let score = 0;
let questions = [];

const quizContainer = document.getElementById("quiz");
const nextButton = document.getElementById("next-button");
const scoreDisplay = document.getElementById("score");
const resultContainer = document.getElementById("result");
const tryAgainButton = document.getElementById("try-again-button");

// Fetch questions and initialize the quiz
fetchQuestions().then((data) => {
  questions = data;
  displayQuestion();
});

function displayQuestion() {
  // Check if there are remaining questions
  if (currentQuestion < questions.length) {
    const questionData = questions[currentQuestion];
    quizContainer.innerHTML = `
      <h2>${questionData.question}</h2>
      ${questionData.options
        .map(
          (option, index) =>
            `<button class="option-button" onclick="selectAnswer(${index}, this)">${option}</button>`
        )
        .join("")}
    `;
    nextButton.classList.add("hidden"); // Hide Next button initially
  } else {
    endQuiz(); // End the quiz when all questions are answered
  }
}

function selectAnswer(selectedIndex, button) {
  // Remove 'selected' class from all option buttons
  const allButtons = document.querySelectorAll(".option-button");
  allButtons.forEach((btn) => btn.classList.remove("selected"));

  // Add 'selected' class to the clicked button
  button.classList.add("selected");

  // Show Next button after selection
  nextButton.classList.remove("hidden");

  // Check the answer
  checkAnswer(selectedIndex);
}

function checkAnswer(selectedIndex) {
  const questionData = questions[currentQuestion];
  if (selectedIndex === questionData.correctIndex) {
    score++;
  }
}

nextButton.addEventListener("click", () => {
  currentQuestion++; // Move to the next question
  displayQuestion(); // Load the next question
});

function endQuiz() {
  // Clear the quiz container and hide Next button
  quizContainer.innerHTML = "";
  nextButton.classList.add("hidden");

  // Display the results
  resultContainer.classList.remove("hidden");
  scoreDisplay.textContent = `${score} / ${questions.length}`;
}

tryAgainButton.addEventListener("click", () => {
  // Reset the quiz state
  currentQuestion = 0;
  score = 0;

  // Hide the result section and Next button
  resultContainer.classList.add("hidden");
  nextButton.classList.add("hidden");

  // Display the first question
  displayQuestion();
});
