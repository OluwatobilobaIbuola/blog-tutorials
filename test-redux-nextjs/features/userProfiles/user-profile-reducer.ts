// Create a reducer that has normalized users and has a current user id.
// users: { [id]: user }

// Two actions:
// 1. loginedSucceeded which takes in the user as a payload
// then puts into the store sets it as the current user.
// 2. usersFetched which takes in an array of users and
// should add them to the store.

import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { converge, pipe, prop, propOr } from "ramda";

type User = {
  id: string;
  email: string;
};
type Users = {
  [id: string]: User;
};
type InitialState = {
  users: Users;
  currentUserId: string;
};
const initialState: InitialState = {
  users: {} as Users,
  currentUserId: "",
};
export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {
    loginedSucceeded: (state, { payload }: PayloadAction<User>) => {
      state.currentUserId = payload.id;
      state.users = { [payload.id]: payload };
    },
    usersFetched: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload.reduce((acc, el) => {
        return { ...acc, [el.id]: el };
      }, state.users);
    },
  },
});

export const reducer = userProfileSlice.reducer;

// Selectors:
// 1. Create a selector called selectCurrentUser that returns the current user.
// 2. Create a selector called selectCurrentUsersEmail that return the current users email.
// 3. Create a selector called selectUserById that takes in an id as a prop and returns the given user with that id.

const selectUserProfileSlice = (state: RootState) => prop("userProfile")(state);

const selectCurrentUserId = pipe(selectUserProfileSlice, prop("currentUserId"));

const selectUsers = pipe(selectUserProfileSlice, prop("users"));

//@ts-ignore
const selectCurrentUser = converge(prop, [selectCurrentUserId, selectUsers]);

const selectCurrentUsersEmail = pipe(selectCurrentUser, propOr("", "email"));

const selectUserById = (id: string) => pipe(selectUsers, prop(id));

const selectIsLoggedIn = pipe(selectCurrentUserId, Boolean);