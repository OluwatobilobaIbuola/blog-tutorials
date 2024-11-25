import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pipe, prop } from "ramda";

const slice = "userAuthentication";
const initialState = { isAuthenticating: false, token: "" };

export const userSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    login: (
      state,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      state.isAuthenticating = true;
    },
    userIsSignedIn: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.token = payload.token;
    },
    stopAuthenticating: (state) => {
      state.isAuthenticating = false;
    },
    userIsSignedOut: (state) => {
      state.token = "";
    },
  },
});

export const reducer = userSlice.reducer;
export const { login, stopAuthenticating, userIsSignedIn, userIsSignedOut } =
  userSlice.actions;
export type UserAuthenticationState = ReturnType<typeof reducer>;

/**
 * SELECTORS
 */

const getUserAuthenticationSlice = (state: RootState) => state[slice];

const getAuthenticationIsLoading = pipe(
  getUserAuthenticationSlice,
  prop<"isAuthenticating">("isAuthenticating")
);
const getUserTokenSlice = pipe(
  getUserAuthenticationSlice,
  prop<"token">("token")
);

export { getAuthenticationIsLoading, slice, getUserTokenSlice };
