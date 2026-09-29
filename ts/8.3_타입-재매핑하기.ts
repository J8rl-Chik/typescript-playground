type Person = {
  name: string;
  age: number;
  profession: string;
};

type OnlyRequired<T, K extends keyof T = keyof T> = Remap<
  Required<Pick<T, K>> & Partial<Omit<T, K>>
>;

// 편집기 힌트는 복합 타입을 너무 얕게 확장한다. 그래서 결과를 이해하기 어렵다.
// 현재 아래 코드에는 구체적인 타입이 보인다.
type NameRequired = OnlyRequired<Person, "name">;

// 모든 프로퍼티를 반복하며 정의된 값으로 매핑하는 타입
type Remap<T> = {
  [K in keyof T]: T[K];
};

type NameRequired2 = Remap<OnlyRequired<Person, "name">>;

type Subtitle = {
  active: boolean;
  color: string;
};

type Settings = {
  mode: "light" | "dark";
  playbackSpeed: number;
  subtitle: Subtitle;
};

// 중첩된 객체 타입은 매핑이안된다.
type RemapSettings = Remap<Settings>;

type DeepRemap<T> = T extends object
  ? {
      [K in keyof T]: DeepRemap<T[K]>;
    }
  : T;

// 재귀 타입을 통해 내부 객체의 타입도 표현가능하다.
type SettingsRemapped = DeepRemap<Settings>;
