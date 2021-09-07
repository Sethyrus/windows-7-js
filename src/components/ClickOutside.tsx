import { cloneElement, useEffect, useRef } from "react";

const ClickOutside: React.FC<ClickOutsideProps> = ({ children, onClick }) => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (onClick && !ref?.current?.contains(e.target as Node)) {
        onClick(e);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick]);

  return cloneElement(children, { ref });
};

export default ClickOutside;
