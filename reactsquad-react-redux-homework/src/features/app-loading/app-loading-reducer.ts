import { RootState } from "@/redux/store";
import { ApiError, DataResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { not, pipe, prop } from "ramda";

const slice = "appLoading";
const initialState = {
  appIsLoading: true,
};

export const appSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    finishAppLoading: (state) => {
      state.appIsLoading = false;
    },
  },
});

export const { finishAppLoading } = appSlice.actions;
const reducer = appSlice.reducer;

export type AppLoadingState = ReturnType<typeof reducer>;

/**
 * SELECTORS
 */

const getAppLoadingSlice = (state: RootState) => state[slice];

const getAppFinishedLoading = pipe(
  getAppLoadingSlice,
  prop<"appIsLoading">("appIsLoading"),
  not
);

export { getAppFinishedLoading, slice };
