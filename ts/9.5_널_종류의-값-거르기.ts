// 떄로 배열에 널 종류의 값을 포함한다.
const array = [1, 2, 3, undefined, 4, null];

// filter해도 타입에는 null과 undefined를 포함한다.
const filtered = array.filter((val) => !!val);

declare global {
  interface Array<T> {
    filter(predicate: BooleanConstructor): NonNullable<T>[];
  }

  interface ReadonlyArray<T> {
    filter(predicate: BooleanConstructor): NonNullable<T>[];
  }
}

// 오버로드로 널 종류의 타입을 제거할 수 있다.
// BooleanConstructor는 falsy한 값도 거른다.
const filtered2 = array.filter(Boolean);

type Truthy<T> = T extends "" | false | 0 | 0n ? never : T;

declare global {
  interface Array<T> {
    filter(predicate: BooleanConstructor): Truthy<NonNullable<T>>[];
  }

  interface ReadonlyArray<T> {
    filter(predicate: BooleanConstructor): Truthy<NonNullable<T>>[];
  }
}

const array2 = [0, 1, 2, 3, "", -0, 0n, false, undefined, null] as const;

const filtered3 = array.filter(Boolean);

const nullOrONe: Array<0 | 1> = [0, 1, 0, 1];

const onlyOnes = nullOrONe.filter(Boolean);
