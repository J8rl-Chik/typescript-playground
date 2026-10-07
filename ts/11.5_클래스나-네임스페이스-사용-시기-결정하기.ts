// 정적 클래스는 다음과 같이 구현할 수 있다.
const variableList: string = [];

export function variables(): string[] {}
export function setVariable(key: string, value: any): void {}
export function getValue(key: string): unknown {}

/* 
    다른 파일에서 사용
    import * as Environment from './Environment';

    console.log(Environment.variables());
*/

// 구현이 쉽다. this가 없어 간단하다. 사용하는 코드만 남고 트리 셰이킹

// 네임스페이스는 ECMAScript 모듈이 표준화되기 전에 타입스크립트에서 코드를 정리할 수 있도록 도입한 기능이다.
// 노드 모듈 내부에 있는 서드 파티 종속성의 정의를 확장할때 사용하거나 앰비언트 모듈에서 타입을 구현하고 싶을때 사용한다(지금도 그런가?)
// 이제 모듈로 나머지 자바스크립트 생태계와 호환되는 코드를 구성할 수 있다.

// 다음과 같은 추상 클래스는 유효한 자바스크립트 클래스를 생성하지만 타입스크립트에서는 인스턴스화할 수 없다.
abstract class Lifeform {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
}

const lifeform = new Lifeform(20);

// 일반 자바스크립트 코드를 구현하지만 다음의 함수처럼 타입스크립트를 활용해 암묵적 문서 형태로 정보를 제공한다면
// 의도하지 않은 상황이 발생할 수 있다.(무슨 말?)
declare function moveLifeform(lifeform: Lifeform);
// 내부적으로는 lifeform.move를 호출한다. 자바스크립트에서 인스턴스화할 수 있지만 move 메서드가 없어 깨진다.

// 프로토타입 체인에 미리 정의된 구현을 넣은 다음 예상하는 사항을 알려 주는 계약을 만드는 것이 좋다.
interface Lifeform2 {
  move(): string;
}

class BasicLifeForm {
  age: number;
  constructor(age: number) {
    this.age = age;
  }
}

class Human extends BasicLifeForm implements Lifeform2 {
  move() {
    return "walking";
  }
}

// 실수로 잘못된 클래스를 인스턴스화하는 상황은 발생하지 않는다.

// 클래스, 네임스페이스는 같은 객체(내부 상태가 객체의 기능에 가장 중요한 역할을 함)의 여러 인스턴스가 필요할때 사용한다.(무슨 말?)
