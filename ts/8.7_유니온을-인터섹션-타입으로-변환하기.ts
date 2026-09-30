type BasicVicdeoData = {
  // 구현 중
};

type Format320 = { urls: { format320p: URL } };
type Format480 = { urls: { format480p: URL } };
type Format720 = { urls: { format3720p: URL } };
type Format1080 = { urls: { format1080p: URL } };

// 한 가지 이상의 포맷을 반드시 정의하도록 요구하는 타입
type Video = BasicVicdeoData & (Format320 | Format480 | Format720 | Format1080);

// 책 에서는 never라고 나오지만 'format320p'로 나온다.
// 어쨋든 모든 키의 유니온 타입은 아니다.
type FormatKeys = keyof Video["urls"];

type Video2 = BasicVicdeoData & {
  urls: {
    format320p: URL;
    format480p: URL;
    format720p: URL;
    format1080p: URL;
  };
};

// 모든 키의 유니온 타입이 나온다.
// 유니온 타입을 인터섹션 타입으로 바꿔야 한다.
type FormatKeys2 = keyof Video2["urls"];

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;
