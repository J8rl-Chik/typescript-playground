type Fn<T extends any[], U extends any[]> = (...args: [...T, ...U]) => any;

function curry<T extends any[], U extends any[], R>(
  f: (...args: [...T, ...U]) => R,
  ...t: T
) {
  return (...u: U) => f(...t, ...u);
}
