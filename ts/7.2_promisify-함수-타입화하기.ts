function loadfile(
  filename: string,
  encoding: string,
  callback: (result: File) => void,
);

function request(url: URL, callback: (result: JSON) => void) {}

// 콜백 패턴을 따르는 함수를 Promise로 바꿀 수 있다. 이 작업을 처리해줄 promisify 함수를 만들어본다.
function promisify(fn: unknown): Promise<unknown> {}

const loadFilePromise = promisify(loadfile);
const requestPromise = promisify(request);

// 가변 튜플 타입을 이용하면 함수 인자들의 타입을 정의할 수 있다.
declare function hello(name: string, msg: string): void;
declare function hello2(...args: [string, string]): void;

// 나머지 요소 활용(아래는 같음)
declare function h(a: string, b: string, c: string): void;
declare function h2(a: string, b: string, ...r: [string]): void;
declare function h3(a: string, ...r: [string, string]): void;
declare function h4(...r: [string, string, string]): void;

// 예시
function tuple<T extends any[]>(...args: T) {
  return args;
}

const numbers: number[] = getArrayOfNumber(); // 에러
const t1 = tuple("foo", 1, true); // [string, number, boolean]
const t2 = tuple("bar", ...numbers); // [string, ...number[]]

// 적용
function loadfile2(...args: [string, string, (result: File) => void]);

function request2(...args: [URL, (result: JSON) => void]) {}

// 두 함수가 마지마겡 콜백으로 끝난다. 제네릭으로 두 콜백의 타입을 하나로 만들 수 있다.
// ...args는 타입들을 배열로 합쳐주고 ...Args는 요소들을 펼쳐준다.
type Fn<Args extends unknown[], Res> = (
  ...args: [...Args, (result: Res) => void]
) => void;

type LoadFileFn = Fn<[string, string], File>;
type RequestFn = Fn<[URL], JSON>;

function promisify2<Args extends unknown[], Res>(
  fn: (...args: [...Args, (result: Res) => void]) => void,
): (...args: Args) => Promise<Res> {}

// 개선
function promisify3<Args extends unknown[], Res>(
  fn: (...args: [...Args, (result: Res) => void]) => void,
): (...args: Args) => Promise<Res> {
  return function (...args: Args) {
    // 콜백을 제외한 모든 배개변수를 받는 함수를 반환
    return new Promise((resolve) => {
      // 생성한 Promise를 반환
      function callback(res: Res) {
        // 콜백이 없으므로 resolve 함수를 호출하는 콜백 생성
        resolve(res);
      }
      fn.call(null, ...[...args, callback]); // 나누어진 요소를 다시 합친다. 콜백을 인수에 추가해 원래 함수를 호출한다.
    });
  };
}

// promisify3 같은 함수는 언제 사용할까? 그리고 (result: Res) => void 콜백은 어떻게 호출될까?
