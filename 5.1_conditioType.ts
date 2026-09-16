type StringLabel = {
  name: string;
};

type NumberLabel = {
  id: number;
};

// 각 오버로드는 사용 방식에 따라 타입을 정의. 마지막에 함수 본문 구현.
function createLabel(input: number): NumberLabel;
function createLabel(input: string): StringLabel;
function createLabel(input: number | string): NumberLabel | StringLabel {
  if (typeof input === "number") {
    return { id: input };
  } else {
    return { name: input };
  }
}

// 하지만 입력 타입을 좁힐 수 없는 상황이라면 문제가 발생한다(왜 에러가 나지?)
// 함수는 number 또는 string일 수 있는 입력을 허용하지 않는다.
// function createLabel(input: number | string): NumberLabel | StringLabel;를 추가해야한다.
function inputToLabel(input: number | string) {
  return createLabel(input);
}

// 다양성을 지원할수록 더 복잡한 함수 시그니처가 필요하다.
// 이런 상황에서는 조건부 타입을 활용해 볼 수 있다.
// 서브 타입 검사 결과에 따라 타입을 선택할 수 있따.
type IsString<T> = T extends string ? T : never;

type A = IsString<string>;
type B = IsString<"hello" | "world">;
type C = IsString<1000>;

// 입력 문자열, StringLabel, NumberLabel이 else 분기에 있는지만 확인
type GetLabel<T> = T extends string | StringLabel ? StringLabel : NumberLabel;

// 중첩할 수 있다.
type GetLabel2<T> = T extends string | StringLabel
  ? StringLabel
  : T extends number | NumberLabel
    ? NumberLabel
    : never;

// 조건부 타입 활용. 하지만 제네릭 및 조건부 타입을 사용할때는 흐름 제어 분석을 할 수 없다. 반환 타입과 관련해 타입 확인 작업이 조금 더 필요할 수 있음.
function createLabel2<T extends number | string | StringLabel | NumberLabel>(
  input: T,
): GetLabel2<T> {
  if (typeof input === "number") {
    return { id: input } as GetLabel2<T>;
  } else if (typeof input === "string") {
    return { name: input } as GetLabel2<T>;
  } else if ("id" in input) {
    return { id: input.id } as GetLabel2<T>;
  } else {
    return { name: input.name } as GetLabel2<T>;
  }
}

// 조건부 타입을 가진 함수 시그니처를 오버로드하는 방법도 있다. 입력에 따라 반환 타입을 알 수 있다.
// 구현 측면에서도 넓은 타입 집합을 활용하 유연성을 얻는다.(뭔 말?)
function createLabel3(input: number): NumberLabel;
function createLabel3(input: string): StringLabel;
function createLabel3<T extends number | string | StringLabel | NumberLabel>(
  input: T,
): GetLabel2<T>;
function createLabel3(
  input: number | string | StringLabel | NumberLabel,
): NumberLabel | StringLabel {
  if (typeof input === "number") {
    return { id: input };
  } else if (typeof input === "string") {
    return { name: input };
  } else if ("id" in input) {
    return { id: input.id };
  } else {
    return { name: input.name };
  }
}
