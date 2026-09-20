function greet(name: string) {
  return `Hi, ${name}`;
}

type Levels = 1 | 2 | 3 | 4 | 5 | 6;
type Headings = `H${Levels}`;

type EventName = `on${string}`;

type EventObject<T> = {
  val: T;
};
// 기본 타입 any는 왜 넣었지?
type Callback<T = any> = (ev: EventObject<T>) => void;
// 조건부 타입(물음표) 사용하면 안되나?
type Events = {
  [x: EventName]: Callback[] | undefined;
};

class EventSystem {
  events: Events;

  constructor() {
    this.events = {};
  }

  defineEventHandler(ev: EventName, cb: Callback): void {
    this.events[ev] = this.events[ev] ?? [];
    // noUncheckedIndexedAccess옵션을 활성화하면 위 코드만으로는 타입 범위를 좁힐 수 없나?
    this.events[ev]?.push(cb);
  }

  trigger(ev: EventName, value: any) {
    let callbacks = this.events[ev];

    if (callbacks) {
      callbacks.forEach((cb) => {
        cb({ val: value });
      });
    }
  }
}

const system = new EventSystem();
system.defineEventHandler("click", () => {}); // 에러
system.defineEventHandler("onClick", () => {});
system.defineEventHandler("onchange", () => {});
