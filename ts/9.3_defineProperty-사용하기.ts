const storage = {
  currentValue: 0,
};

Object.defineProperty(storage, "maxValue", {
  value: 9001,
  writable: false,
});

// maxValue가 없다고 에러가 난다.
console.log(storage.maxValue);

function assertIsNumber(val: any) {
  if (typeof val !== "number") {
    throw new Error("Not a number!");
  }
}

function multiply(x: any, y: any): number {
  assertIsNumber(x);
  assertIsNumber(y);

  //   여전히 any 타입이다.
  // 반환 타입이 number여도 any * any는 어떤 타입에도 대입 가능해서 에러가 안난다.
  return x * y;
}

// asserts를 사용하지 않으면 boolean 타입을 반환해야한다.
// 아래 예시처럼 즉석에서 매개변수의 타입을 바꿀 수 있다.
function assertIsNumber2(val: any): asserts val is number {
  if (typeof val !== "number") {
    throw new Error("Not a number!");
  }
}

function multiply2(x: any, y: any): number {
  assertIsNumber2(x);
  assertIsNumber2(y);
  //   여기서부터 x, y는 number 타입으로 추론된다.

  return x * y;
}

function defineProperty<
  Obj extends object,
  Key extends PropertyKey, // string | number | symbol 타입
  PDesc extends PropertyDescriptor, // 쓰기, 열거, 재설정을 포함하는 프로퍼티 정의
>(
  obj: Obj,
  prop: Key,
  val: PDesc,
): asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor,
  //   writable과 프로퍼티 접근자(get, set)를 설정하면 실패한다.
> = Desc extends { writable: any; set(val: any): any }
  ? never
  : Desc extends { writable: any; get(): any }
    ? never
    : // writable을 false로 설정하면 프로퍼티는 읽기 전용이된다.
      Desc extends { writable: false }
      ? Readonly<InferValue<Prop, Desc>>
      : // writable을 true로 설정하면 읽기 전용이 아니다
        Desc extends { writable: true }
        ? Readonly<InferValue<Prop, Desc>>
        : // writable을 설정하지 않으면 기본값은 false다.
          Readonly<InferValue<Prop, Desc>>;

type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  // 게터와 값 집합을 포함하는가? Object.defineProperty는 오류를 던진다(왜?)
  get(): any;
  value: any;
}
  ? never
  : Desc extends { value: infer T }
    ? //   값을 설정했다면 추론하고  키-값 객체를 만든다.
      Record<Prop, T>
    : // 게터의 반환 타입에서 타입을 추론한다.
      Desc extends { get(): infer T }
      ? Record<Prop, T>
      : never;

defineProperty(storage, "maxValue", {
  writable: false,
  value: 9001,
});

storage.maxValue;
storage.maxValue = 2; // 오류

const storageName = "My Storage";

defineProperty(storage, "name", {
  get() {
    return storageName;
  },
});

storage.name;

// 값과 게터를 설정할 수 없음
defineProperty(storage, "broken", {
  get() {
    return storageName;
  },
  value: 4000,
});

storage; // never 타입. 왜 never지?
