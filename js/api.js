// Function to fetch questions from a local JSON file
async function fetchQuestions() {
  try {
    const response = await fetch('data/questions.json'); // Adjust the path as needed
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questions = await response.json();
    return questions;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return [];
  }
}
