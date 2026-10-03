/* 
타입스크립트는 환경에 있거나 도구를 통해 접근할 수 있는 모듈에도 엠비언트 모듈 선언을 지원한다.
*/

// url, htpp, path와 같은 Node 주요 내장 모듈 등

// 와일드 패턴에도 사용할 수 있다. (현재는 웹팩이 설치되지 않아 에러가난다.)
// 임포트하려는 모든 .css파일을 리스닝한다.
// 자동 완성 기능에서 정확한 클래스 이름은 사용할 수 없다. 하지만 NPM 패키지를 추가로 설치하면 타입 파일을 자동으로 생성해 해결할 수 있따.
declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export default classNames;
}

// 이 밖에 '*.mdx'를 선언하면 jsx 파일에서 컴포넌트로 사용할 수 있다.
// 앰비언트 모듈을 사용하려면 @types폴더를 만드는게 좋다. 이 폴더에 모듈 정의가 포함된 .d.ts 파일을 얼마든지 추가할 수 있다.
// typeRoots 옵션으로 @types 경로를 설정하자.
