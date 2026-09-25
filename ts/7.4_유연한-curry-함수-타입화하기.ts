type Curried<Func> = Func extends (...args: infer Args) => infer Return
  ? // 첫 번째 인수 FirstArg
    Args extends [infer FirstArg, ...infer LeftArgs]
    ? LeftArgs extends []
      ? // 아래 코드 때문에 인자를 1개만 받을 수 있는 함수 타입이 된다.
        (a: FirstArg) => Return
      : (a: FirstArg) => Curried<(...args: LeftArgs) => Return>
    : //   인수가 없을 경우.
      () => Return
  : never;

function curry<F extends Function>(fn: F): Curried<F> {
  let curried: Function = (...args: any) => {
    // fn.length는 함수를 정의했을때의 매개변수 개수
    if (fn.length !== args.length) {
      // curried 함수에 현재까지 모인 인자(...args)들을 미리 채워 넣은 '새로운 복사본 함수'를 반환
      return curried.bind(null, ...args);
    }

    return fn(...args);
  };

  return curried as Curried<F>;
}

function addThree(a: number, b: number, c: number) {
  return a + b + c;
}

const adder = curry(addThree);
const add7 = adder(5, 2); // 에러

// 이전에는 헬퍼 타입에서 함수 인수와 반환 타입을 추론했다.
// 이제 타입을 여러 번 호출하는 동안 반환값을 전달해야 하므로 직접 반환 타입과 인수를 추출한다.

type Overloads<RestArgs extends any[]> = RestArgs extends [
  infer First,
  ...infer Rest,
]
  ? [] | [First] | [First, ...Overloads<Rest>]
  : [];

// 빈 튜플부터 모든 인수를 포함할때까지 타입을 표현한다.
type Overload = Overloads<[string, number, string]>;

// 이미 서술한 인수를 나머지 인자에서 제거해야 한다.
// any는 빈 배열도 가능하지만, U는 요소 1개 이상의 배열이다.
type Remove<Target extends any[], ToRemove extends any[]> = ToRemove extends [
  infer _,
  ...infer RestToRemove,
]
  ? Target extends [infer _, ...infer RestTarget]
    ? Remove<RestTarget, RestToRemove>
    : never
  : Target;

// U의 길이만큼 T 앞에서 잘라낸다
type A = Remove<[string, number, boolean], [string]>;
// A = [number, boolean]

type Curried2<Args extends any[], Return extends any> = Args extends [
  infer FirstArg,
  ...infer RestArgs,
]
  ? <Provided extends Overloads<RestArgs>>(
      arg: FirstArg,
      ...args: Provided
    ) => Curried2<Remove<RestArgs, Provided>, Return>
  : Return;

function curry2<Args extends any[], Return extends any>(
  fn: (...args: Args) => Return,
): Curried2<Args, Return> {
  let curried: Function = (...args: any) => {
    // fn.length는 함수를 정의했을때의 매개변수 개수
    if (fn.length !== args.length) {
      // curried 함수에 현재까지 모인 인자(...args)들을 미리 채워 넣은 '새로운 복사본 함수'를 반환
      return curried.bind(null, ...args);
    }

    return fn(...args);
  };

  return curried as Curried2<Args, Return>;
}

const adder2 = curry2(addThree);
const add8 = adder2(5, 3); // 에러
