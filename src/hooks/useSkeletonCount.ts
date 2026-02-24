"use client";

import { useEffect, useState } from "react";

export function useSkeletonCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const width = window.innerWidth;

      let columns = 1;
      if (width >= 1024) columns = 3;
      else if (width >= 768) columns = 2;

      const rows = Math.ceil(window.innerHeight / 220);
      setCount(columns * rows);
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return count;
}