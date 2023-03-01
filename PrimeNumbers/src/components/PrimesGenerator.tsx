import React, { useEffect, useRef, useState } from "react";
import { countPrimes } from "../utils/utils";

export const PrimesGenerator = () => {
  const [primes, setPrimes] = useState<Array<String[]>>([]);
  const loader = useRef(null);
  const scroll = useRef(null);
  const observer = useRef(new IntersectionObserver(lazyGeneratingHandler));
  const primesArr = countPrimes(2000000000);

  function lazyGeneratingHandler(entries: IntersectionObserverEntry[]) {
    const target = entries[0];
    if (target.isIntersecting) {
      if (!primesArr.next().done) {
        return setPrimes([...batchGenerate()]);
      }
    }
  }

  function batchGenerate() {
    let initialData: String[][] = [];

    // for of will close generator when break
    for (let i = 0; i < 50; i++) {
      initialData = primesArr.next().value;
    }
    return initialData;
  }

  useEffect(() => {
    // generate initial data
    setPrimes(batchGenerate);
    if (loader.current) observer.current.observe(loader.current);
  }, []);

  return (
    <div ref={scroll} id="scroll-box">
      {primes &&
        primes.length !== 0 &&
        primes.map((item, index) => (
          <div style={{ wordWrap: "break-word" }} key={index}>
            {item.join(",")}
          </div>
        ))}
      <div ref={loader} />
    </div>
  );
};
