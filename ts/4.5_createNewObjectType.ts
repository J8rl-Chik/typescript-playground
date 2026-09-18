// 모델이 바뀔 때마다 타입도 바꿔야 한다면, 제네릭 매핑 타입을 이용해 원래 타입에 기반한 새 객체 타입을 만든다.
type ToyBase = {
  name: string;
  description: string;
  minimumAge: number;
};

type BoardGame = ToyBase & {
  kind: "boardgame";
  players: number;
};

type Puzzle = ToyBase & {
  kind: "puzzle";
  pieces: number;
};

type Doll = ToyBase & {
  kind: "doll";
  material: "push" | "plastic";
};

type Toy = BoardGame | Puzzle | Doll;

type GroupedToys = {
  boardgame?: Toy[];
  puzzle?: Toy[];
  doll?: Toy[];
};

// 아래처럼 작성하면 각 프로퍼티 키는 Toy["kind"]의 일부라는데 무슨 말이지? 그래서 명시적으로 만들어 보자는데?
function groupToys(toys: Toy[]): GroupedToys2 {
  const groups: GroupedToys2 = {};

  for (const toy of toys) {
    groups[toy.kind] = groups[toy.kind] ?? [];
    groups[toy.kind]?.push(toy);
  }

  return groups;
}

// 일반화로 개선할 수 있는 패턴.
type GroupedToys2 = {
  [K in Toy["kind"]]?: Toy[];
};

// 컬렉션을 받아 특정 선택자로 그룹화하는 Group 타입을 만든다. 두 개의 타입 변수로 제네릭 타입을 만들려 한다.
// Collection은 무엇이든 포함할 수 있다.
// Collection의 키는 Selector이므로 Selecttor는 관련 프로퍼티를 만들 수 있다.

// Collection[Selector]의 타입은 string, number, symbol이 아니라 다른 타입일 수 있다. (in은  string, number, symbol만 허용하므로)
type Group<Collection, Selector extends keyof Collection> = {
  [K in Collection[Selector]]?: Collection[];
};

// 사용 방법
type GroupedToys3 = Group<Toy, "kind">;

// Collection의 범위를 좁힌다. 하지만 Collection은 와일드카드 객체가 되므로 Groups의 타입 확인을 사실상 무력화한다(무슨 말이지?)
type Group2<
  Collection extends Record<string, any>,
  Selector extends keyof Collection,
> = {
  [K in Collection[Selector]]?: Collection[];
};

// 각 키가 유효한 문자열 키인지 검사하는 방법: 조건부 타입을 이용(선택형 타입 변경자를 제거했다는데 어디가 제거 됐다는거지?)
// 이건 사용한 예시와 결과를 보고 싶다.
type Group3<Collection, Selector extends keyof Collection> = {
  [K in Collection[Selector] extends string
    ? Collection[Selector]
    : never]: Collection[];
};

type GroupedToys4 = Partial<Group3<Toy, "kind">>;
