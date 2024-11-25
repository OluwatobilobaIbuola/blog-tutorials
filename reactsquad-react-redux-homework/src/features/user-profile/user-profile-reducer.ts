import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { complement, isNil, pipe, prop } from "ramda";
import { UserProfile } from "./user-profile-types";
import { RootState } from "@/redux/store";

const slice = "userProfile";
const initialState: { currentUserId: string; user: UserProfile | null } = {
  currentUserId: "",
  user: null,
};

export const userProfileSlice = createSlice({
  name: slice,
  initialState,
  reducers: {
    setCurrentUserProfile: (state, { payload }: PayloadAction<any>) => {
      state.currentUserId = payload.id;
      state.user = payload;
    },
    removeCurrentUserProfile: (state) => {
      state.user = null;
      state.currentUserId = "";
    },
  },
});

export const { setCurrentUserProfile, removeCurrentUserProfile } =
  userProfileSlice.actions;

export const reducer = userProfileSlice.reducer;

export type UserProfileState = ReturnType<typeof reducer>;

/**
 * SELECTORS
 */

const getUserProfileSlice = (state: RootState) => state[slice];

/**
 * Current user
 */

const getCurrentUserId = pipe(
  getUserProfileSlice,
  prop<"currentUserId">("currentUserId")
);
const getCurrentUser = pipe(getUserProfileSlice, prop<"user">("user"));

/**
 * Is authenticated
 */

const getIsAuthenticated = pipe(getCurrentUser, complement(isNil));

export { getCurrentUserId, getIsAuthenticated, slice, getCurrentUser };
