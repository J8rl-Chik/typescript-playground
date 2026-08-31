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

type Shape = Circle | Square | Triangle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.x ** 2;
    case "triangle":
      return 0.5 * shape.x * shape.y;
    default:
      throw Error("Unknown shape");
  }
}
