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

const obj = {
  10: 'I',
  11: 'V',
  12: 'X',
  13: 'L',
  14: 'C',
  15: 'D',
  16: 'M',
  17: 'I = 1',
  18: 'V = 5',
  19: 'X = 10',
  20: 'L = 50',
  21: 'C = 100',
  22: 'D = 500',
  23: 'M = 1000',
  24: 'STOP',
};

for (let i = 0; i <= 50; i++) {
  //
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  const romanResul = convertToRoman(randomNumber);

  const blocks = document.createElement('span');
  // blocks.innerText = i <= 9 || i > 24 ? i : obj[i];
  // blocks.innerHTML = `${randomNumber} = <span class="redis">${romanResul}</span>`;
  blocks.innerHTML = `${randomNumber}<br><span class="redis">${romanResul}</span>`;
  blocks.classList.add('block');

  const randomTranslateX = Math.floor(Math.random() * (800 + 800 + 1) - 800);
  const randomTranslateY = Math.floor(Math.random() * (500 + 500 + 1) - 500);

  // blocks.style.transform = `translate(${randomTranslateX}px, ${randomTranslateY}px)`;
  bg.appendChild(blocks);
}

function animateBlocks() {
  anime({
    targets: '.block',
    translateX: () => {
      return anime.random(-700, 700);
    },
    translateY: () => {
      return anime.random(-400, 400);
    },
    scale: () => {
      return anime.random(0.8, 1);
    },
    opacity: () => {
      return anime.random(0.3, 0.7);
    },
    rotate: () => {
      return anime.random(-60, 60) + 'deg';
    },

    easing: 'linear',
    duration: 3000,
    delay: anime.stagger(10),
    complete: animateBlocks,
  });
}

animateBlocks();

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

// HELPERS;

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

// ALGORITMOS;

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
