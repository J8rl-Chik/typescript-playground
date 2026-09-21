// 리터럴 타입으로 고정할 수 있도록 제네릭 타입 T를 사용한다.
function format<T extends string>(
  fmString: T,
  params: Record<string, any>,
): string {
  throw "unimplemented";
}

/* 
포맷 문자열이 중괄호와 호환되는지 검사한다.
문자열로 시작한다. 빈 문자열일 수 있다.
*/
type FormatKeys<T extends string> = T extends `${string}{${string}}${string}`
  ? T
  : never;

// 1개의 플레이스 홀더가 있는지 확인한다.
type A = FormatKeys<"Hello, {world}">; // "Hello {world}"
type B = FormatKeys<"Hello">; // never

// infer 키워드를 이용해 중괄호 사이에 등장하는 리터럴 타입을 타입 변수로 추가할 수 있다.
type FormatKeys2<T extends string> =
  T extends `${string}{${infer Key}}${string}` ? Key : never;

type A2 = FormatKeys2<"Hello, {world}">; // "world"
type B2 = FormatKeys2<"Hello">; // never

// 여러 플레이스 홀더가 존재할 때는 재귀 조건부 타입을 활용한다.
type FormatKeys3<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | FormatKeys3<Rest>
    : never;

type A3 = FormatKeys3<"Hello {world}">; // "world"
type B3 = FormatKeys3<"Hello {world}. I', {you}.">; // "world" | "you"
type C = FormatKeys3<"Hello">; // never

function format2<T extends string>(
  fmString: T,
  params: Record<FormatKeys3<T>, any>,
): string {
  let ret: string = fmString;

  for (let k in params) {
    ret = ret.replaceAll(`{${k}`, params[k as keyof typeof params]);
    // 왜 그냥 k는 안돼서 k as keyof typeof params라고 해야하지? 아래 코드에 단언이 필요없는건 extends 때문인가?
  }

  return ret;
}

// 단언 제거
function format3<T extends string, K extends Record<FormatKeys3<T>, any>>(
  fmString: T,
  params: K,
): string {
  let ret: string = fmString;

  for (let k in params) {
    ret = ret.replaceAll(`{${k}`, params[k]);
  }

  return ret;
}
