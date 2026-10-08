// Express 예시
const app = {};

app.get("./app/users/:userID", (req, res) => {
  if (req.method === "POST") {
    res.status(200).send({
      message: "Got you, user" + req.params.userId,
    });
  }
});

// 1단계: 기본 타이핑
function get(path: string, callback: CallbackFn) {}

type CallbackFn = (req: ServerRequest, reply: ServerReply) => void;
// params는 일단 아래 처럼 작성하고 이후 리팩토링한다.
type ServerRequest = {
  method: string;
  params: Record<string, string>;
};

type ServerReply = {
  send: (obj: any) => void;
  status: (statusCode: number) => ServerReply;
};

// 2단계: 기본 타입의 부분집합
type Methods = "GET" | "POST";

type ServerRequest = {
  method: Methods;
  params: Record<string, string>;
};

type StatusCode = 200 | 201;

// 3단계: 제네릭 추가
type ServerRequest<Met extends Methods> = {
  // 왜 굳이 제네릭을 추가하지?
  method: Met;
  params: Record<string, string>;
};

type CallbackFn<Met extends Methods> = (
  req: ServerRequest<Met>,
  reply: ServerReply,
) => void;

function get(path: string, callback: CallbackFn<"GET">) {}

// 4단계: 고급 타입으로 타입 검사
// 문자열 템플릿 리터럴 타입과 infer로 경로에서 params의 키를 뽑아낸다.
// 아직은 `/:` 뒤의 문자열 전체를 하나의 키로 취급한다.
type ParseRouteParams<Route extends string> =
  Route extends `${string}/:${infer Param}` ? { [Key in Param]: string } : {};

type A = ParseRouteParams<"/app/users/:userID">; // { userID: string }
type B = ParseRouteParams<"/app/users">; // {}
type C = ParseRouteParams<"/users/:userID/posts">; // { "userID/posts": string } (의도와 다르다)

// 5단계: 리터럴 타입 잠금
// 인자 path를 string으로 받으면 "/app/users/:userID"가 string으로 넓어져
// 경로 정보가 사라진다. 제네릭 Path가 string을 extends 하도록 하면
// 타입스크립트가 호출 시점의 리터럴 타입을 그대로 추론한다.
// 3단계의 Met 제네릭은 그대로 두고 Path 제네릭을 추가한다.
type ServerRequest<Met extends Methods, Path extends string> = {
  method: Met;
  params: ParseRouteParams<Path>;
};

type CallbackFn<Met extends Methods, Path extends string> = (
  req: ServerRequest<Met, Path>,
  reply: ServerReply,
) => void;

declare function get<Path extends string>(
  path: Path,
  callback: CallbackFn<"GET", Path>,
): void;

get("/app/users/:userID", (req, res) => {
  req.params.userID; // string
  req.params.userId; // 오류: 'userId' 속성이 없다. (오타를 잡아낸다)
});

// 6단계: 조건부 타입 추가
// 경로에 매개변수가 여러 개이거나 없는 경우까지 조건부 타입을 재귀로 확장한다.
// 1) `/:param/나머지` 형태면 param을 키로 쓰고 나머지를 재귀로 처리한다.
// 2) `/:param`으로 끝나면 마지막 매개변수다.
// 3) 둘 다 아니면 매개변수가 없으므로 빈 객체다.
type ParseRouteParams<Route extends string> =
  Route extends `${string}/:${infer Param}/${infer Rest}`
    ? { [Key in Param | keyof ParseRouteParams<`/${Rest}`>]: string }
    : Route extends `${string}/:${infer Param}`
      ? { [Key in Param]: string }
      : {};

type D = ParseRouteParams<"/users/:userID/posts/:postID">; // { userID: string; postID: string }
type E = ParseRouteParams<"/users/:userID/posts">; // { userID: string }
type F = ParseRouteParams<"/users">; // {}

get("/users/:userID/posts/:postID", (req, res) => {
  req.params.userID; // string
  req.params.postID; // string
  req.params.id; // 오류: 'id' 속성이 없다.
});
