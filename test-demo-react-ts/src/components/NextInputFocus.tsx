import React, { useState, useEffect, useRef } from "react";

const MyComponent = () => {
  const [value, setValue] = useState("");
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const clearupRef = inputsRef.current;
    const handleKeyUp = (e: KeyboardEvent) => {
      const target = e.target as HTMLInputElement;
      if (target.value.length >= target.maxLength) {
        const next = target.nextElementSibling as HTMLInputElement;
        if (next) {
          next.focus();
          next.setSelectionRange(0, next.value.length);
        }
      }
    };

    inputsRef.current.forEach((input) => {
      input.addEventListener("keyup", handleKeyUp);
    });

    return () => {
      clearupRef.forEach((input) => {
        input.removeEventListener("keyup", handleKeyUp);
      });
    };
  }, []);

  return (
    <div>
      {Array.from(inputsRef.current).map((input, index) => (
        <input
          key={index}
          type="text"
          maxLength={Number(input.getAttribute("maxLength"))}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={(el) => (inputsRef.current[index] = el!)}
        />
      ))}
    </div>
  );
};

export default MyComponent;
