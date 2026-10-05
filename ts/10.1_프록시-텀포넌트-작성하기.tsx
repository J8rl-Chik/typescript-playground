import { JSX } from "react";

// React.ElementType도 있지만, JSX.IntrinsicElements로 충분하며, 컴포넌트가 프리액트와도 호환된다.
type ButtonProps = JSX.IntrinsicElements["button"];

function Button(props: ButtonProps) {
  return <button type="button" {...props} />;
}

// 재정의하지 말아야할 키 삭제하기
type ButtonProps2 = Omit<JSX.IntrinsicElements["button"], "type">;

function Button2(props: ButtonProps) {
  return <button type="button" {...props} />;
}

const aButton = <Button2 type="button">Hi</Button2>;

// submit할 type이 필요하면 다른 프록시 컴포넌트를 만든다.
type SubmitButtonProps = Omit<JSX.IntrinsicElements["button"], "type">;

function SubmitButton(props: SubmitButtonProps) {
  return <button type="submit" {...props} />;
}

// 더 많은 프로퍼티를 미리 설정하고 싶다면 프로퍼티 생략 기능을 확장한다.
type StyleButton = Omit<
  JSX.IntrinsicElements["button"],
  "type" | "primary" | "secondary"
> & {
  type: "primary" | "secondary";
};

function StyleButton({ type, ...allProps }: StyleButton) {
  return <Button type="button" className={`btn-${type}`} {...allProps} />;
}

// 특정 프로퍼티를 삭제하고 설정을 필수로하는 제네릭
type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type ImgProps = MakeRequired<JSX.IntrinsicElements["img"], "alt" | "src">;

export function Img(props: ImgProps) {
  return <img {...props} />;
}

const anImage = <Img />; //에러
