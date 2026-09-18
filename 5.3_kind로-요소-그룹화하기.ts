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
  material: "plus" | "plastic";
};

type Toy = Doll | Puzzle | BoardGame;

type Group<
  Collection extends Record<string, any>,
  Selector extends keyof Collection,
> = {
  [K in Collection[Selector]]: Collection[];
};

// 모든 프로퍼티는 아주 넓은 Toy[]를 가리킨다.
type GroupedToys = Partial<Group<Toy, "kind">>;

// Toy에서 Doll 타입 찾기
// 유니온의 조건부 타입은 조건부 타입의 유니온이므로 모든 멤버를 검사한다.
type ExtractedDoll = Extract<Toy, { kind: "doll" }>;

type Group2<
  Collection extends Record<string, any>,
  Selector extends keyof Collection,
> = {
  [K in Collection[Selector]]: Extract<Collection, { [P in Selector]: K }>[];
};

type GroupedToys2 = Partial<Group2<Toy, "kind">>;
// 타입스크립트는 toy가 잠재적으로 모든 장난감이 될 수 있다고 생각하는 점이 문제다. 이게 무슨 말? 그래서 아래 해결 코드를 알려주는데 어떤 용도인지 모르겠다.

// 해결 방법 1. 각 멤버를 개별적으로 확인.
function groupToys1(toys: Toy[]): GroupedToys2 {
  const groups: GroupedToys2 = {};

  for (let toy of toys) {
    switch (toy.kind) {
      case "boardgame":
        groups[toy.kind] = groups[toy.kind] ?? [];
        groups[toy.kind]?.push(toy);
        break;
      case "doll":
        groups[toy.kind] = groups[toy.kind] ?? [];
        groups[toy.kind]?.push(toy);
        break;
      case "puzzle":
        groups[toy.kind] = groups[toy.kind] ?? [];
        groups[toy.kind]?.push(toy);
        break;
    }
  }
  return groups;
}

// 해결 방법 2. 타입 단언을 이용해 groups[toy.kind]의 타입 넓히기.
function groupToys2(toys: Toy[]): GroupedToys2 {
  const groups: GroupedToys2 = {};

  for (let toy of toys) {
    (groups[toy.kind] as Toy[]) = groups[toy.kind] ?? [];
    (groups[toy.kind] as Toy[])?.push(toy);
  }

  return groups;
}

// 해결 방법 3. toy를 그룹에 직접 추가하지 않고 assign을 이용.
function assign<T extends Record<string, K[]>, K>(
  groups: T,
  key: keyof T,
  value: K,
) {
  groups[key] = groups[key] ?? [];
  groups[key]?.push(value);
}

function groupToys3(toys: Toy[]): GroupedToys2 {
  const groups: GroupedToys2 = {};

  for (let toy of toys) {
    assign(groups, toy.kind, toy);
  }

  return groups;
}
