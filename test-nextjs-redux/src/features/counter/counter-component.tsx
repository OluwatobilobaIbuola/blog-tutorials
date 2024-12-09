import React from "react";
import { PropsFromRedux } from "./counter-container";
import { useDispatch } from "react-redux";
export const CounterComponent = ({
  decrementAsync,
  incrementAsync,
  counter = 0,
}: PropsFromRedux) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{counter}</h1>
      <div className="flex gap-x-8 items-center">
        <button
          className="p-2 border border-[black]"
          onClick={() => dispatch(incrementAsync(2))}
        >
          Increment after 1 second
        </button>
        <button
          className="p-2 border border-[black]"
          onClick={() => dispatch(decrementAsync(2))}
        >
          Decrement after 1 second
        </button>
      </div>
    </div>
  );
};
