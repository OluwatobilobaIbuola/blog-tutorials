import React from "react";
import { motion, useMotionValue } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Pin } from "./Pin";

export const AnimatedPinMoving = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }
  return (
    <div className="h-[40rem] w-full flex items-center justify-center bg-black">
      <div className="relative group z-50">
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0deg)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            style={{
              opacity: 1,
              transform: `translate(-50%,-50%) skewX(-48deg) skewY(14deg) scaleX(2) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            onMouseMove={handleMouseMove}
            className="absolute left-1/2 p-4 top-1/2  md:h-96 w-60 h-60 md:w-96 flex justify-center items-center  rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-slate-800"
          >
            <div className={twMerge("text-slate-200 text-base  mx-auto")}>
              <h1 className="text-center bg-gradient-to-br bg-clip-text text-xl md:text-6xl text-transparent from-[#FFFF92] to-[#EE8912] !pt-4">
                Bring your ideas to life
              </h1>
            </div>
          </motion.div>
        </div>
        <Pin mouseX={mouseX} mouseY={mouseY} />
      </div>
    </div>
  );
};
