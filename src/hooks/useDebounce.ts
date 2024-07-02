import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //after every say->200ms set the debounce value
    const intervalId = setInterval(() => {
      setDebouncedValue(value);
    }, delay);
    //if value changes before delay clean up the old interval.
    return () => {
      clearInterval(intervalId);
    };
  }, [value, delay]);

  return debouncedValue;
};
