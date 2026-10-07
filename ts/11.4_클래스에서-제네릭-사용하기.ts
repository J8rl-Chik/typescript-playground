class Collection<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T) {
    this.items.push(item);
  }

  contains(item: T): boolean {
    return this.items.includes(item);
  }
}

const unknowns = new Collection();
unknowns.add(1);
unknowns.add("World");

// 초깃값을 요구할때
class Collection2<T> {
  items: T[];

  constructor(initial: T) {
    this.items = [initial];
  }

  add(item: T) {
    this.items.push(item);
  }

  contains(item: T): boolean {
    return this.items.includes(item);
  }
}

const numbersInf = new Collection2(0);
numbersInf.add(1);

// 초깃값이 없을때
class Collection3<T = never> {
  items: T[];

  constructor() {
    this.items = [];
  }

  add(item: T) {
    this.items.push(item);
  }

  contains(item: T): boolean {
    return this.items.includes(item);
  }
}

const nevers = new Collection3();
nevers.add(1); // 에러

const num = new Collection3<number>();
num.add(1);
