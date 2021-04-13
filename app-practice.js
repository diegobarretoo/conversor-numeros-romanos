// import debounce from './debounce.js';

// Elements
const nextNav = document.querySelector('.converter .nav_btn');
const beforeNav = document.querySelector('.practice .nav_btn');
const container = document.querySelector('.container');
const question = document.querySelector('.question');
const answer = document.querySelector('[data-answer]');
const resultPractice = document.querySelector('.practice-result');
const btnCheck = document.querySelector('.check');

// Mensagens
const messages = ['Boa!', 'Ótimo trabalho!', 'Excelente!', 'Muito Bem!'];

// Recebe a resposta correta gerada
let rightAnswer;

// Roda o app
initQuestion();

function initQuestion() {
  const randomNumber = generateRandomNumber();
  const randomRoman = convertToRoman(randomNumber); //Até 3999

  // Decimal or Roman
  if (Math.floor(Math.random() * 2)) {
    question.innerText = randomNumber;
    answer.dataset.answer = 'Roman???';
    // Armazena a -> Resposta correta em ROMANO
    rightAnswer = randomRoman;
  } else {
    question.innerText = randomRoman;
    answer.dataset.answer = 'Decimal???';
    // Armazena a -> Resposta correta em NUMERO
    rightAnswer = randomNumber.toString();
  }
  // answer.focus();
}

function handleCheck() {
  if (btnCheck.innerText === 'Continuar') {
    cleanAndReset();
    initQuestion();
    return;
  }
  // Armazena a resposta do usuário
  const userAnswer = answer.innerText;

  if (userAnswer.length) {
    answer.contentEditable = 'false';
    btnCheck.innerText = 'Continuar';
    btnCheck.focus();

    handleAnswer(userAnswer);
  } else {
    answer.innerText = '0';
    answer.focus();
  }
}

// HELPERS

function handleAnswer(userAnswer) {
  if (userAnswer === rightAnswer) {
    resultPractice.classList.remove('red');
    resultPractice.classList.add('green');

    resultPractice.innerHTML = `<p>${
      messages[Math.floor(Math.random() * 4)]
    } <span>${rightAnswer}</span></p>`;
    btnCheck.style.backgroundColor = '#3fd01b';
  } else {
    resultPractice.classList.remove('green');
    resultPractice.classList.add('red');

    resultPractice.innerHTML = `<p>Resposta Correta: <span>${rightAnswer}</span></p>`;
    btnCheck.style.backgroundColor = '#d01b1b';
  }
}

function cleanAndReset() {
  resultPractice.classList.remove('red');
  resultPractice.classList.remove('green');
  btnCheck.style.backgroundColor = 'var(--primary-color)';
  btnCheck.innerText = 'Verificar';
  answer.innerText = '';
  answer.contentEditable = 'true';
}

function generateRandomNumber(level = 'easy') {
  switch (level) {
    case 'easy':
      return Math.floor(Math.random() * 100 + 1);
    case 'normal':
      return Math.floor(Math.random() * (3999 - 101 + 1)) + 101;
    case 'hard':
      return Math.floor(Math.random() * (3999000 - 3999 + 1)) + 3999;
    default:
      console.log(`Sorry, we are out of ${level}.`);
  }
}

// ajusta a visualização do 'app practice' no container
function setViewPractice() {
  if (screen.width <= 460) container.style.transform = 'translateX(-100vw)';
  if (screen.width > 460 && screen.width <= 620)
    container.style.transform = 'translateX(-430px)';
  if (screen.width > 620) container.style.transform = 'translateX(-600px)';
}

// Lida com o redimensionamento da tela
function onResize() {
  if (getComputedStyle(container).transform !== 'none') {
    setViewPractice();
  }
}
window.addEventListener('resize', debounce(onResize, 50));
// https://stackoverflow.com/questions/42267189/how-to-get-value-translatex-by-javascript/42267468

// Nav Buttons
nextNav.addEventListener('click', (e) => {
  //Reseta o app-conversor
  error();
  setViewPractice();
});
beforeNav.addEventListener('click', (e) => {
  container.style.transform = 'none';
});

// Debounce
function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

// Events tecla ENTER
answer.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' || e.key === 'Enter' || e.keyCode === 13) {
    e.preventDefault();
    btnCheck.click();
  }
  // if (answer.innerText.length > 40) {
  //   if (
  //     e.code === 'Backspace' ||
  //     e.key === 'Backspace' ||
  //     e.keyCode === 8 ||
  //     e.code === 'Delete' ||
  //     e.key === 'Delete' ||
  //     e.keyCode === 46
  //   ) {
  //   } else {
  //     e.preventDefault();
  //     alert('Limite de caracteres atingido');
  //   }
  // }
});
