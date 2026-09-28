type Settings = {
  mode: "light" | "dark";
  playbackSpeed: number;
  subtitle: {
    active: boolean;
    color: string;
  };
};

const defaults: Settings = {
  mode: "dark",
  playbackSpeed: 1.0,
  subtitle: {
    active: false,
    color: "white",
  },
};

function applySettings(
  defaultSettings: Settings,
  userSettings: Partial<Settings>,
): Settings {
  return { ...defaultSettings, ...userSettings };
}

// Partial은 객체의 첫 수준에서만 동작한다.
let settings = applySettings(defaults, { subtitle: { active: true } }); // 에러

// 재귀적으로 탐색할 수 있는 타입을 만든다. 기본형 타입이 T면 에러가 안뜨나?
type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>;
};

// 객체일 때만 깊숙이 들어가도록 조건을 추가한다.
type DeepPartial2<T> = T extends object
  ? {
      [K in keyof T]?: DeepPartial2<T[K]>;
    }
  : T;

type DeepPartialSettings = DeepPartial2<Settings>;

// applySettings 함수의 userSettings에 DeepPartial2<Settings>로 설정하면 에러가난다.
// defaultSettings이 Settings 타입을 만족해서 결과 객체에 포함돼서 괜찮을줄 알았는데 왜 그럴까?
// subtitles(객체)가 덮어씌워버리기 때문이다.

// 기능 구현이 까다로우므로 lodash의 merge 함수를 이용할 수 있다.
// merge는 두 객체의 인터섹션을 만들도록 인터페이스를 정의한다.
import { merge } from "lodash";

function applySettings2(
  defaultSettings: Settings,
  userSettings: DeepPartial2<Settings>,
): Settings {
  return merge(defaultSettings, userSettings);
}
