type Metrics = {
  ttfb: number;
  fcp: number;
  si: number;
};

type MetricCollection = {
  [domain in string]?: Metrics;
};

const emptySet: MetricCollection = {};
emptySet[1].fcp;

type ElementCollection = {
  [y: number]: HTMLElement | undefined;
  get(index: number): HTMLElement | undefined;
  length: number;
  filter(callback: (element: HTMLElement) => boolean): ElementCollection;
};

type StringDictionary = {
  [index: string]: string | number;
  count: number;
};
