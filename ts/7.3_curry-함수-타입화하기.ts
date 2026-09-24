// 커링은 ‘함수 인수 중 일부만 적용한다’는 개념을 활용한다.
type Curried<Func> = Func extends (...args: infer Args) => infer Return
  ? // 첫 번째 인수 FirstArg
    Args extends [infer FirstArg, ...infer LeftArgs]
    ? LeftArgs extends []
      ? (a: FirstArg) => Return
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
