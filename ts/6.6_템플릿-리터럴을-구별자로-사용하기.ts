// 사용자의 로그인 요청 관련 상태를 보여준다.
type UserReqest =
  | { state: "USER_PENDING" }
  | { state: "USER_ERROR"; message: string }
  | { state: "USER_SUCCESS"; data: User }; // 에러 무시

// 요청 타입에 맞게 조절하면 재활용 가능하다.
type OrderReqest =
  | { state: "ORDER_PENDING" }
  | { state: "ORDER_ERROR"; message: string }
  | { state: "ORDER_SUCCESS"; data: Order }; // 에러 무시

// 템플릿 리터럴 타입을 이용해 합칠 수 있다.
type Pending = {
  state: `${Uppercase<string>}_PENDING`;
};

type Err = {
  state: `${Uppercase<string>}_ERROR`;
  message: string;
};

type Success = {
  state: `${Uppercase<string>}_SUCCESS`;
  data: any;
};

type BackendRequest = Pending | Err | Success;

function execute(req: BackendRequest) {
  switch (req.state) {
    case "USER_PENDING":
      console.log("Login pending...");
      break;

    case "USER_ERROR":
      throw new Error(`Login failed: ${req.message}`);

    case "USER_SUCCESS":
      login(req.data); // 에러 무시
      break;

    case "ORDER_PENDING":
      console.log("Fetching orders pending");
      break;
    case "ORDER_ERROR":
      throw new Error(`Fetching orders failed: ${req.message}`);
    case "ORDER_SUCCESS":
      displayOrder(req.data); // 에러 무시
      break;
  }
}

// 하위 집합을 만들고 문자열 조작 타입을 이용할 수 있다.
type RequestConstants = "user" | "order";

type Pending2 = {
  state: `${Uppercase<RequestConstants>}_PENDING`;
};

type Err2 = {
  state: `${Uppercase<RequestConstants>}_ERROR`;
  message: string;
};

type Success2 = {
  state: `${Uppercase<RequestConstants>}_SUCCESS`;
  data: any;
};

// Data 타입의 전역 상태 객체에 저장(왜 이렇게 하지?)
type Data = {
  user: User | null; // 에러 무시
  order: Order | null; // 에러 무시
};
type RequestConstants2 = keyof Data;

type Pending3 = {
  state: `${Uppercase<RequestConstants>}_PENDING`;
};

type Err3 = {
  state: `${Uppercase<RequestConstants>}_ERROR`;
  message: string;
};

type Success3 = {
  state: `${Uppercase<RequestConstants>}_SUCCESS`;
  data: NonNullable<Data[RequestConstants2]>; // 유니온 타입의 null과 undefined를 제거
};

// 요청의 종류를 추가하면 data의 타입도 늘어난다. 인덱스 접근을 통해 반복되는 수정을 줄인다.
type Success4 = {
  [K in RequestConstants2]: {
    state: `${Uppercase<K>}_SUCCESS`;
    data: NonNullable<Data[K]>;
  };
}[RequestConstants2];
