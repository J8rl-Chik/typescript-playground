// 비동기 초기화의 경우 에러가 난다.
type User = {
  id: number;
  userName: string;
};

class Account {
  userName: string;
  state: string = "active";
  orders?: number[];

  constructor(public id: number) {
    fetch("/api")
      .then((res) => res.json())
      .then((data: User) => (this.userName = data.userName ?? "not - found"));
  }
}

// 정적 팩토리 함수를 사용해 해결할 수 있다.
class Account2 {
  state: string = "active";
  orders?: number[];

  constructor(
    public id: number,
    public userName: string,
  ) {}

  static async create(id: number) {
    const user: User = await fetch("api").then((res) => res.json());

    return new Account2(id, user.userName);
  }
}

// userName의 상태가 앱과 전혀 관련이 없어 필요할 때만 접근하는 프로퍼티인 경우 무시하는 방법도 있다.
// 무슨 문법이지?
// 런타임 오류가 발생할 수 있는 안전하지 않은 작업이니 주의가 필요하다.
class Account3 {
  userName!: string;
  state: string = "active";
  orders?: number[];

  constructor(public id: number) {
    fetch("/api")
      .then((res) => res.json())
      .then((data: User) => (this.userName = data.userName ?? "not - found"));
  }
}
