const inputRoman = document.querySelector('#roman-input-converter');
const inputDecimal = document.querySelector('#decimal-input-converter');
const result = document.querySelector('.result');

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

// Event tecla ENTER
inputRoman.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    handleRoman();
    inputRoman.focus();
  }
});
inputDecimal.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    handleDecimal();
    inputDecimal.focus();
  }
});

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
    handleDecimal(inputDecimal.value);
  } else {
    const decimal = convertToDecimal(romanValue);
    if (!decimal) return null;
    inputDecimal.value = decimal;
    handleDecimal(inputDecimal.value);
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
  inputDecimal.focus();
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
