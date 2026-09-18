function identity(value: any): any {
  return value;
}

// any 타입
let a = identity("hello");

function identity2(value: unknown): unknown {
  return value;
}

// any 타입
let a2 = identity("hello");

function identity3<T>(value: T): T {
  return value;
}

// string 타입
let a3 = identity3("hello");
// {a: number} 타입
let c = identity3({ a: 2 });

// hello 타입
const a4 = identity3("hello");
// {a: number} 타입
const c2 = identity3({ a: 2 });

// 객체의 타입을 명시하고 싶을 때: {a: 2} 타입
const c3 = identity3<{ a: 2 }>({ a: 2 });
