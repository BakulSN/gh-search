import { useEffect } from "react";
import { UseInfiniteScrollProps } from "./types";

export const useInfiniteScroll = ({
  callback,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= docHeight - threshold) {
        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, threshold]);
};
