type ElementList = {
  addClass: (className: string) => ElementList;
  removeClass: (className: string) => ElementList;
  on: (event: string, callback: (ev: Event) => void) => ElementList;
  length: number;
  [x: number]: HTMLElement;
};

declare const myCollection: ElementList;

// 요소에 직접 접근하는 동작은 안전하지 않다고 판단해, Proxy로 감싸기로 한다.
// 문자열이나 심볼 프로퍼티만 받는다. 숫자로 접근시 문자열로 변환한다.
const safeAccessCollection = new Proxy(myCollection, {
  get(target, property) {
    if (
      typeof property === "string" &&
      property in target &&
      "" + parseInt(property) !== property
    ) {
      return target[property as keyof typeof target];
    }

    return undefined;
  },
});

// 자바스크립트에서는 정상 동작이지만, 반환 타입이 ElementList이므로 숫자 인덱스 접근은 유지된다.
safeAccessCollection[1];
// 새 타입을 정의해서 숫자 인덱스 접근을 허용하지 않는 객체임을 알려야 한다.

type ElementListKeys = keyof ElementList;

// 분배 조건부 타입.
type JustString<T> = T extends string ? T : never;
// 유니온의 조건부 타입을 조건부 조건부 타입의 유니온으로 처리한다.
// never를 유니온에 사용하면 never가 사라진다.(가능한 값이 없는 집합을 값의 집합과 유니온으로 연결하면 값만 남는다는데 무슨 말?)
type JustElementListStrings = JustString<ElementListKeys>;

type SafeAccess = Pick<ElementList, JustString<keyof ElementList>>;

const safeAccessCollection2: SafeAccess = new Proxy(myCollection, {
  get(target, property) {
    if (
      typeof property === "string" &&
      property in target &&
      "" + parseInt(property) !== property
    ) {
      return target[property as keyof typeof target];
    }

    return undefined;
  },
});

safeAccessCollection2[1]; // 에러
