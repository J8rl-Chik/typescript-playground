let person = {
  name: "Stefan",
  age: 30,
};

type Person = typeof person;

let anotherPerson: Person = {
  name: "not Stefan",
  age: 20,
};

// 왜 에러 나지?
// 모든 Person에서는 string & number이며 중복이 없으므로 never다.(무슨 말이지?)
function update(key: keyof Person) {
  person[key] = anotherPerson[key];
}

function updateAmbiguous(key: keyof Person, value: Person[keyof Person]) {}

// 거짓 타입값 추가를 막을 수 없다.
updateAmbiguous("age", "Stefan");

type Switch = {
  address: number;
  on: 0 | 1;
};

declare const switcher: Switch;
declare const key: keyof Switch;

switcher[key] = 1;
switcher[key] = 2; // 에러

// 타입스크립트는 모든 프로퍼티 타입의 인터섹션을 수행하여 할당할 수 있는 값을 얻는다.
// Switch에서는 number & (0 | 1)이며 0 | 1로 요약된다.

// 제네릭을 사용해 이런 엄격한 검사를 피할 수 있다.
// 모든 keyof Person 값 접근을 허용하는 대신, keyof Person의 특정 하위 집합을 제네릭 변수에 바인딩한다.
function update2<K extends keyof Person>(key: K) {
  person[key] = anotherPerson[key];
}

update2("age");

update2<"age" | "name">("age");

// 오른쪽에서 일어나는 기존의 인덱스 할당은 오류를 일으킬 가능성이 아주 높으므로 사용자가 의도적으로 원하는 작업을 수행할 때까지 충분한 안전장치를 제공한다. 무슨 말?
