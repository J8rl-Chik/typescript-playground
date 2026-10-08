class Toggler {
  @logField #toggled = false;

  @log // 이거 뭐지?
  toggle() {
    this.#toggled = !this.#toggled;
  }
}

// 데코레이터는 객체 인스턴스의 컨텍스트에서 실행돼서 this를 설정해야한다.
function log<This, Args extends any[], Return>(
  value: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext,
): (this: This, ...args: Args) => Return {
  return function (this: This, ...args: Args) {
    console.log(`calling ${context.name.toString()}`);
    const val = value.call(this, ...args);
    console.log(`called ${context.name.toString()}: ${val}`);

    return val;
  };
}

type FieldDecoratorFn = (val: any) => any;

function logField<Val>(
  value: undefined,
  context: ClassFieldDecoratorContext,
): FieldDecoratorFn {
  return function (initialValue: Val): Val {
    console.log(`Initializing ${context.name.toString()} to ${initialValue}`);

    return initialValue;
  };
}

// 호출이 따로 필요없나?