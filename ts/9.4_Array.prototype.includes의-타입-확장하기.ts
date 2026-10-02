const actions = ["CREATE", "READ", "UPDATE", "DELETE"] as const;

// actions는 string[] 타입이므로 as const로 튜플 타입으로 설정한다.
// 하지만 에러가 난다.
// Array<T>와 ReadOnlyArray<T>를 확인하면 요소는 배열의 타입과 같아야한다.
// 타입스크립트에는 상한 제네릭과 같이 반변 타입을 검사하는 기능이 없다(무슨 말이지?)
function execute(action: string) {
  if (actions.includes(action)) {
  }
}

// 방법 1. ReadonlyArray 재선언
declare global {
  interface ReadonlyArray<T> {
    includes(searchElement: any, fromIndex?: number): searchElement is T;
  }
}

// number로 바꾸면 number 타입을 찾을 수 없으므로 오류가난다.(책에는 난다는데 나는 안난다. 이유가 뭐지?)
// searchElement는 any이므로 검사 과정이 무력화된다.
// 그리고 내장 타입으 동작을 바꿨으므로 다른 곳에서 문제가 발생할 수 있다.()
function execute2(action: number) {
  if (actions.includes(action)) {
  }
}

// 표준 라이브러리에서 동작을 바꿔 타입 패치를 수행할 때는 전역이 아닌 모듈 범위로 지정해야한다.

// 방법 2. 타입 단언을 이용한 헬퍼
// 타입스크립트에는 어떤 값이 제네릭 매개변수의 상위 집합에 속하는지 확인하는 기능이 없다.(무슨 말?)
// 헬퍼 함수를 이용해 이 관계를 바꿀 수 있따.
function includes<T extends U, U>(coll: ReadonlyArray<T>, el: U): el is T {
  return coll.includes(el as T);
}

// 기존의 문제는 여전히 존재한다는데 무슨 문제지?
function execute3(action: string) {
  // action의 타입을 number로 바꾸면 에러가난다.
  if (includes(actions, action)) {
  }
}

// 결국 타입스크립트는 우리가 찾는 요소가 아니라 배열을 바꾸도록 권장한다. 이는 제네릭 타입 매개변수 간의 관계 때문이다.(무슨 말?)
// 이 예시는 Array.prototype.indexOf에서 발생하는 문제에도 적용가능하다.
