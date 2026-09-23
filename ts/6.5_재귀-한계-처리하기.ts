// 문자열의 처음과 끝의 공백을 제거하는 타입
type Trim<T extends string> = T extends ` ${infer X}`
  ? Trim<X>
  : T extends `${infer X} `
    ? Trim<X>
    : T;

type Trimmed = Trim<"          Key                ">; // key

// 임의의 문자열에서 공백이나 유효하지 않은 문자를 제거하려한다.
type RemoveWhiteSpace<T extends string> = T extends `${infer A} ${infer B}`
  ? RemoveWhiteSpace<`${Uncapitalize<A>}${Capitalize<B>}`>
  : T;
type Identifier = RemoveWhiteSpace<"Hello World!!">; // 'helloWorld!'

type StringSplit<T extends string> = T extends `${infer Char}${infer Rest}`
  ? Capitalize<Char> | Uncapitalize<Char> | StringSplit<Rest>
  : never;

type Chars = StringSplit<"abcdefghijklmnopqrstuvwxyz">;

// 너무 깊은 반복이 일어날 수 있다는 경고를 한다.
type CreateIdentifier<T extends string> =
  RemoveWhiteSpace<T> extends `${infer A extends Chars}${infer Rest}`
    ? `${A}${CreateIdentifier<Rest>}`
    : RemoveWhiteSpace<T> extends `${infer A}${infer Rest}`
      ? CreateIdentifier<Rest>
      : T;

// 꼬리 호출 최적화를 활성화하려면 누적자(acc) 기법을 사용한다(재귀 호출 독립적으로 발생)
type CreateIdentifier2<T extends string, Acc extends string = ""> =
  RemoveWhiteSpace<T> extends `${infer A extends Chars}${infer Rest}`
    ? CreateIdentifier2<Rest, `${Acc}${A}`>
    : RemoveWhiteSpace<T> extends `${infer A}${infer Rest}`
      ? CreateIdentifier2<Rest, Acc>
      : Acc;

type Identifier2 = CreateIdentifier2<"Hello World!">;
