import { ButtonCTA } from "./ButtonCTA";
import { Circles } from "./Circles";
import { Lines } from "./Lines";
import { motion } from "framer-motion";

export const Pin = ({ mouseX, mouseY }: any) => {
  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
      className="pointer-events-none  w-96 h-80 flex items-center justify-center opacity-0 group-hover:opacity-100 z-[60]"
    >
      <div className=" w-full h-full -mt-7 flex-none  inset-0">
        <ButtonCTA />

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <Circles />
        </div>

        <Lines />
      </div>
    </motion.div>
  );
};
