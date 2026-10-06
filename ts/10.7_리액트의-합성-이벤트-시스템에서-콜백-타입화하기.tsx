import React from "react";

type WithChildren<T = {}> = T & { children?: React.ReactNode };

type ButtonProps = {
  // 리액트는 합성 이벤트라는 자체 이벤트 시스템을 사용한다.
  //   event에 MouseEvent타입을 설정하면 에러가난다.
  onClick: (event: React.MouseEvent) => void;
} & WithChildren;

// div 태그에서 발생하는 마우스 이벤트를 막고싶다.
type ButtonProps2 = {
  onClick: (event: React.MouseEvent<HTMLButtonElement) => void;
} & WithChildren;

function Button({onClick, children}: ButtonProps2) {
    return <button onClick={onClick}>{children}</button>
}

function handleClick(event:React.MouseEvent<HTMLButtonElement | HTMLAnchorElement) {
    console.log(event.currentTarget.tagName)
}

const App = () => {
    return <>
        <Button onClick={handleClick}>Works</Button>
        <a href="/" onClick={handleClick}>Works</a>
        <div onClick={handleClick}></div>  // 에러
    </>
}

// @types/react는 브라우저 InputEvent를 지원하지 않는다. 그래서 SyntheticEvent를 사용한다.