import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setIsMobile(window.innerWidth < breakpoint);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [breakpoint]);

  return isMobile;
}
