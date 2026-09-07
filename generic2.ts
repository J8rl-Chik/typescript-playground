type Languages = {
  de: URL;
  en: URL;
  pt: URL;
  es: URL;
  fr: URL;
  ja: URL;
};

const languages: Languages = {};

type URLList = {
  [x: string]: URL;
};

// key가 string이어서 범위가 넓다.
function fetchFile(urls: URLList, key: string) {
  return fetch(urls[key]).then((res) => res.json());
}

const de = fetchFile(languages, "de");
// 범위가 넓어 없는 키도 사용 가능.
const it = fetchFile(languages, "it");

function fetchFile2<List extends URLList>(urls: List, key: keyof List) {
  return fetch(urls[key]).then((res) => res.json());
}

const de2 = fetchFile2(languages, "de");
// List로 전달된 Languages 타입의 키를 검증한다.
const it2 = fetchFile2(languages, "it");

// 여러 키를 불러올떄도 가능하다.
function fetchFile3<List extends URLList>(urls: List, keys: (keyof List)[]) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => [el, data]),
  );

  return els;
}
// Promise<any[]>[]: data는 any 타입이 되어 keyof List의 el(string, number, symbol) 타입을 삼켜버린다.

const deAndFr = fetchFile3(languages, ["de", "fr"]);
const deAndIr = fetchFile3(languages, ["de", "it"]);

function fetchFile4<List extends URLList>(urls: List, keys: (keyof List)[]) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => {
        const entry: [keyof List, any] = [el, data];

        return entry;
      }),
  );

  return els;
}
// 배열 요소가 튜플 형태이므로 튜플의 첫 번째 요소가 어떤 타입인지는 알려 줄 수 있다.
const deAndFr2 = fetchFile4(languages, ["de", "fr"]);

// 독일어와 프랑스어를 반환받지만 만약 영어가 포함됐는지 확인하는 로직을 추가하면? 컴파일러는 경고하지 않는다
for await (const [key, data] of deAndFr2) {
  if (key === "en") {
  }
}

// keyof List를 좁히려면 다음과 같은 과정을 반복해야 한다.
// 1. 제네릭 타입 매개변수를 만든다.
// 2. 넓은 타입을 제약으로 설정
// 3. 대체하는 타입으로 사용

// 두 번째 타입 배개면수는 첫 번째 타입 매개변수에 제약받을 수 있다.
function fetchFile5<List extends URLList, Keys extends keyof List>(
  urls: List,
  keys: Keys[],
) {
  const els = keys.map((el) =>
    fetch(urls[el])
      .then((res) => res.json())
      .then((data) => {
        const entry: [Keys, any] = [el, data];

        return entry;
      }),
  );

  return els;
}

const deAndFr3 = fetchFile5(languages, ["de", "fr"]);

for (const entry of deAndFr3) {
  const result = await entry;

  // 에러를 안던진다. 확인해봐야겠다.
  if (result[0] === "en") {
  }
}

// 이거는 무슨 문법일까?
const deAndJa = fetchFile5<Languages, "ja" | "de">(languages, ["de"]);
