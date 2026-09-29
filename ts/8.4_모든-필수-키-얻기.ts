type Name = {
  name: string;
};

// Required는 모든 프로퍼티를 필수로 변경한다.
type Test = Name extends Required<Name> ? true : false;

type Person = {
  name: string;
  age?: number;
};

// Required는 선택형 프로퍼티 age를 필수로 요구한다.
type Test2 = Person extends Required<Person> ? true : false;

// Required<Person>은 Person 보다 범위가 좁다.
type Test3 = Required<Person> extends Person ? true : false;

// 필수 프로퍼티키만을 포함하는 객체를 얻고 싶다.
// 우선 반복 수행을 위해 맵드 타입을 이용한다.

// undefined가 없는 값 타입에만 하위 집합 검사를 수행하므로 각 프로퍼티는 true로 설정된다.(무슨 말?)
// 결과적으로 제대로 작동하지 않는다.
type RequiredPerson = {
  [K in keyof Person]: Person[K] extends Required<Person[K]> ? true : false;
};

// Person[K]에 null 가능한 값이 포함되었는지 확인하는 것이 좋다.
// 하지만 프로퍼티 변경자 때문에 undefined가 다시 추가되었다. 그리고 age가 아직 남아있다.
// 왜 undefined가 추가된거지?
type RequiredPerson2 = {
  [K in keyof Person]: Person[K] extends NonNullable<Person[K]> ? true : false;
};

// 가능한 키 집합을 줄여야 한다.
// 키를 매핑하면서 값을 검사하는 대신 각 프로퍼티에 조건부 검사를 수행한다.
// Person[K]이 Required<Person>[K]의 하위 집합인지 검사한다.
// 어떻게 age를 지웠지?
type RequiredPerson3 = {
  [K in keyof Person as Person[K] extends Required<Person>[K]
    ? K
    : never]: Person[K];
};

// 제네릭 타입
type GetRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

// 모든 필수 프로퍼티 키를 얻기 위한 타입
type RequiredKeys<T> = keyof GetRequired<T>;

// Omit을 이용해 대상 객체에서 제거한다.
type GetOptional<T> = Omit<T, RequiredKeys<T>>;
