"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function Spinner() {
  return (
    <motion.p
      variants={rotate}
      animate="show"
      className={cn(`border-foreground border-b-[transparent]
rounded-[50%] flex mx-auto w-[50px] h-[50px] border-[6px]`)}
    />
  );
}

const rotate = {
  show: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
};
