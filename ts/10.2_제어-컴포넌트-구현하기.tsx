// input의 value 속성 처리하기
// 1. value 대신 defaultValue를 프로퍼티로 첫 렌더링만하고 이후에는 모든 처리를 브라우저에 맡긴다.
// 2. useState, onChange로 리액트에서 상태로 관리한다.

// 리액트는 런타임에 비제어에서 제어로 전환할때 경고를 표시한다.
// 컴파일 시 정의된 문자열 value를 제공하거나 defaultValue를 제공하면 이 경고를 방지할 수 있다.
import React, { useState, type JSX } from "react";

type OnlyRequired<T, K extends keyof T = keyof T> = Required<Pick<T, K>> &
  Partial<Omit<T, K>>;

type ControlledProps = OnlyRequired<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  defaultValue?: never;
};

type UncontrolledProps = Omit<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  defaultValue: string;
  value?: never;
  onChange?: never;
};

type InputProps = ControlledProps | UncontrolledProps;

function Input({ ...allProps }: InputProps) {
  return <input {...allProps} />;
}

function Controlled() {
  const [val, setVal] = useState("");

  return <Input value={val} onChange={(e) => setVal(e.target.value)} />;
}

function Uncontrolled() {
  return <Input defaultValue={"hello"} />;
}
