import React, { forwardRef, useContext, useState, type JSX } from "react";
type CtaElements = "a" | "button";

type CtaProps<T extends CtaElements> = {
  as: T;
} & JSX.IntrinsicElements[T];

// 타입스크립트가 JSX에서 올바르게 작동하려면 JSX라는 전역 네임스페이스에 있는 타입 정의를 사용해야한다.
// JSX.IntrinsicElements는 어떤 요소를 인스턴스화할 수 있는지, 어떤 속성을 허용할 수 있는지 제공한다.
function Cta<T extends CtaElements>({ as: Component, ...props }: CatProps<T>) {
  return <Component {...props} />;
}

// 그리고 LibraryMangaedAttributes 타입을 정의해야한다.
// 프레임워크 자체 기본 속성이나 defaultProps 등으로 정의된 속성을 제공할 때 이타입을 사용한다.
// 타입스크립트는 LibraryMangaedAttributes를 평가할 수 없어 타입이 컴포넌트에 맞는지 확인할 수 없다.(왜지?)
// 프로퍼티를 any 단언으로 해결할 수 있다.
function Cta2<T extends CtaElements>({ as: Component, ...props }: CtaProps<T>) {
  return <Component {...(props as any)} />;
}

// 동작은 하지만 안전하지 않다.
// React.createElement(JSX가 JS로 변환된 함수)에서는 타입을 명시적으로 제공해야하는데, 이를 활용한다.
type WithChildren<T = {}> = T & { children?: React.ReactNode };

type CtaProps2<T extends CtaElements> = WithChildren<
  {
    as: T;
  } & JSX.IntrinsicElements[T]
>;

function Cta2<T extends CtaElements>({
  as: Component,
  children,
  ...props
}: CtaProps2<T>) {
  return React.createElement(Component, props, children);
}
