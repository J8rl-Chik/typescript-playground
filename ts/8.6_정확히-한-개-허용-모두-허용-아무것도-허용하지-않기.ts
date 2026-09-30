// 프로퍼티 1개만 허용
type ExactOne<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  } & {
    [P in Exclude<keyof T, K>]?: never;
  };
}[keyof T];

type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

function loadVideo(format: ExactOne<VideoFormatURLs>) {}

loadVideo({
  format360p: new URL(""),
});

// 에러
loadVideo({
  format360p: new URL(""),
  format480p: new URL(""),
});

// 이전의 Split으로도 만들 수 있다.
type Split<T, OptionalNever extends boolean = false> = {
  [K in keyof T]: {
    [P in K]: T[P];
  } & (OptionalNever extends false
    ? {}
    : {
        [P in Exclude<keyof T, K>]?: never;
      });
}[keyof T];

type ExactlyOne1<T> = Split<T, true>;

type AllOrNone<T, Keys extends keyof T> = (
  | {
      [K in Keys]-?: T[K]; // 모두 사용 가능
    }
  | {
      [K in Keys]?: never; // 모두 사용 불가능
    }
) & {
  [K in Exclude<keyof T, Keys>]: T[K]; // 나머지는 정의된 대로
  //   & Partial<Omit<T, Keys>>도 가능
};

//
type AllOrNone2<T, Keys extends keyof T> = (
  | {
      [K in Keys]-?: T[K]; // 모두 사용 가능
    }
  | {
      [K in Keys]?: never; // 모두 사용 불가능
    }
) &
  Split<T>; // 1개 이상의 프로퍼티가 필수

function loadVideo2(
  format: AllOrNone2<VideoFormatURLs, "format360p" | "format480p">,
) {}

loadVideo2({
  format360p: new URL(""),
  format480p: new URL(""),
});

loadVideo2({
  format1080p: new URL(""),
});

// 에러
loadVideo2({
  format480p: new URL(""),
  format1080p: new URL(""),
});

// 내장 헬퍼 타입으로도 구현 가능
type AllOrNone3<T, Keys extends keyof T> = (
  | Required<Pick<T, Keys>>
  | Partial<Record<Keys, never>>
) &
  Split<T>;
