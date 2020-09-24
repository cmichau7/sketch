export const debounce = (fn: <T>() => T | void, ms = 0): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function deb(...args): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(deb, args), ms);
  };
};
