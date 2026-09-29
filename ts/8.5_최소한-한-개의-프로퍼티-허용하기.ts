type VideoFormatURLs = {
  format360p: URL;
  format480p: URL;
  format720p: URL;
  format1080p: URL;
};

// 최소한 한 개의 URL을 포함하는 객체를 전달하고 싶다.
// Partial을 사용하면 빈 객체({})도 허용한다.
function loadVide(format: Split<VideoFormatURLs>) {}

// 아래는 한 개의 프로퍼티 집합만 포함하는 객체로 만든 타입이다.
// 두 개의 프로퍼티 집합을 포함하는 타입을 추가하면 타입이 달라지지 않았다. 유니온 타입이 그렇게 동작하기 떄문이다.(무슨 말이지?)
type AvailableVideoFormats =
  | {
      format360p: URL;
    }
  | {
      format480p: URL;
    }
  | {
      format720p: URL;
    }
  | {
      format1080p: URL;
    };

type AvailableVideoFormats2 = {
  [K in keyof VideoFormatURLs]: {
    [P in K]: VideoFormatURLs[P];
  };
}[keyof VideoFormatURLs];

// 제네릭
type Split<T> = {
  [K in keyof T]: {
    [P in K]: T[P];
  };
}[keyof T];

loadVide({});
