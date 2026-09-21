// 플레이스 홀더에 특정 타입 집합을 정의하는 기능을 추가하려 한다.
// 타입은 섵개형이어야 하며, 플레이스 홀더명 뒤에는 콜론을 붙여야 하고 자바스크립트 기본 타입 중 하나여야한다.
// 여러 플레이스 홀더가 존재할 때는 재귀 조건부 타입을 활용한다.

type FormatKeys<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key | FormatKeys<Rest>
    : never;

function format<T extends string>(
  fmString: T,
  params: Record<FormatKeys<T>, any>,
): string {
  let ret: string = fmString;

  for (let k in params) {
    ret = ret.replaceAll(`{${k}`, params[k as keyof typeof params]);
  }

  return ret;
}

/* 
1. params 타입을 Reconrd<FormatKeys<T>, any>에서 각 프로퍼티와 관련된 타입을 포함하는 실제 객체 타입으로 바꾼다.
2. 자바스크립트 기본 타입을 추출할 수 있도록 FormatKeys 내에서 문자열 템플릿 리터럴 타입을 적용한다.
*/

// 같은 키를 새 객체 타입으로 매핑한다.
// 인터섹션 타입을 이요해 재귀로 연결하고 never에서 {}로 바꾼다.
// never와 인터섹션하면 결과 타입이 never가 되기 떄문이다.
type FormatObj<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? { [K in Key]: any } & FormatObj<Rest>
    : {};

// 콜론 분리자를 찾도록 파싱 조건을 바꾼다.
type FormatObj2<T extends string> =
  T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
    ? { [K in Key]: Type } & FormatObj2<Rest>
    : {};

// 추출한 타입은 리터럴 문자열("number")이기 때문에, 실제 타입으로 변환해야한다.
type MapFormatType = {
  string: string;
  number: number;
  boolean: boolean;
  [x: string]: any;
};

type A = MapFormatType["string"];
type B = MapFormatType["number"];
type C = MapFormatType["boolean"];

type FormatObj3<T extends string> =
  T extends `${string}{${infer Key}:${infer Type}}${infer Rest}`
    ? { [K in Key]: MapFormatType[Type] } & FormatObj3<Rest>
    : {};

// : 분리자를 명시적으로 요구하므로 타입을 정의하지 않는 모든 플레이스 홀더는 프로퍼티를 만들어내지 않는다.
// 플레이스 홀더를 검사한 이후에 타입을 검사하면 이 문제를 해결할 수 있다.
type FormatObj4<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key extends `${infer KeyPart}:${infer TypePart}`
      ? { [K in KeyPart]: MapFormatType[TypePart] } & FormatObj4<Rest>
      : { [K in Key]: any } & FormatObj4<Rest>
    : {};

/* 
1. 플레이스 홀더가 있는지 검사한다.
2. 타입 애너테이션이 있는지 검사한다. 있으면 키를 포맷 타입으로 매핑하고 없으면 원래 키를 any로 매핑한다.
*/

// 안전장치를 추가할 수 있다. toString()을 구현하도록해 문자열을 얻을 수 있도록 한다.(이게 왜 안전장치지?)
type FormatObj5<T extends string> =
  T extends `${string}{${infer Key}}${infer Rest}`
    ? Key extends `${infer KeyPart}:${infer TypePart}`
      ? { [K in KeyPart]: MapFormatType[TypePart] } & FormatObj5<Rest>
      : { [K in Key]: { toString(): string } } & FormatObj5<Rest>
    : {};

// 정규 표현식을 이용해 이름을 가능한 타입 애너테이션으로 치환한다.
function format2<T extends string, K extends FormatObj5<T>>(
  fmString: T,
  params: K,
): string {
  let ret: string = fmString;

  for (let k in params) {
    let val = `${params[k]}`;
    let searchPattern = new RegExp(`{${k}:?.*?}`, "g");
    ret = ret.replaceAll(searchPattern, val);
  }

  return ret;
}
