import React, { useState, useEffect } from "react";

export default function Debounce() {
  // console.log(process);
  // console.log(navigator.userAgent);
  const debounce = (fn: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...arg: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...arg);
      }, delay);
    };
  };

  const handleChange = debounce((e: any) => {
    console.log(e.target.value);
  }, 1000);
  return (
    <>
      <div>
        <h1>Debounce</h1>
        <input onChange={(e) => handleChange(e)} />
      </div>
    </>
  );
}
