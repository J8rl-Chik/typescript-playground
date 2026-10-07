// 비공개 필드를 포함해 사용할 메서드를 혼동하지 않도록 숨긴다.
// distanceTo는 외부에서는 접근할 수 없지만 내부 정적 멤버는 사용할 수 있다.
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  #distanceTo(point: Point): number {
    const dx = this.x - point.x;
    const dy = this.y - point.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  static distance(p1: Point, p2: Point): number {
    return p1.#distanceTo(p2);
  }
}

// 동적인 값을 얻어와 정적 비공개 필드를 갱신 static 인스턴스화 블록(무슨 문법이지?)
type Config = {
  instances: number;
};

class Task {
  static #nextId = 0;
  static #maxIstances: number;
  #id: number;

  static {
    fetch("/available-slots")
      .then((res) => res.json())
      .then((result) => {
        const resultConfig = result as Config;
        Task.#maxIstances = resultConfig.instances;
      });
  }

  constructor() {
    if (Task.#nextId > Task.#maxIstances) {
      throw "Max Error";
    }

    this.#id = Task.#nextId++;
  }
}

/* 
    타입스크립트는 인스턴스의 필드 외에 정적 필드가 인스턴스화되었는지를 확인하지 않는다.(무슨 말?)
    따라서 타입스크립트는 정적 클래스의 구조체를 지원하지 않으며, 정적 전용 클래스를 안티패턴으로 간주함에도
    다양한 상황에서 정적 멤버를 유용하게 사용할 수 있다.(무슨 말?)

*/
