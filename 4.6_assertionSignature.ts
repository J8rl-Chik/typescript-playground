// 이전에는 두 가지 방법을 사용했다.
(person as typeof person & { checked: boolean }).checked = true;

// 어설프다는데 뭐가 어설프다는걸까? 찬반형 함수에서 추가 조건을 설정한 다음 true를 반환한다. 뭔가 잘못된것 같다.
function check<T>(obj: T): obj is T & { checked: true } {
  (obj as T & { checked: true }).checked = true;
  return true;
}

const person = {
  name: "Lee",
  age: 20,
};

if (check(person)) {
  person.checked; // true
}

// 어서션 시그니처를 이용하면 조건형을 이용하지 않고 제어 흐름에서 값의 타입을 바꿀 수 있다.
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

// 조건이 거짓이면 실행 종료. never
function yell(str: any) {
  assert(typeof str === "string");
  // str은 string 타입
  console.log(str.toUpperCase());
}

// 원하늠 모든 타입에 assert를 사용할 ㅅ ㅜ있따.
function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Not a number");
  }
}

function add(a: unknown, b: unknown) {
  assertNumber(a);
  assertNumber(b);
  return a + b;
}

// 더 많은 프로퍼티가 있음을 알릴 수 있다.(true 반환 필요 없음)
function check2<T>(obj: T): asserts obj is T & { checked: true } {
  (obj as T & { checked: true }).checked = true;
}

const person2 = {
  name: "Lee",
  age: 20,
};

check2(person2);
