import React, { useState, type JSX } from "react";

const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};

const Body = () => {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <>
      /* useToggle의 반환 타입 때문에 에러가난다. */
      <button onClick={toggleVisible}></button>
      {isVisible && <div>World</div>}
    </>
  );
};

// 반환 타입을 추가한다.
const useToggle2 = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue];
};

const Body2 = () => {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <>
      /* useToggle의 반환 타입 때문에 에러가난다. */
      <button onClick={toggleVisible}></button>
      {isVisible && <div>World</div>}
    </>
  );
};

// as const를 사용하는 방법도 있다.
const useToggle3 = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);

  return [value, toggleValue] as const;
};
