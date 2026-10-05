type Person = {
  name: string;
  age: number;
  profession?: string;
};

type PersonName = Pick<Person, "name">;

// 이름이 아니라 타입에 따라 올바른 프로퍼티를 선택하고 싶다.
// 이 헬퍼 타입은 원하는 타입을 가리키는 프로퍼티명 집합(동적으로 생산)을 맹피한다.
// 유니온 타입에 조건부 타입을 사용할 때 never를 이용해 요소를 유니온에서 거를 수 있다.
type PersonStrings = {
  [K in keyof Person]: Person[K] extends string ? Person[K] : never;
};
// 하지만 검사하는 타입이 유니온 소속이 아니라 never를 가리키는 프로퍼티가 된다.

// Person[K] 집합의 K 부분이 string 타입인지 단언으로 확인한다.
// 유니온 타입중 K(특정 타입)를 지정하고 Person[K]가 string인지 조건부로 K를 반환한다. 유니온 타입의 나머지 타입들에도 적용된다.
type PersonStrings2 = {
  [K in keyof Person as Person[K] extends string ? K : never]: Person[K];
};

// undefined도 가능한 값에 포함된돼서 아래 코드가 나왔는데 무슨 말이지? profession? 같은 타입 얘기인듯.
type PersonStrings3 = {
  [K in keyof Person as Person[K] extends string | undefined
    ? K
    : never]: Person[K];
};

type Select<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? K : never]: O[K];
};

// 특정 타입의 프로퍼티를 선택할 수 있다.
type PersonStrings4 = Select<Person, string>;
type PersonNumbers = Select<Person, number>;

// 문자열 프로토타입에서 어떤 함수가 숫자를 반환하는지 알아낼 수도 있다.
type StringFnsReturningNumber = Select<String, (...args: any[]) => number>;

// Select와 반대로 동작하는 헬퍼 타입.
type Remove<O, T> = {
  [K in keyof O as O[K] extends T | undefined ? never : K]: O[K];
};

type PersonWithoutStrings = Remove<Person, string>;

type User = {
  name: string;
  age: number;
  profession?: string;
  posts(): string[];
  greeting(): string;
};

// 객체 타입의 직렬화 버전을 만들 때 유용하다. 직렬화 버전이 뭐지? 메서드를 없애는건가?
type SerializeableUser = Remove<User, Function>;
