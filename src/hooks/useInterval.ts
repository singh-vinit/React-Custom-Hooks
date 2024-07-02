import { useEffect } from "react";

export const useInterval = (callbackFn: () => void, delay: number) => {
  useEffect(() => {
    const intervalId = setInterval(callbackFn, delay);
    return () => {
      clearInterval(intervalId);
    };
  }, [callbackFn, delay]);
};
