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
let currentQuestion;

const renderVirtualKeyboard = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const virtualKeyboard = document.createElement("div");
  virtualKeyboard.className = "virtual-keyboard";
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.className = "key-btn";
    button.innerHTML = letter.toUpperCase();
    button.addEventListener("click", () => handleKeyPress(letter));
    virtualKeyboard.appendChild(button);
  }
  return virtualKeyboard;
};

const initialRender = () => {
  document.body.innerHTML = "";
  const virtualKeyboard = renderVirtualKeyboard();
  const question = currentQuestion = getRandomQuestion();
  const answerLength = question.answer.length;
  document.body.innerHTML = `<div class="main-container">
    <header>
      <h1 class="heading">Hangman Game</h1>
    </header>
      <div class="game-container">
        <div class="gallows-container">
          <img src="./assets/0.png" alt="" />
        </div>
        <div class="quiz">
          <p class="answer"></p>
          <p class="question"></p>
          <p class="guesses">
          Incorrect guesses:
          <span class="guessess-counter" id="guessess-counter"></span>/6
          </p>
        </div>
      </div>
    </div>`;
    const qizElement = document.querySelector('.quiz');
    console.log(qizElement);
    qizElement.append(virtualKeyboard);
    answerPlaceholderRender(answerLength);
    questionRender(question.question);
    guessesRender(0);
    gallowsRender(0);
};

const answerPlaceholderRender = (answerLength) => {
  const answerElement = document.querySelector('.answer');
  placeholder = '';

  while(answerLength){
    placeholder += '_';
    answerLength--;
  }
  answerElement.innerHTML = placeholder;
}

const questionRender = (question) => {
  const questionElement = document.querySelector('.question');
  questionElement.innerHTML = question;
}

const guessesRender = (guessesCounter) => {
  const questionElement = document.querySelector('.guessess-counter');
  questionElement.innerHTML = `${guessesCounter}`;
}

const gallowsRender = (guessesCounter) => {
  const gallowsImg = document.querySelector('.gallows-container img');
  gallowsImg.src = `./assets/${guessesCounter}.png`;
}

initialRender();

const handleKeyPress = (letter) => {};
