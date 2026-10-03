// lib.dom.d.ts 업데이트를 기다릴 수 없다면 직접 타입을 추가할 수 있다.

// resize-observer.d.ts라는 파일을 만들었따.
declare var ResizeObserver: {
  prototype: ResizeObserver;
  new (callback: ResizeObserverCallback): ResizeObserver;
};

// 어디에서나 사용하고 싶다.
declare global {
  var ResizeObserver: {
    prototype: ResizeObserver;
    new (callback: ResizeObserverCallback): ResizeObserver;
  };
}

// resize-observer.d.ts를 @types 폴더에 넣고 typeRoots, include에 경로를 설정한다.

// 대상 브라우저에서 ResizeObserver를 아직 사용할수 없을 가능성이 있어 정의되지 않은 상태로 만든다.
// 이렇게 하면 객체를 사용할 수 있는지 확인할 수 있다.(무슨 말이지?. 그리고 에러가 난다.)
declare global {
  var ResizeObserver:
    | {
        prototype: ResizeObserver;
        new (callback: ResizeObserverCallback): ResizeObserver;
      }
    | undefined;
}

// 사용
if (typeof ResizeObserver !== "undefined") {
  const x = new ResizeObserver((entries) => {});
}

// 엠비언트 선언 파일과 전역 타입을 타입스크립트가 인식하지 못 할때는 다음을 확인한다.
// include 속성으로 @types폴더를 파싱한다(뭘 파싱하지?)
// 엠비언트 파일을 types나 typeRoots에 추가한다.
// 엠비언트 파일 끝에 export {}를 추가하면 타입스크립트는 모듈로 인식한다.
