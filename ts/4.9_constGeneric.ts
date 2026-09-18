interface Component {
  render(): HTMLElement;
}

interface ComponentConstructor {
  new (): Component;
}

type Route = {
  path: string;
  //   component: ComponentConstructor;
};

function router<T extends Route>(routes: T[]) {
  return {
    navigate(path: T["path"]) {},
  };
}

function getPath<T extends string>(route: T): T {
  return route;
}

const path = getPath("/");

/* 
타입스크립트는 객체의 타입을 넓히고, 배열의 값은 변할 수 있으므로 배열의 타입은 더 넓게 일반화한다.(뭔 말?)
중첩된 객체 예제
*/
type Routes = {
  paths: string[];
};

function getPaths<T extends Routes>(routes: T): T["paths"] {
  return routes.paths;
}

/* 
객체에서 paths의 const 컨텍스트는 콘텐츠가 아니라 변수 바인딩 전용.
이 때문에 navigate의 타입을 정의하는데 필요한 일부 정보를 잃게됨.
*/
const paths = getPaths({ paths: ["/", "/about"] }); // string[]

/* 
상호적으로 const를 적용해 이 제한을 피할 수 있음. 그러려면 readonly로 재정의
*/
function router2<T extends Route>(routes: readonly T[]) {
  return {
    navigate(path: T["path"]) {
      history.pushState({}, "", path);
    },
  };
}

const rtr = router2([
  { path: "/" },

  {
    path: "/about",
  },
] as const);

// 이렇게 작성하면 무엇인가를 기억해야 한다는 사실은 언젠가 반드시 문제를 일으킨다.(무슨 말?)
rtr.navigate("/about");

/* 
타입 스크립트는 제네릭 타입 매개변수에서 const 컨텍스트를 요청하도록 허용한다.
제네릭 타입 매개변수를 구체적인 값으로 치환할때 const를 추가해서 const 컨텍스트에서 발생하도록 강제한다.
*/
function router3<const T extends Route>(routes: T[]) {
  return {
    navigate(path: T["path"]) {},
  };
}

const rtr2 = router3([
  { path: "/" },

  {
    path: "/about",
  },
]);

rtr2.navigate("/about");
rtr2.navigate("/faq"); // 에러
