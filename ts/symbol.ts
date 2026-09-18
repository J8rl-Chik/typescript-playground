// 예시 1)런타임 스위치
const LEVEL_INFO = Symbol("INFO");
const LEVEL_DEBUG = Symbol("DEBUG");

function log(message: string, level: symbol) {
  switch (level) {
    case LEVEL_INFO:
      console.log(message);

      break;
    case LEVEL_DEBUG:
      console.debug(message);

      break;
  }
}

// 예시 2) 반복할 수 없는 프로퍼티, 직렬화 할 수 있는 프로퍼티
const print = Symbol("print");

const user = {
  name: "Alice",
  age: 40,
  [print]: function () {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  },
};

JSON.stringify(user); // {"name":"Alice","age":40}
user[print](); // Name: Alice, Age: 40

// 예시 3) 전역 심볼 레지스트리
Symbol.for("print");

const user2 = {
  name: "Alice",
  age: 40,
  [Symbol.for("print")]: function () {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  },
};

// 심볼의 키를 알고 싶으면 Symbol.keyFor()를 사용한다.

// 예시 4) 해당 심볼만 참조하도록 서브 형식도 있다.
const PROD: unique symbol = Symbol("PROD");
const DEV: unique symbol = Symbol("DEV");

function showWarning(message: string, mode: typeof PROD | typeof DEV) {
  //
}
