type Dice = 1 | 2 | 3 | 4 | 5 | 6;

// num은 number타입이라 더 좁은 타입인 Dice에 할당할 수 없다.
function rollDice(): Dice {
  let num = Math.floor(Math.random() * 6) + 1;

  return num;
}

// 타입 단언으로 좁힐 수 있다.
function rollDice2(): Dice {
  let num = Math.floor(Math.random() * 6) + 1;

  return num as Dice;
}

type Person = {
  name: string;
  age: number;
  profession: string;
};

// 아래처럼 작성해도 타입스크립트는 아무런 경고도 없어 안전하지 않다.
function createDemoPerson(name: string) {
  const person = {} as Person;
  person.name = name;
  person.age = Math.floor(Math.random() * 95);
  // profession이 없어도 에러가 안난다.

  return person;
}

// 위 방법보다는 명시적으로 타입을 사용한다.
function createDemoPerson2(name: string) {
  const person: Person = {
    name,
    age: Math.floor(Math.random() * 95),
    // profession이 없어 에러가 난다.
  };

  return person;
}

// 두 코드는 명시, 단언을 사용했을 때의 코드다.
// 단언은 안전하지 않은 작동 가능성이있다. 때문에 단언으로 작성한 코드는 문제 파악에 더 용이할 수 있다.
// 예를 들어, API 같은 외부 기능에 의존하는 상황, 정확한 숫자 계산이 필요할때
const ppl: Person[] = await fetch("/api/people").then((res) => res.json());
const ppl2 = (await fetch("/api/people").then((res) => res.json())) as Person[];
