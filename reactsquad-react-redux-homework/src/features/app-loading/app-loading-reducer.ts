import { RootState } from "@/redux/store";
import { ApiError, DataResponse } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { not, pipe, prop } from "ramda";

const slice = "appLoading";
const initialState = {
  appIsLoading: true,
  successToast: { showToast: false, message: "", title: "Success" },
  errorToast: { showToast: false, message: "", title: "Error" },
};

export const appSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    finishAppLoading: (state) => {
      state.appIsLoading = false;
    },
    handleResetToast: (state) => {
      state.successToast.showToast = false;
      state.errorToast.showToast = false;
    },
    handleSuccessToast: (state, action: PayloadAction<DataResponse<any>>) => {
      state.successToast.showToast = true;
      state.successToast.message = action.payload.message;
    },
    handleErrorToast: (state, action: PayloadAction<ApiError<any>>) => {
      state.errorToast.showToast = true;
      state.errorToast.message =
        (action.payload as any)?.data?.message ||
        (action.payload as any)?.response?.data?.message ||
        (action.payload as any).message ||
        (action.payload as any).data?.body?.message ||
        "Error Processing Request. Try again.";
    },
  },
});

export const {
  finishAppLoading,
  handleSuccessToast,
  handleErrorToast,
  handleResetToast,
} = appSlice.actions;
export const reducer = appSlice.reducer;

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
const getShowSuccessToast = pipe(
  getAppLoadingSlice,
  prop<"successToast">("successToast")
);
const getShowErrorToast = pipe(
  getAppLoadingSlice,
  prop<"errorToast">("errorToast")
);

export { getAppFinishedLoading, slice, getShowSuccessToast, getShowErrorToast };
