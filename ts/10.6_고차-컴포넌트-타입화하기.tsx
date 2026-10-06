type CardProps = {
  title: string;
  content: string;
};

function Card({ title, content }: CardProps) {
  return (
    <>
      <h2>{title}</h2>
      <div>{content}</div>
    </>
  );
}

function withInjectedProps<T extends {}, U extends T>(
  injected: T,
  Component: React.ComponentType<U>,
) {
  return function (props: Omit<U, keyof T>) {
    const newProps = { ...injected, ...props } as U;

    return <Component {...newProps} />;
  };
}

const Info = withInjectedProps({ title: "Info" }, Card);

const App = () => {
  return (
    <>
      <Info content="Your task" />;
      <Info content="Your task" title="warning" />;
    </>
  );
};

// 파생 컴포넌트
function withTitle<U extends { title: string }>(
  title: string,
  Component: React.ComponentType<U>,
) {
  return withInjectedProps({ title }, Component);
}
