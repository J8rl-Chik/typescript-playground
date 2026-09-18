type SelectBase = {
  options: string[];
};

type SingleSelect = SelectBase & {
  value: string;
};

type MultiSelect = SelectBase & {
  values: string[];
};

type SelectProperties = SingleSelect | MultiSelect;

function selectCallback(params: SelectProperties) {
  if ("value" in params) {
  } else if ("valuse" in params) {
  }
}

selectCallback({
  options: ["dracula", "monokai", "vscode"],
  value: "dracula",
});

selectCallback({
  options: ["dracula", "monokai", "vscode"],
  values: ["dracula", "vscode"],
});

// 구조적 타입 시스템으로 인해 아래 코드도 작동한다.
selectCallback({
  options: ["dracula", "monokai", "vscode"],
  values: ["dracula", "vscode"],
  value: "dracula",
});

// 이런 상황을 막기 위해 선택형 never 기법을 이용한다.
type SelectBase2 = {
  options: string[];
};

type SingleSelect2 = SelectBase2 & {
  value: string;
  values?: never;
};

type MultiSelect2 = SelectBase2 & {
  value?: never;
  values: string[];
};

type SelectProperties2 = SingleSelect2 | MultiSelect2;

function selectCallback2(params: SelectProperties2) {
  if ("value" in params) {
  } else if ("values" in params) {
  }
}

// 에러가 뜬다.
selectCallback2({
  options: ["dracula", "monokai", "vscode"],
  //   values: ["dracula", "vscode"],
  value: "dracula",
});
