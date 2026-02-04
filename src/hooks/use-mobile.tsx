import * as React from "react";

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
    };
    
    window.addEventListener("resize", checkTablet);
    checkTablet();
    return () => window.removeEventListener("resize", checkTablet);
  }, []);

  return !!isTablet;
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<"mobile" | "tablet" | "desktop">("desktop");

  React.useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    
    window.addEventListener("resize", checkDevice);
    checkDevice();
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
}
