type Circle = {
  radius: number;
  kind: "circle";
};

type Square = {
  x: number;
  kind: "square";
};

type Triangle = {
  x: number;
  y: number;
  kind: "triangle";
};

type Rectangle = {
  x: number;
  y: number;
  kind: "rectangle";
};

type Shape = Circle | Square | Triangle | Rectangle;

// Shape에 타입이 추가되면 해당 타입에 맞는 분기 코드를 작성해야하는데, 아래 코드 처럼 실수로 빠뜨릴 수 있다. 그러기 위해서 assertNever 헬퍼 함수를 사용한다.
function assertNever(value: never): never {
  throw Error(`Unexpected value: ${value}`);
}

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.x ** 2;
    case "triangle":
      return 0.5 * shape.x * shape.y;
    default:
      assertNever;
      console.error("Unknown shape", shape);
      throw Error("Unknown shape");
  }
}

const circle = {
  radius: 10,
  kind: "circle",
} as const;

area(circle);
