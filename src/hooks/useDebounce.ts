let timerId: NodeJS.Timeout;

export const useDebounce = (delay = 500) => {
  const handleSetDebounce = (callback: () => any) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback();
    }, delay);
  };

  return handleSetDebounce;
};
