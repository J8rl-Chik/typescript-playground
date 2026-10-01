type Person = {
  name: string;
  age: number;
};

function printPerson(p: Person) {
  Object.keys(p).forEach((k) => {
    console.log(k, p[k]); // 범위가 넓어 Person객체에 접근을 막는다.
  });
}

// 아래 객체도 접근 가능하게 된다.
const me = {
  name: "Steafan",
  age: 40,
  website: "https://fettblog.eu",
};

printPerson(me);

function printPerson2(p: Person) {
  const you: Person = {
    name: "Reader",
    age: NaN,
  };

  Object.keys(p).forEach((k) => {
    console.log(k, you[k]); // keyof Person[]을 반환하면 다른 객체도 접근이 가능해져, 예상치 못한 결과를 얻을 수 있다.
  });
}

printPerson2(me);

// 타입 가드로 해결 할 수 있다.
function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
  return k in x;
}

function printPerson3(p: Person) {
  Object.keys(p).forEach((k) => {
    if (isKey(p, k)) {
      console.log(k, p[k]);
    }
  });
}

// for-in을 사용하는 방법도 있다.(그냥 사용하면 동일한 에러 발생)
function printPerson4<T extends Person>(p: T) {
  for (let k in p) {
    console.log(k, p[k]);
  }
}

// 하위 타입과 호환가능하다
printPerson4(me);
