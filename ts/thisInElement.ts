const button = document.querySelector("button");
button?.addEventListener("click", function () {
  // this는 button 요소를 가리킴
  console.log(this);
});

button?.addEventListener("click", handleToggle);

function handleToggle(this: HTMLButtonElement) {
  // 컴팡일 후 this 제거
  console.log(this);
}
