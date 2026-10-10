type Messages = "CHANNEL_OPEN" | "CHANNEL_CLOSE" | "CHANNEL_FAIL";

type ChannelDefinition = {
  [key: string]: {
    open: Messages;
    close: Messages;
    fail: Messages;
  };
};

const impl: ChannelDefinition = {
  test: {
    open: "CHANNEL_OPEN",
    close: "CHANNEL_CLOSE",
    fail: "CHANNEL_FAIL",
  },
};

function openChannel(
  def: ChannelDefinition,
  channel: keyof ChannelDefinition,
) {}

// 에러가 안난다
openChannel(impl, "message");

// T 타입 매개변수를 전달받도록 제네릭을 사용한다.
function openChannel2<T extends ChannelDefinition>(def: T, channel: keyof T) {}

// 명시적 타입 정의는 실제 타입을 오버라이드한다.
// 하위 타입이 아닌 ChannelDefinition으로 취급한다.
const impl2 = {
  test: {
    open: "CHANNEL_OPEN",
    close: "CHANNEL_CLOSE",
    fail: "CHANNEL_FAIL",
  },
};

// 리터럴 타입을 표현하기 위해 as const를 사용한다.
const impl3 = {
  test: {
    open: "CHANNEL_OPEN",
    close: "CHANNEL_CLOSE",
    fail: "CHANNEL_FAIL",
  },
} as const;

// 없는 프로퍼티라고 에러가난다.
openChannel2(impl3, "message");

// 하지만 impl3을 사용하는 시점에만 ChannelDefinition의 하위 타입인지 알 수 있다.
// 사전에 에너테이션을 추가하고 싶을 때가 있다면, satisfies를 사용한다.
// as const와 차이점은 readonly로 설정되지 않지만, 리터럴 타입을 바꿀 수는 없다.
const impl4 = {
  test: {
    open: "CHANNEL_OPEN",
    close: "CHANNEL_CLOSE",
    fail: "CHANNEL_FAIL",
  },
} satisfies ChannelDefinition;

openChannel2(impl4, "message");
