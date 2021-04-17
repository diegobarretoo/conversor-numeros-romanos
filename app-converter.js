const inputRoman = document.querySelector('#roman-input-converter');
const inputDecimal = document.querySelector('#decimal-input-converter');
const result = document.querySelector('.result');
const bg = document.querySelector('.bg');

const romanToNum = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function handleRoman() {
  const romanValue = inputRoman.innerText;
  if (romanValue.length === 0) {
    return error();
  }

  const romans = hasOverline();
  if (romans) {
    const decimal = romans[1] === 'Empty' ? 0 : convertToDecimal(romans[1]);
    const decimalThousand = convertToDecimal(romans[0]);

    if (decimal === null || decimalThousand === null) return error();

    const total = decimal + decimalThousand * 1000;
    inputDecimal.value = total;
    handleDecimal();
  } else {
    const decimal = convertToDecimal(romanValue);
    if (!decimal) return null;
    inputDecimal.value = decimal;
    handleDecimal();
  }
}

function handleDecimal() {
  //Remove os zeros à esquerda
  const decimalValue = +inputDecimal.value;
  inputDecimal.value = decimalValue;

  if (decimalValue < 1 || decimalValue > 3999000) {
    return error();
  }
  if (decimalValue > 0 && decimalValue < 4000) {
    const roman = convertToRoman(decimalValue);
    inputRoman.innerText = roman;
    result.innerText = `${roman} = ${decimalValue}`;
  }
  if (decimalValue >= 4000 && decimalValue <= 3999000) {
    const rest = convertToRoman(decimalValue % 1000);
    const romanThousand = convertToRoman(parseInt(decimalValue / 1000));

    inputRoman.innerText = '';
    result.innerText = '';

    //Input Roman com overline
    inputRoman.insertAdjacentElement(
      'afterbegin',
      createThousand(romanThousand),
    );
    inputRoman.insertAdjacentText('beforeend', rest);

    //Result com overline
    result.insertAdjacentElement('afterbegin', createThousand(romanThousand));
    result.insertAdjacentText('beforeend', `${rest} = ${decimalValue}`);
  }
  inputDecimal.focus();
}

// HELPERS

function createThousand(romanThousand) {
  const thousand = document.createElement('span');
  thousand.classList.add('thousand');
  thousand.innerText = romanThousand;
  return thousand;
}

function addNumbers(nums) {
  const total = nums.reduce((acc, current) => {
    return acc + current;
  });
  return total;
}

function error() {
  inputRoman.innerText = '';
  inputDecimal.value = 0;
  result.innerText = '';
  // inputDecimal.focus();
  return null;
}

function hasOverline() {
  const thousand = document.querySelector('#roman-input-converter > span');

  if (!thousand) return false;

  const overlineRoman = thousand.innerText;
  const restRoman = inputRoman.innerText.slice(overlineRoman.length) || 'Empty';
  return [overlineRoman, restRoman];
}

// ALGORITMOS

function convertToDecimal(romanValue) {
  const keys = romanValue.split('');

  //Verifica se existe alguma key (algarismo) inválida
  if (!keys.every((key) => romanToNum[key])) {
    return error();
  }

  //Transforma as keys em numbers
  const nums = keys.map((key) => romanToNum[key]);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < nums[i + 1]) nums[i] = -nums[i];
  }

  return addNumbers(nums);
}

function convertToRoman(num) {
  let roman = '';

  for (let key in romanToNum) {
    while (num >= romanToNum[key]) {
      roman += key;
      num -= romanToNum[key];
    }
  }

  return roman;
}

// Events tecla ENTER
function addEnterKeyEvents() {
  inputRoman.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleRoman();
      inputRoman.focus();
    }
  });
  inputDecimal.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      handleDecimal();
      inputDecimal.focus();
    }
  });
}

// BG ANIMATION

function createBgItens() {
  for (let i = 0; i <= 50; i++) {
    // create item
    const bgItem = document.createElement('span');
    bgItem.classList.add('bg-item');

    // random content
    const randomNumber = Math.floor(Math.random() * 100 + 1);
    const romanResul = convertToRoman(randomNumber);
    bgItem.innerHTML = `${randomNumber} = <span>${romanResul}</span>`;

    // transform style
    const randomTranslateX = Math.floor(Math.random() * (800 + 800 + 1) - 800);
    const randomTranslateY = Math.floor(Math.random() * (500 + 500 + 1) - 500);
    bgItem.style.transform = `translate(${randomTranslateX}px, ${randomTranslateY}px)`;

    bg.appendChild(bgItem);
  }

  return document.querySelectorAll('.bg-item');
}

function addBgClearEvent() {
  bgItens.forEach((bgItem) => {
    bgItem.addEventListener('click', () => {
      anime.remove('.bg-item');
      bgClear();
    });
  });
}

function bgClear() {
  bgItens.forEach((bgItem) => {
    bgItem.style.transition = '2s';
    setTimeout(() => {
      bgItem.style.transform = 'translateX(50%) translateY(50%)';
    }, Math.floor(Math.random() * 1500 + 1));
    setTimeout(() => {
      bgItem.style.display = 'none';
    }, 2000);
  });
}

function animateBgItens() {
  // Config animation
  anime({
    targets: '.bg-item',
    translateX: () => anime.random(-700, 700),
    translateY: () => anime.random(-400, 400),
    scale: () => anime.random(0.8, 1),
    opacity: () => anime.random(0.3, 0.5),
    rotateY: '1turn',

    easing: 'linear',
    duration: 5000,
    delay: anime.stagger(10),
    complete: animateBgItens,
  });
}

function addButtonsEvents() {
  const decimalButtons = document.querySelectorAll('[data-btn="decimal"]');
  const romanButtons = document.querySelectorAll('[data-btn="roman"]');

  decimalButtons.forEach((btn) => {
    btn.addEventListener('click', handleDecimal);
  });
  romanButtons.forEach((btn) => {
    btn.addEventListener('click', handleRoman);
  });
}

// Init
function init() {
  addButtonsEvents();
  animateBgItens();
  addBgClearEvent();
  addEnterKeyEvents();
}

const bgItens = createBgItens();
init();
