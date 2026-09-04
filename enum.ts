// 기본값
// enum DirectionE {
//   Up, // 0
//   Down, // 1
//   Left = 3, // 3
//   Right, // 4
// }

// const Direction = {
//   Up: 0,
//   Down: 1,
//   Left: 3,
//   Right: 4,
// };

// function move(direction: DirectionE) {}

// move(Direction);

// enum Status {
//   Admin = "Admin",
//   User = "User",
// }

// function closeThread(threadId: number, status: Status) {}

// enum Roles {
//   Admin = "Admin",
//   User = "User",
// }

// closeThread(10, Roles.Admin);

const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;

type Direction = (typeof Direction)[keyof typeof Direction];

function move(direciton: Direction) {}

move(30); //  오류
