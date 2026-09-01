let i = void 2;

// 즉시 실행 함수를 호출할때 활용
void (function () {
  console.log("hello");
})();

// 전역 네임스페이스를 오염시키지 않음
void (function aRecursion(i) {
  if (i > 0) {
    console.log(i--);
    aRecursion(i);
  }
})(3);

console.log(typeof aRecursion); // undefined

// 값을 반환하지 않고 콜백을 호출하는 함수를 반환하도록 가능
function middleware(nextCallback) {
  if (conditionApplies()) {
    return void nextCallback();
  }
}
