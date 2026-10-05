import React, { forwardRef, useState, type JSX } from "react";

// 기존 방식
const Button = React.forwardRef((props, ref) => {
  <button type="button" {...props} ref={ref}>
    {props.children}
  </button>;
});

/* 
  사용법
  const reference = React.createRef();
  <Button className='primary' ref={reference}/>Hello</Button> 
  */

// @types/react에서 제공하는 타입에는 React.forwardRef를 호출할 때 설정할 수 있는 제네릭 타입 매개변수를 포함한다.
type ButtonProps = JSX.IntrinsicElements["button"];

const Button2 = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    <button type="button" {...props} ref={ref}>
      {props.children}
    </button>;
  },
);

/* 
    사용법
    const reference = React.createRef<HTMLButtonElement>();
    <Button className='primary' ref={reference}>Hello</Button>
*/

// 제네릭 프로퍼티를 허용하는 컴포넌트가 있다면 상황이 조금 복잡해진다.
type ClickableListProps<T> = {
  items: [];
  onSelect: (item: T) => void;
};

function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul>
      {props.items.map((item, idx) => (
        <li>
          <button key={idx} onClick={() => props.onSelect(item)}>
            Choose{" "}
          </button>
        </li>
      ))}
    </ul>
  );
}

const items = [1, 2, 3, 4];

{
  /*
    사용법
    <ClickableList
  items={items}
  onSelect={(item) => {
   // item은 number 타입
    console.log(item);
  }}
/>; */
}

// 내부 ul요소를 참조하는 ref 만들기
function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

// 사용법
const ClickableList = React.forwardRef(ClickableListInner);

// 컴파일은 되지만 한 가지 단점이 있다. ClickableProps에 제네릭 타입 변수를 할당할 수 없다.(왜지? 기본적으로 unknown이 된다고 한다.)

// 첫 번재 방법: 타입 단언. <T>부터 함수 탑입 정의인가?
// 많은 컴포넌트로 작업할 때는 불편할 수 있다.
const ClickableList2 = React.forwardRef(ClickableListInner) as <T>(
  props: ClickableListProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => ReturnType<typeof ClickableListInner>;

// 두 번째 방법: 래퍼 컴포넌트로 사용자 정의 참조
// 래퍼 컴포넌트를 사용하면 내부 컴포넌트안에서 forwardRef를 사용하고 사용자 정의 ref 프로퍼티를 외부에 노출할 수 있다.(무슨 말?)
type ClickableListProps2<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

function ClickableList3<T>(props: ClickableListProps2<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {items}
        </li>
      ))}
    </ul>
  );
}

function ClicakbleListInner<T>(
  props: ClickableListProps2<T>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {items}
        </li>
      ))}
    </ul>
  );
}

const ClickableListWithRef = forwardRef(ClicakbleListInner);

type ClickableListWithRefProps<T> = ClickableListProps2<T> & {
  mRef?: React.Ref<HTMLUListElement>;
};

function ClickableList3<T>({ mRef, ...props }): ClickableListWithRefProps<T> {
  return <ClickableListWithRef ref={mRef} {...props} />;
}

// 세번째 방법: 고차 함수 타입 인퍼런스
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

type ClickableListProps3<T> = {
  items: T[];
  onSelect: (item: T) => void;
};

function ClickableListInner2<T>(
  props: ClickableListProps<T>,
  ref: React.ForwardedRef<HTMLUListElement>,
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

const ClickableList4 = React.forwardRef(ClickableListInner2);
