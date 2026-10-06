abstract class FilterItem {
  constructor(private property: string) {}
  someFunction() {}
  abstract filter(): void;
}

class AFilter extends FilterItem {
  filter() {}
}

class BFilter extends FilterItem {
  filter() {}
}

// 동작함
const some: FilterItem = new AFilter("afilter");

// 인스턴스로 바로 작업하지 않을 때 상황
declare const filterMap: Map<string, typeof FilterItem>;

filterMap.set("number", AFilter);
filterMap.set("stuff", BFilter);

let obj: FilterItem;
const ctor = filterMap.get("number");

if (typeof ctor !== "undefined") {
  // 추상 클래스 에러
  obj = new ctor();
}

// 추상클래스의 인터페이스 모양
interface IFilter {
  new (property: string): IFilter;
  someFunction(): void;
  filter(): void;
}

// 자바스크립트는 두 가지 타입(정적 측면 타입, 인스턴스 측면 타입)을 포함한다.(무슨 말?)
function AFilter(property) {
  // 정적 측면 타입
  this.property = property; // 인스턴스 측면 타입
}

AFilter.prototype.filter = function () {};

// 두 개의 타입으로 분할한다.
// 생성자 인터페이스는 모든 정적 프로퍼티와 생성자 함수를 포함한다.
// IFilter는 인스턴스 측의 타입 정보를 포함한다.
interface FileConstructor {
  new (property: string): IFilter;
}

interface IFilter {
  someFunction(): void;
  filter(): void;
}

declare const filterMap2: Map<string, FileConstructor>;

filterMap2.set("number", AFilter);
filterMap2.set("stuff", AFilter);

let obj2: IFilter;
const ctor2 = filterMap2.get("number");

if (typeof ctor !== "undefined") {
  obj2 = new ctor2("a"); // 필요한건 IFilter 인스턴스
}

filterMap2.set("notworking", FilterItem); // 에러
