import { useState, useEffect } from "react";

export const useMousePointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: MouseEvent) {
    setPosition({ x: event.clientX, y: event.clientY });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};
