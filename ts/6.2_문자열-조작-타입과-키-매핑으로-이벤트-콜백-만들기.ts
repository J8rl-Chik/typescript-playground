type EventName = `on${string}`;

type EventObject<T> = {
  val: T;
};
type Callback<T = any> = (ev: EventObject<T>) => void;
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
    this.events[ev].push(cb);
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

// 감시 기능(watch)를 추가해보자.
// 객체를 확장하고, 프로퍼티가 바뀌면 등록한 콜백을 실행한다.
let person = {
  name: "Stefan",
  age: 40,
};

/* 

const watchedPerson = system.watch(person);

watchedPerson.onAgeChanged((ev) => {
  console.log(ev.val, "changed!!");
});

watchedPerson.age = 41;
 */

// string & keyof T 인터섹션을 통해 심볼이나 숫자 타입은 제외한다.
// 해당 키로 문자열 템플릿 리터럴 타입으로 정의한다.
type WatchedObject<T> = {
  [K in string & keyof T as `on${K}Changed`]: (ev: Callback<T[K]>) => void;
};

// on 뒤에 대문자가 올 수 있도록 문자열 조작 타입을 이용한다.
type WatchedObject2<T> = {
  [K in string & keyof T as `on${Capitalize<K>}Changed`]: (
    ev: Callback<T[K]>,
  ) => void;
};

type WatchedPerson = WatchedObject2<typeof person>;
// 타입 설정 완료

function capitalize(inp: string) {
  return inp.charAt(0).toUpperCase() + inp.slice(1);
}

// handlerName에서는 타입스크립트에 타입이 바뀌었음을 알려줄 약간의 타입 어서션이 필요하다.
// 타입스크립트에서는 그 결과가 대문자 버전이 될 것인지를 알 수 없다. 무슨 말이지?
function handlerName(name: string): EventName {
  return `on${capitalize(name)}Changed` as EventName;
}

// Proxy 객체를 이용해 get과 set을 가로채면, 프로퍼티가 바뀌었을 때 이벤트 핸들러를 실행할 수 있따.

class EventSystem2 {
  events: Events;

  constructor() {
    this.events = {};
  }

  defineEventHandler(ev: EventName, cb: Callback): void {
    this.events[ev] = this.events[ev] ?? [];
    // noUncheckedIndexedAccess옵션을 활성화하면 위 코드만으로는 타입 범위를 좁힐 수 없나?
    this.events[ev].push(cb);
  }

  trigger(ev: EventName, value: any) {
    let callbacks = this.events[ev];

    if (callbacks) {
      callbacks.forEach((cb) => {
        cb({ val: value });
      });
    }
  }

  watch<T extends object>(obj: T): T & WatchedObject2<T> {
    const self = this;

    return new Proxy(obj, {
      get(target, property) {
        if (
          typeof property === "string" &&
          property.startsWith("on") &&
          property.endsWith("Changed")
        ) {
          return (cb: Callback) => {
            self.defineEventHandler(property as EventName, cb);
          };
        }

        return target[property as keyof T];
      },

      set(target, property, value) {
        if (property in target && typeof property === "string") {
          target[property as keyof T] = value;
          self.trigger(handlerName(property), value);

          return true;
        }

        return false;
      },
    }) as T & WatchedObject2<T>;
  }
}

let person2 = {
  name: "Stefan",
  age: 40,
};

const watchedPerson = new EventSystem2().watch(person);

watchedPerson.onAgeChanged((ev) => console.log(ev.val, "changed!!!"));

watchedPerson.age = 41;
