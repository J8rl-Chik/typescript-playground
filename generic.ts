type Languages = {
  de: URL;
  en: URL;
};

function isLanguageAvailable(
  collection: Languages,
  lang: string,
): lang is keyof Languages {
  return lang in collection;
}

type AllowElement = {
  video: HTMLVideoElement;
  audio: HTMLAudioElement;
};

function isElementAllowed(
  collection: AllowElement,
  elem: string,
): elem is keyof AllowElement {
  return elem in collection;
}

function isAvailable<Obj extends object>(
  obj: Obj,
  key: string | number | symbol,
): key is keyof Obj {
  return key in obj;
}

function loadLanguage(collection: Languages, lang: string) {
  if (isAvailable(collection, lang)) {
    collection[lang];
  }
}

function selectElement(collection: AllowElement, elem: string) {
  if (isAvailable(collection, elem)) {
    collection[elem];
  }
}
