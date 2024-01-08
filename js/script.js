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
let currentAnswerPlaceholder = "";

const renderVirtualKeyboard = () => {
  const virtualKeyboard = renderElement("div", "virtual-keyboard", null);
  for (let letter of alphabet) {
    const button = renderElement("button", "key-btn", virtualKeyboard, {
      innerHTML: letter.toUpperCase(),
    });
    button.addEventListener("click", () => handleKeyPress(letter));
  }
  return virtualKeyboard;
};

const renderElement = (child, className, parent, attr) => {
  const element = document.createElement(child);
  className && (element.className = className);
  parent && parent.append(element);
  if (attr) {
    for (let key in attr) {
      element[key] = attr[key];
    }
  }
  return element;
};

const initialRender = () => {
  document.body.innerHTML = "";
  const virtualKeyboard = renderVirtualKeyboard();
  const question = (currentQuestion = getRandomQuestion());
  const mainContainer = renderElement("div", "main-container", document.body);
  const mainHeader = renderElement("header", null, mainContainer);
  const mainHeading = renderElement("h1", "heading", mainHeader, {
    innerText: "Hangman Game",
  });
  const gameContainer = renderElement("div", "game-container", mainContainer);
  const gallowsContainer = renderElement(
    "div",
    "gallows-container",
    gameContainer
  );
  gallowsImg = renderElement("img", null, gallowsContainer, {
    src: "./assets/0.png",
    alt: "Gallows",
  });
  quizContainer = renderElement("div", "quiz", gameContainer);
  answerContainer = renderElement("p", "answer", quizContainer);
  questionContainer = renderElement("p", "question", quizContainer);
  const guessesContainer = renderElement("p", "guesses", quizContainer, {
    innerText: "Incorrect guesses: ",
  });
  guessCounterContainer = renderElement(
    "span",
    "guesses-counter",
    guessesContainer
  );
  guessesContainer.append("/6");

  quizContainer.append(virtualKeyboard);

  answerPlaceholderRender(question.answer);
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

const answerPlaceholderRender = (answer, userAnswer) => {
  let preparedAnswer = answer.toLowerCase();
  userAnswer && (preparedUserAnswer = userAnswer.toLowerCase());
  let answerLength = answer.length;
  const answerElement = document.querySelector(".answer");

  if (userAnswer) {
    for (let i = 0; i < preparedAnswer.length; i++) {
      if (preparedAnswer[i] === preparedUserAnswer) {
        currentAnswerPlaceholder =
          currentAnswerPlaceholder.substring(0, i) +
          preparedUserAnswer +
          currentAnswerPlaceholder.substring(i + 1);
      }
    }
  } else {
    while (answerLength) {
      currentAnswerPlaceholder += "_";
      answerLength--;
    }
  }
  answerContainer.innerHTML = currentAnswerPlaceholder;
};

const questionRender = (question) => {
  questionContainer.innerHTML = question;
};

const guessesRender = (guessesCounter) => {
  guessCounterContainer.innerHTML = `${guessesCounter}`;
};

const gallowsRender = (guessesCounter) => {
  gallowsImg.src = `./assets/${guessesCounter}.png`;
};

initialRender();

const handleKeyPress = (letter) => {
  if (currentQuestion.answer.toLowerCase().includes(letter)) {
    answerPlaceholderRender(currentQuestion.answer, letter);
  } else {
    if(guessesCounter < 6){
      guessesCounter += 1;
      gallowsRender(guessesCounter);
      guessesRender(guessesCounter);
    }
    if(guessesCounter === 6) {
      gallowsRender(guessesCounter);
      guessesRender(guessesCounter);
    }
  }
};
