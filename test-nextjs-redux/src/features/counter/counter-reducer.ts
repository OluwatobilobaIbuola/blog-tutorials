import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    incrementAsync: (state, { payload }: PayloadAction<number>) => {
      state.counter += payload;
    },
    decrementAsync: (state, { payload }: PayloadAction<number>) => {
      state.counter -= payload;
    },
  },
});

export const { increment, decrement, incrementAsync, decrementAsync } =
  counterSlice.actions;

export default counterSlice.reducer;
