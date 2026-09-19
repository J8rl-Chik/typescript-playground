type Person = {
  name: string;
  age: number;
  hello: () => string;
};

// serliaze에 제네릭 타입 매개변수를 추가했다.
// 덕분에 다른 객체 타입에 serialize를 재활용할 수 있다.(뭔 말?)
class Serializer {
  constructor() {}

  serialize<T>(obj: T): Serialize<T> {}
}

type Remove<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
};

type Serialize<T> = Remove<T, Function>;

// 하지만 실제 객체는 더 복잡하다.
type Person2 = {
  name: string;
  age: number;
  profession: {
    title: string;
    level: number;
    printProfession: () => void;
  };
  hello: () => string;
};

type NestSerialization<T> = {
  [K in keyof T]: T[K] extends object ? Serialize2<T> : T[K];
};

// 재귀 타입을 만든다.
type Serialize2<T> = NestSerialization<Remove<T, Function>>;

class Serializer2 {
  constructor() {}

  serialize<T>(obj: T): Serialize2<T> {
    const ret: Record<string, any> = {};

    for (let k in obj) {
      if (typeof obj[k] === "object") {
        ret[k] = this.serialize(obj[k]);
      } else if (typeof obj[k] !== "function") {
        ret[k] = obj[k];
      }
    }

    // 반환 타입에 맞게 타입 조정.
    return ret as Serialize2<T>;
  }
}

const person: Person2 = {
  name: "Stefan",
  age: 40,
  profession: {
    title: "Software",
    level: 5,
    printProfession() {
      console.log(`${this.title}`);
    },
  },
  hello() {
    return `${this.name}`;
  },
};

const serilizer = new Serializer2();
const serializedPerson = serilizer.serialize(person);

console.log(serializedPerson);

// 객체는 serialize 메서드를 구현할 수 있으며, 이때 Serializer는 직렬화하는 객체 대신 이 메서드의 결과를 취한다.(뭔 말?)
// Person 타입이 serialize 메서드를 포함하도록 확장해보자.
type Person3 = {
  name: string;
  age: number;
  profession: {
    title: string;
    level: number;
    printProfession: () => void;
  };
  hello: () => string;
  serialize: () => string;
};

const person2: Person3 = {
  name: "Stefan",
  age: 40,
  profession: {
    title: "Software",
    level: 5,
    printProfession() {
      console.log(`${this.title}`);
    },
  },
  hello() {
    return `${this.name}`;
  },
  serialize() {
    return `${this.name}`;
  },
};

// Serialize<T>을 조금 바꿔야 한다. NestSerialization을 실행하기 전에 조건부 타입에서 객체가 serialize 메서드를 구현하는지(T가)
// serialize 메서드를 포함하는 하위 타입인지) 검사한다. 그렇다면 이는 직렬화 결과이므로 반환 타입을 얻는다. (뭔 소리야?)

// infer는 조건에서 타입을 받아 true 분기에서 타입 매개변수를 사용한다. 조건이 참이면
// 발견된 타입을 취해서 제공한다.
type Serialize3<T> = T extends { serialize(): infer R }
  ? R
  : NestSerialization<Remove<T, Function>>;

/* 처음에 R은 any라고 생각한다. any는 넓으며  any 위치의 특정 타입을 원한다.
infer 키워드는 정확한 타입을 선택할 수 있다. 따라서 Serialize3<T>를 다음 처럼 해석할 수 있따.
- T가 serialize 메서드를 포함하면 반환 타입을 반환한다.
- 그렇지 않으면 Function 타입의 모든 프로퍼티를 깊숙이 제거하며 직렬화한다.
*/

class Serializer3 {
  constructor() {}

  serialize<T>(obj: T): Serialize3<T> {
    if (
      typeof obj === "object" &&
      obj &&
      "serialize" in obj &&
      typeof obj.serialize === "function"
    ) {
      return obj.serialize();
    }

    const ret: Record<string, any> = {};

    for (let k in obj) {
      if (typeof obj[k] === "object") {
        ret[k] = this.serialize(obj[k]);
      } else if (typeof obj[k] !== "function") {
        ret[k] = obj[k];
      }
    }

    return ret as Serialize3<T>;
  }
}

// serialize라는 이름의 별도로 구현한 메서드를 가진 객체는 해당 객체의 메서드를 호출하는 경우를 말하는듯?
