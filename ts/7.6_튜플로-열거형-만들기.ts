// 튜플을 이용해 객체를 만든다. 첫 글자는 대문자로 만든다.
// 프로퍼티의 키 값은 문자나 숫자로 설정한다. 숫자는 0에서 시작하며 1씩 증가한다.

// 객체 키를 만들 때 매핑할 수 있는 유니온 타입이 피룡하다.
// 모든 객체 키를 얻으려면 튜플을 유니온 타입으로 변환해야 한다.
type TupleToUnion<T extends readonly string[]> = T extends readonly [
  ...infer Rest extends string[],
  infer Key extends string,
]
  ? { key: Key; val: Rest["length"] } | TupleToUnion<Rest>
  : never;

type Enum<T extends readonly string[], N extends boolean = false> = Readonly<{
  [K in TupleToUnion<T> as Capitalize<K["key"]>]: N extends true
    ? K["val"]
    : K["key"];
}>;

type Direction = ["up", "down", "left", "right"];

type DirectionUnion = TupleToUnion<Direction>;

type DirectionLength = Direction["length"];

type Values<T> = T[keyof T];

const commandItems = ["echo", "grep", "sed", "awk", "cut", "uniq"] as const;

function capitalize(x: string): string {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

function createEnum<T extends readonly string[], B extends boolean>(
  arr: T,
  numeric?: B,
) {
  let obj: any = {};

  for (let [i, el] of arr.entries()) {
    obj[capitalize(el)] = numeric ? i : el;
  }

  return obj as Enum<T, B>;
}

const Command = createEnum(commandItems); // string 열거형
const CommandN = createEnum(commandItems, true); // number 열거형

type Command2 = Values<typeof Command>;

console.log(Command);
console.log(CommandN);
