import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "lazy" | "eager" | "auto";
    alt: string;
  }
}

// declare 모듈, 네임스페이스는 무슨 차이지? 그 밖에 다른 용어가 있나?
