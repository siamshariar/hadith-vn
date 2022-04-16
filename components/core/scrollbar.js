import { useEffect, useRef } from "react";
import styles from "./scrollbar.module.scss";

export default function Scrollbar({ children, className, scrollPos, id }) {
  const scrollbar = useRef(null);

  useEffect(() => {
    if (scrollPos) {
      scrollbar.current.scrollTo({
        top: scrollPos,
        left: 0,
        // behavior: "smooth",
      });
    }
  }, [id, scrollPos]);

  return (
    <div className={`${styles.scrollbar} ${className}`} ref={scrollbar}>
      {children}
    </div>
  );
}
