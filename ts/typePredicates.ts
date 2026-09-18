type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function isDice(value: number): value is Dice {
  return [1, 2, 3, 4, 5, 6].includes(value);
}

function rollDice(input: number) {
  if (isDice(input)) {
    console.log(input);
  } else {
    console.error("Invalid dice value");
  }
}

// 조건 자체가 유요한지 확인하지 않아 다음과 같은 단점이 있다.
// 단점
function isDice2(value: number): value is Dice {
  return [1, 2, 3, 4, 5, 7].includes(value);
}

// 단점 2
function isDice3(value: number): value is Dice {
  return value >= 1 && value <= 6;
}

// 단점 3
function isDice4(value: number): value is Dice {
  return true;
}

// 입력 값(value)에 number 타입이 아닌 다른 타입을 줄 순 없을까?
