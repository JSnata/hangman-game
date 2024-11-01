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
  { question: "Which fruit is yellow and curved?", answer: "Banana" },
  { question: "Which animal is known for its long neck?", answer: "Giraffe" },
  { question: "Which bird is associated with wisdom?", answer: "Owl" },
  { question: "What do you use to eat soup?", answer: "Spoon" },
  { question: "Which animal swings from trees and eats bananas?", answer: "Monkey" },
  { question: "What do you wear to keep your feet warm?", answer: "Socks" },
  { question: "Which bird can't fly but can swim?", answer: "Penguin" },
  { question: "What insect can sting and produces honey?", answer: "Bee" },
  { question: "What do you use to travel on water?", answer: "Boat" },
  { question: "What do you use to listen to music?", answer: "Headphones" },
  { question: "Which big cat has a roar and is known as the 'king of the jungle'?", answer: "Lion" },
  { question: "What do you use to protect your head?", answer: "Helmet" }
];
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let oldQuestionIndex;
let gallowsImg;
let quizContainer;
let answerContainer;
let questionContainer;
let guessCounterContainer;
let mainContainer;
let virtualKeyboard;

const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questionsData.length);
  if(randomIndex === oldQuestionIndex) {
    return getRandomQuestion();
  } else {
    oldQuestionIndex = randomIndex;
    return questionsData[randomIndex];
  }
};

let guessesCounter = 0;
let currentQuestion = "";
let currentAnswerPlaceholder = "";
let disabledKeys = [];

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
  virtualKeyboard = renderVirtualKeyboard();
  const question = (currentQuestion = getRandomQuestion());
  mainContainer = renderElement("div", "main-container", document.body);
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
};

const renderModal = (result, answer) => {
  const modal = renderElement("div", "modal", mainContainer);
  const modalContent = renderElement("div", "modal-content", modal);
  const resultMessage = renderElement("h2", "result-message", modalContent, {innerText: result});
  const secretWordContainer = renderElement("p", "secret-word", modalContent, {innerText: "The secret word was: "});
  const secretWord = renderElement("span", null, secretWordContainer, {innerText: answer});
  const startButton = renderElement("button", "modal-button", modalContent, {innerText: "Play Again"});
  startButton.addEventListener("click", () => handleStartButton());
  modal.style.display = "flex";
}

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
          if(!currentAnswerPlaceholder.includes('_')){
            renderModal("Congratulations! You won!", answer);
          }
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
  disableKey(letter);
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
      renderModal("Wasted :( ", currentQuestion.answer.toLowerCase());
    }
  }
};

const handleStartButton = () => {
  guessesCounter = 0;
  currentQuestion = "";
  currentAnswerPlaceholder = "";
  disabledKeys = [];
  initialRender();
}

window.addEventListener('keydown', (event) => {
  let key = event.code;
  if(key.includes("Key") && !disabledKeys.includes(event.code[event.code.length - 1].toLowerCase())){
    handleKeyPress(event.code[event.code.length - 1].toLowerCase());
  }
});

const disableKey = (letter) => {
  disabledKeys.push(letter.toLowerCase());
  for (let i = 0; i < virtualKeyboard.children.length; i++) {
    const childElement = virtualKeyboard.children[i];
    if(childElement.innerText.toLowerCase() === letter.toLowerCase()){
      childElement.disabled = true;
    }
  }
}