// 가변 튜플 타입은 프로퍼티는 같지만(정해진 길이, 알려진 요소 타입) 정확한 모양은 정해지지 않은 튜플이다(무슨 말이야?)
// 타입과 길이를 아직 모르는 상황이므로 제네릭에는 가변 튜플 타입만 사용할 수 있다.
type Foo<T extends unknown[]> = [string, ...T, number];

type T1 = Foo<[boolean]>;
type T2 = Foo<[number, number]>;
type T3 = Foo<[]>;

// 나머지 요소와 비슷하지만 여러번 등장할 수 있다.
type Bar<T extends unknown[], U extends unknown[]> = [...T, string, ...U];

type T4 = Bar<[boolean], [number]>;
type T5 = Bar<[number, number], [boolean]>;
type T6 = Bar<[], []>;

function concat<T extends unknown[], U extends unknown[]>(
  arr1: T,
  arr2: U,
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const test = concat([1, 2, 3], [6, 7, "a"]); // (string | number)[]

// 정확히 알려면 제네릭 배열 타입을 튜플 타입으로 펼쳐야한다.
function concat2<T extends unknown[], U extends unknown[]>(
  arr1: [...T],
  arr2: [...U],
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const test2 = concat2([1, 2, 3], [6, 7, "a"]);

// 요소를 알 수 없는 배열을 전달했을 떄도 배열 타입을 얻는다.
declare const a: string[];
declare const b: number[];

const test3 = concat2(a, b);
