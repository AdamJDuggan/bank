import { useState, useEffect } from "react";

function useWindowWidth() {
  const [screenWidth, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    setWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let width = {
    width: screenWidth,

    isMobile: screenWidth <= 479,
    isTablet: screenWidth <= 767,
    isDesktop: screenWidth <= 991,
  };

  return width;
}

export default useWindowWidth;
