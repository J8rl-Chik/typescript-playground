type AllElements = {
  a: HTMLAnchorElement;
  div: HTMLDivElement;
  span: HTMLSpanElement;
  p: HTMLParagraphElement;
};

type AandDiv = AllElements["a" | "div"];

// 이를 이용해 createElement 함수를 구현할 수 있다.
function createElement<K extends keyof AllElements>(
  tagName: K,
): AllElements[K] {
  return document.createElement(tagName);
}

const a = createElement("a"); // HTMLAnchorElement

// HTML요소와 관련한 추가 프로퍼티를 전달하는 함수.
function createElment2<T extends keyof AllElements>(
  tag: T,
  props?: Partial<AllElements[T]>,
) {
  const elem = document.createElement(tag);

  return Object.assign(elem, props);
}

const a2 = createElment2("a", { href: "https://fettblog.eu" });
const x = createElment2("a", { src: "https://fettblog.eu" }); // 에러

// 커스텀 요소가 필요하다면? 인터페이스를 정의하면 기존 인터페이스에 해당 프로퍼티가 추가된다
// 책에서는 예시로 나왔지만 현재 안된다.
declare global {
  interface HTMLElementTagNameMap {
    [x: string]: HTMLUnknownElement;
  }
}

// HTMLElementTagNameMap는 기본 제공 타입이다.
function createElement3<T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props?: Partial<HTMLElementTagNameMap[T]>,
): HTMLElementTagNameMap[T] {
  const elem = document.createElement(tag);

  return Object.assign(elem, props);
}

const a3 = createElement3("a", { href: "https://fettblog.eu" });
const b = createElement3("my-element");

// 태그명에 대시를 포함하는 웹 컴포넌트는 어떻게 할까?
// 문자열 템플릿 리터럴 타입에 매핑된 타입을 사용해 볼 수 있다.
type AllElements2 = HTMLElementTagNameMap & {
  [x in `${string}-${string}`]: HTMLElement;
};

function createElment4<T extends keyof AllElements2>(
  tag: T,
  props?: Partial<AllElements2[T]>,
): AllElements2[T] {
  const elem = document.createElement(tag) as AllElements2[T];

  return Object.assign(elem, props);
}

const a4 = createElment4("a", { href: "https://fettblog.eu" }); // 안되네. 뭐지?
const b2 = createElment4("my-element");
const c = createElment4("thisWillError");

// 어서션을 없애고 싶다면 함수 오버로드를 사용할 수 있다.
function createElment5<T extends keyof AllElements2>(
  tag: T,
  props?: Partial<AllElements2[T]>,
): AllElements2[T];

function createElment5(tag: string, props?: Partial<HTMLElement>): HTMLElement {
  const elem = document.createElement(tag);

  return Object.assign(elem, props);
}

const b3 = createElment5("myelement");
