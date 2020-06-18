import { useEffect, useRef, useState } from "react";

const useShowHide = (isOpen, duration = 500) => {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(false);

  const timeout = useRef();

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      timeout.current = setTimeout(setShow, 30, true);
    } else {
      setShow(false);
      timeout.current = setTimeout(setRender, duration, false);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [isOpen]);

  return { show, render };
};

export default useShowHide;
