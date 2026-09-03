type Settings = {
  language: "en" | "de" | "fr";
  theme?: "dracula" | "monokai" | "github";
};

function getTheme(settings: Settings) {
  //   if ("theme" in settings) {
  //     return settings.theme;
  //   }

  //   return "default";

  return settings.theme ?? "default";
}

const settings: Settings = {
  language: "de",
};

const settingsUndefinedTheme: Settings = {
  language: "de",
  theme: undefined,
};

console.log(getTheme(settings)); // 'default'
console.log(getTheme(settingsUndefinedTheme)); // undefined
