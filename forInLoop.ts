type Person = {
  name: string;
  age: number;
};

function printPerson1(person: Person) {
  for (let key in person) {
    // key 타입이 string이어서 에러
    console.log(`${key}: ${person[key]}`);
  }
}

function printPerson2(person: any) {
  for (let key in person) {
    // any 타입으로 임시 조치 가능
    console.log(`${key}: ${person[key]}`);
  }
}

function printPerson3(person: Person) {
  for (let key in person) {
    // 작동 확인 후 타입 단언으로 수정
    console.log(`${key}: ${person[key as keyof Person]}`);
  }
}
