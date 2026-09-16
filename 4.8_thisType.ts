const instance = create({
  data() {
    return {
      firstName: "Stefan",
      lastName: "Baumgartner",
    };
  },

  coputed: {
    fullName() {
      // data 반환 객체에 접근 가능
      return this.firstName + " " + this.lastName;
    },
  },

  method: {
    hi() {
      // 계산된 프로퍼티를 사용
      alert(this.fullName.toLowerCase());
    },
  },
});

/* 
반환 타입 추론의 모호성: 메서드 선언에서 this 타입을 명시하면 TypeScript는 해당 메서드의 컨텍스트(함수 호출 context)를 먼저 제한합니다. 
이 과정에서 반환 타입인 Data가 어떤 타입으로 매핑되어야 하는지 추론하는 대상에서 제외되거나 타입 추론 우선순위가 뒤로 밀리게 됩니다.
this의 바인딩 제약: this: {}는 함수 내부에서 this가 최소한 객체 형태여야 함을 강제하지만, 
generic 타입인 Data를 반환하는 함수 타입과의 관계를 해석할 때 제네릭 매개변수 Data를 결정할 기준값을 찾지 못하게 됩니다.
type Options<Data> = {
    data(this: {})?: Data;
}
*/

/* 
Data 플레이홀더는 실제 객체 타입으로 치환된다는데 무슨 의미?
this가 빈 객체를 가리키도록 설정했는데, 이는 설정 객체에서 다른 프로퍼티에 접근하지 않음을 의미한다는게 뭔 말?
*/
type Options<Data> = {
  data?: (this: {}) => Data;
};

// Computed의 this는 Data의 모든 프로퍼티로 바뀐다.
type Options2<Data, Computed> = {
  data?: (this: {}) => Data;
  computed?: Computed & ThisType<Data>;
};

/* 
    methods는 this로 Data에 접근할 수 있을 뿐 아니라 프로퍼티로 모든 계산된 프로퍼티와 메서드에 접근할 수 있는 특이한 프로퍼티다.
    Computed는 모든 계싼된 프로퍼티를 함수로 보관한다. 하지만 이들의 값(함수들의 반환값)이 필요하다. fullName에 접근하면 string일 것이라 예상한다.

*/
type FnObj = Record<string, () => any>;

type MapFnToProp<FunctionObj extends FnObj> = {
  [K in keyof FunctionObj]: ReturnType<FunctionObj[K]>;
};

/* 
MapFnToProp을 이용해 새로 추가된 Method라는 제네릭 타입 매개변수에 ThisType을 설정할 수 있다.
Computed 제네릭 타입 매개변수를 MapFnToProp으로 전달하려면 타입 매개변수를 FnObj로 제약(MapFnToProp의 첫 매개변수 FunctionObj와 같은 제약)을 해야한다.
*/
type Options3<Data, Computed extends FnObj, Methods> = {
  data?: (this: {}) => Data;
  computed?: Computed & ThisType<Data>;
  methods?: Methods & ThisType<Data & MapFnToProp<Computed> & Methods>;
};

// declarer가 뭐지? 아래 코드를 활용한 함수 예제가 필요하다.
declare function create<Data, Computed extends FnObj, Methods>(
  options: Options3<Data, Computed, Methods>,
): any;
