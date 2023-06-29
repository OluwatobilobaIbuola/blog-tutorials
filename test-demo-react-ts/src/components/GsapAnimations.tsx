import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GsapComponent = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const app = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  const fadeOut = () => {
    tl.current
      ?.to(boxRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.5,
      })
      .reversed(!tl.current?.reversed());
  };
  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector && self.selector(boxRef.current);
      tl.current = gsap
        .timeline()
        .from(boxes, {
          opacity: 0,
          x: -100,
          duration: 1,
          delay: 0.5,
        })
        .to(boxes, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: "Expo.easeInOut",
        });
    }, app);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="" ref={app}>
      <div
        ref={boxRef}
        style={{ width: "100px", height: "100px", backgroundColor: "red" }}
      >
        Animation Example
      </div>
      <br />
      <button onClick={() => fadeOut()}>Fade</button>
    </div>
  );
};

export default GsapComponent;
