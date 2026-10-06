import React, { forwardRef, useContext, useState, type JSX } from "react";

// 컨텍스트 생성
const AppContext = React.createContext({
  authenticated: true,
  lang: "en",
  theme: "dark",
});

// 기본값이 있을 떄
function App() {
  return (
    <AppContext.Provider
      value={{ authenticated: true, lang: "en", theme: "dark" }}
    ></AppContext.Provider>
  );
}

// 기본값이 없거나 설정하려는 프로퍼티를 유연하게 조정할 떄
type ContextProps = {
  authenticated: boolean;
  lang: string;
  theme: string;
};

const AppContext2 = React.createContext<Partial<ContextProps>>({});

// 하지만 undefined 값을 확인해야한다.

function Header() {
  const { authenticated, lang } = useContext(AppContext2);

  if (authenticated && lang) {
    return (
      <>
        <h1>Logged in</h1>
        <p>your language</p>
      </>
    );
  }

  return <h1>don't have language</h1>;
}

// 기본값을 제공할 수 없고 컨텍스트 제공자가 모든 프로퍼티를 공급하도록 하려면 헬퍼 함수를 사용한다.
function createContext<Props extends {}>() {
  const ctx = React.createContext<Props | undefined>(undefined);

  function useInnerCtx() {
    const c = useContext(ctx);

    if (c === undefined) {
      throw new Error();
    }

    return c;
  }

  return [useInnerCtx, ctx.Provider as React.Provider<Props>] as const;
}

const [useAppContext, AppContextProvider] = createContext<ContextProps>();

function App2() {
  return (
    <AppContextProvider
      value={{ lang: "en", theme: "dark", authenticated: true }}
    ></AppContextProvider>
  );
}

function Header2() {
  const { authenticated } = useAppContext();

  if (authenticated) {
    return <h1>logged in</h1>;
  }
}
