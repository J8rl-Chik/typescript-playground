const person: [string, number] = ["Alice", 30];

person[1] = 41;
// Type 'false' is not assignable to type 'undefined'.
person[2] = false;

// Labled tuple
type Person = [name: string, age: number];

function hello(...args: [name: string, age: number]) {}

function hello2(a: string, ...b: [string, string]) {}
