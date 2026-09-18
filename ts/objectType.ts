let okObj: {} = {
  toString() {
    return false;
  },
};

let obj: Object = {
  toString() {
    // Object 프로토타입의 toString는 string을 반환해야 하는데, false를 반환해서 에러
    return false;
  },
};
