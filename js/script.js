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

let gallowsImg;
let quizContainer;
let answerContainer;
let questionContainer;
let guessCounterContainer;


const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questionsData.length);
  return questionsData[randomIndex];
};

let guessesCounter = 0;
let currentQuestion;


const renderVirtualKeyboard = () => {
  const virtualKeyboard = renderElement("div", "virtual-keyboard", null);
  for (let letter of alphabet) {
    const button = renderElement("button", "key-btn", virtualKeyboard, {innerHTML: letter.toUpperCase()})
    button.addEventListener("click", () => handleKeyPress(letter));
  }
  return virtualKeyboard;
};


const renderElement = (child, className, parent, attr) => {
  const element = document.createElement(child);
  className && (element.className = className);
  parent && (parent.append(element));
  if(attr) {
    for (let key in attr){
    element[key] = attr[key];
    }
  }
  return element;
}

const initialRender = () => {
  document.body.innerHTML = "";
  const virtualKeyboard = renderVirtualKeyboard();
  const question = currentQuestion = getRandomQuestion();
  const answerLength = question.answer.length;
  const mainContainer = renderElement("div", "main-container", document.body);
  const mainHeader = renderElement("header", null, mainContainer);
  const mainHeading = renderElement("h1", "heading", mainHeader, {innerText: "Hangman Game"});
  const gameContainer = renderElement("div", "game-container", mainContainer);
  const gallowsContainer = renderElement("div", "gallows-container", gameContainer);
  gallowsImg = renderElement("img", null, gallowsContainer, {src: "./assets/0.png", alt: "Gallows"});
  quizContainer = renderElement("div", "quiz", gameContainer);
  answerContainer = renderElement("p", "answer", quizContainer);
  questionContainer = renderElement("p", "question", quizContainer);
  const guessesContainer = renderElement("p", "guesses", quizContainer, {innerText: "Incorrect guesses: "});
  guessCounterContainer = renderElement("span", "guesses-counter", guessesContainer);
  guessesContainer.append("/6");

  quizContainer.append(virtualKeyboard);

  answerPlaceholderRender(answerLength);
  questionRender(question.question);
  guessesRender(0);
  gallowsRender(0);
  // document.body.innerHTML = `<div class="main-container">
  //   <header>
  //     <h1 class="heading">Hangman Game</h1>
  //   </header>
  //   <div class="game-container">
  //       <div class="gallows-container">
  //         <img src="./assets/0.png" alt="" />
  //       </div>
  //       <div class="quiz">
  //         <p class="answer"></p>
  //         <p class="question"></p>
  //         <p class="guesses">
  //         Incorrect guesses:
  //         <span class="guesses-counter"></span>/6
  //         </p>
  //       </div>
  //     </div>
  //   </div>`;

};

const answerPlaceholderRender = (answerLength) => {
  const answerElement = document.querySelector('.answer');
  placeholder = '';

  while(answerLength){
    placeholder += '_';
    answerLength--;
  }
  answerContainer.innerHTML = placeholder;
}

const questionRender = (question) => {
  questionContainer.innerHTML = question;
}

const guessesRender = (guessesCounter) => {
  guessCounterContainer.innerHTML = `${guessesCounter}`;
}

const gallowsRender = (guessesCounter) => {
  gallowsImg.src = `./assets/${guessesCounter}.png`;
}

initialRender();

const handleKeyPress = (letter) => {};
