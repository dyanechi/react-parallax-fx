import { useState, useLayoutEffect } from "react";

export function useWindowScrollPosition(precision: number) {
  const [scrollPosition, setPosition] = useState(0);
  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(Math.floor(window.pageYOffset / precision) * precision);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
}
