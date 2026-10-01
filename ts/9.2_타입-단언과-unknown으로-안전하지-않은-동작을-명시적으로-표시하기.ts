type Person = {
  name: string;
  age: number;
};

// res.json은 any를 반환해서 타입 단언을 사용해 모든 타입으로 바꿀 수 있다. 그래서 결과과 Person[]이라는 보장이 없다
const ppl: Person[] = (await fetch("/api/people").then((res) =>
  res.json(),
)) as Person[];

// 타입 단언은 안전하지 않을 수 있다.
// 타입 시스템 내에서 이 단언이 실제로 참이라고 보장할 수 없기 떄문이다.
// 주로 애플리케이션의 경계에서 발생한다.
// 외부에서 데이터 로드, 사용자 입력 처리, 내장 메서드로 데이터 파싱 등

// json은any를 반환해 타입 검사를 무려화한다.
// 그래서 unknown을 사용할 수 있다.

// 선언 합치기
declare global {
  interface Body {
    json(): Promise<unknown>;
  }
}

// 타입을 명시하면 unknown 에러가 일어나 단언을 추가해야한다.
const ppl2: Person[] = (await fetch("/api/people").then((res) =>
  res.json(),
)) as Person[];
