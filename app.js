const inputRoman = document.querySelector('#roman');
const inputDecimal = document.querySelector('#decimal');
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

function handleMil() {
  const thousand = document.querySelector('#roman > span');
  if (!thousand) return false;
  const mil = thousand.innerText;
  const completo = inputRoman.innerText.slice(mil.length) || 'VAZIO';
  return [mil, completo];
}

function handleRoman() {
  const romanValue = inputRoman.innerText;
  if (romanValue.length === 0) {
    alert('Número inválido. Tente outra vez!');
    return null;
  }

  const ab = handleMil();
  console.log(ab);
  if (ab) {
    const rest = ab[1] === 'VAZIO' ? 0 : lidar(ab[1]);
    const mi = lidar(ab[0]) * 1000;
    total = rest + mi;
    inputDecimal.value = total;
    handleDecimal(inputDecimal.value);
  } else {
    const romanCem = lidar(romanValue);
    inputDecimal.value = romanCem;
    handleDecimal(inputDecimal.value);
  }
}

function lidar(romanValue) {
  const keys = romanValue.split('');
  if (!keys.every((key) => romanToNum[key])) {
    alert('Número inválido. Tente outra vez!');
    return null;
  }

  const numbers = keys.map((key) => romanToNum[key]);

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < numbers[i + 1]) numbers[i] = -numbers[i];
  }

  return somar(numbers);
}

function somar(arr) {
  const total = arr.reduce((acumulador, atual) => {
    return acumulador + atual;
  });
  return total;
}

function handleDecimal() {
  const decimalValue = +inputDecimal.value;
  inputDecimal.value = decimalValue;

  if (decimalValue < 1 || decimalValue > 3999000)
    alert('Número inválido. Tente outra vez!');
  if (decimalValue > 0 && decimalValue < 4000) {
    const roman = convertToRoman(decimalValue);
    inputRoman.innerText = roman;
    result.innerText = `${roman} = ${decimalValue}`;
  }
  if (decimalValue >= 4000 && decimalValue <= 3999000) {
    const rest = convertToRoman(decimalValue % 1000);
    const romanThousand = convertToRoman(parseInt(decimalValue / 1000));

    result.innerText = '';
    inputRoman.innerText = '';
    result.insertAdjacentElement('afterbegin', createThousand(romanThousand));
    inputRoman.insertAdjacentElement(
      'afterbegin',
      createThousand(romanThousand),
    );
    result.insertAdjacentText('beforeend', `${rest} = ${decimalValue}`);
    inputRoman.insertAdjacentText('beforeend', rest);
  }
  inputDecimal.classList.add('focus');
  inputRoman.classList.add('focus');
}

function createThousand(romanThousand) {
  const thousand = document.createElement('span');
  thousand.classList.add('thousand');
  thousand.innerText = romanThousand;
  return thousand;
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

// https://www.todamateria.com.br/numeros-romanos/
