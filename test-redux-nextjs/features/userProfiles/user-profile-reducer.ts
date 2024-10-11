// Create a reducer that has normalized users and has a current user id.
// users: { [id]: user }
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { converge, pipe, prop, propOr } from "ramda";

type User = {
  id: number;
  email: string;
};
type Users = {
  [id: string]: User;
};
type InitialState = {
  users: Users;
  currentUserId: number | null;
};
const initialState: InitialState = {
  users: {} as Users,
  currentUserId: null as User["id"] | null,
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

// Two actions:
// 1. loginedSucceeded which takes in the user as a payload
// then puts into the store sets it as the current user.
// 2. usersFetched which takes in an array of users and
// should add them to the store.

// Selectors:
// 1. Create a selector called selectCurrentUser that returns the current user.
// 2. Create a selector called selectCurrentUsersEmail that return the current users email.
// 3. Create a selector called selectUserById that takes in an id as a prop and returns the given user with that id.

// utils

// ... actions & reducer
// const prop = key => obj => obj[key];
// const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
// const converge = (merger, fns) => x => merger(...fns.map(fn => fn(x)));
// const propOr = defaultValue = key => obj => obj[key] ?? defaultValue;

const selectUserProfileSlice = prop("userProfile");

const selectCurrentUserId = pipe(selectUserProfileSlice, prop("currentUserId"));

const selectUsers = pipe(selectUserProfileSlice, prop("users"));

export const selectCurrentUser = converge(prop, [
  selectCurrentUserId,
  selectUsers,
]);

export const selectCurrentUsersEmail = pipe(
  selectCurrentUser,
  propOr("", "email")
);

export const selectIsLoggedIn = pipe(selectCurrentUserId, Boolean);
