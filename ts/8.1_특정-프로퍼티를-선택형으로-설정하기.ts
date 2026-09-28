type Person = {
  name: string;
  age: number;
  profession: string;
};

// Partial과 달리 하위 집합 키만 매핑한다
type SelectPartial<T, K extends keyof T> = {
  [P in K]?: T[P];
};

type Age = SelectPartial<Person, "age">;

// SelectPartial의 결과와 나머지 키를 포함하는 타입의 인터섹션을 취한다.
type ExcludeAge = Exclude<"name" | "age", "age">;

type SetOptional<T, K extends keyof T> = {
  [P in K]?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};

type OptionalAge = SetOptional<Person, "age">;
type OptionalAgeAndProf = SetOptional<Person, "age" | "profession">;

// 내장 헬퍼 타입만으로도 구현할 수 있다.
// 하지만 실제 프로퍼티가 무엇인지 알 수 없고, 어떻게 만들어졌는지를 보여준다.
type SetOptional2<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
type OptionalAge2 = SetOptional2<Person, "age">;

type Remap<T> = {
  [K in keyof T]: T[K];
};

// 두 번재 타입 매개변수에 기본값을 주어 필요한 프로퍼티만 선택할 수 있다.(무슨 차이지?)
type SetOptional3<T, K extends keyof T = keyof T> = Remap<
  Partial<Pick<T, K>> & Omit<T, K>
>;

// 일부 키가 꼭 필요한 상황이라면 아래같은 타입을 정의할 수 있다.
type SetRequired<T, K extends keyof T = keyof T> = Remap<
  Required<Pick<T, K>> & Omit<T, K>
>;

// 제공한 모든 키를 요구하고 나머지를 선택형으로 만드는 OnlyRequired라는 타입도 가능하다.
type OnlyRequired<T, K extends keyof T = keyof T> = Remap<
  Required<Pick<T, K>> & Partial<Omit<T, K>>
>;
