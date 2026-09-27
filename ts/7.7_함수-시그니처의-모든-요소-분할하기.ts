// 함수의 인수와 반환 타입을 제네릭 타입 밖에서 사용해야 하는 상황이 있다.
type Fn = (...args: any[]) => any;

function defer<F extends Fn>(
  fn: F,
  ...args: Parameters<F>
): () => ReturnType<F> {
  return () => fn(...args);
}

type Result = {
  page: URL;
  title: string;
  description: string;
};

function search(query: string, tags: string[]): Promise<Result[]> {
  throw "to be done";
}

const searchParams: Parameters<typeof search> = [
  "tuple types",
  ["typescript", "javascript"],
];

search(...searchParams);
