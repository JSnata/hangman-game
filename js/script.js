const questionsData = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  { question: "What color is the sky?", answer: "Blue" },
  { question: 'Which animal says "meow"?', answer: "Cat" },
  { question: "What season comes after winter?", answer: "Spring" },
  {
    question: "What is the name of the big, round thing in the sky at night?",
    answer: "Moon",
  },
  { question: "How many legs does a cat have?", answer: "Four" },
  { question: 'What is the opposite of "hot"?', answer: "Cold" },
  { question: "What do you wear on your feet?", answer: "Shoes" },
  { question: 'What is the opposite of "up"?', answer: "Down" },
  { question: "What day comes after Sunday?", answer: "Monday" },
];
const alphabet = "abcdefghijklmnopqrstuvwxyz";

const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questionsData.length);
  return questionsData[randomIndex];
};

let guessesCounter = 0;
let currentQuestion = getRandomQuestion();

const getVirtualKeyKeyboard = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const virtualKeyboard = document.createElement("div");
  virtualKeyboard.className = "virtual-keyboard";
  for (let letter of alphabet) {
    console.log(letter);
    const button = document.createElement("button");
    button.className = "key-btn";
    button.innerHTML = letter.toUpperCase();
    button.addEventListener("click", () => handleKeyPress(letter));
    virtualKeyboard.appendChild(button);
  }
  return virtualKeyboard;
};

const handleKeyPress = (letter) => {};
