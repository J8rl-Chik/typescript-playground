// 반환 타입이 더 많은 프로퍼티를 가지는 객체(하위 타입)일 수 있어 에러 발생.
// function createRootItem<T extends TreeItem>(): T {
//   return {
//     id: "root",
//     children: [],
//   };
// }

// 간단하게 해결 가능한 방법.
// function attachToRoot(children: TreeItem[]): TreeItem {
//   return {
//     id: "root",
//     children: [],
//   };
// }

// attachToRoot([]); // TreeItem 반환 타입

type BaseTreeItem = {
  id: string;
  children: BaseTreeItem[];
};

type TreeItem<Children extends TreeItem = BaseTreeItem> = {
  id: string;
  children: Children[];
  collapsed?: boolean;
};

function attachToRoot<T extends TreeItem>(children: T[]): TreeItem<T> {
  return {
    id: "root",
    children,
  };
}

const root = attachToRoot([
  { id: "child", children: [], collapsed: false, marked: true },
]);
