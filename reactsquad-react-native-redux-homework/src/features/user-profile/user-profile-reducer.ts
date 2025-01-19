import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './user-profile-types';

export const slice = 'userProfile';

const initialState = {
  currentUser: '',
  users: {} as any,
};

export const {
  reducer,
  actions: { userNameAdded, fetchUsersSuccess, fetchUsersRequest },
} = createSlice({
  name: slice,
  initialState,
  reducers: {
    userNameAdded: (state, { payload }: PayloadAction<string>) => {
      state.currentUser = payload;
    },
    fetchUsersSuccess: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload.reduce((acc, el) => {
        return { ...acc, [el.id]: el };
      }, state.users);
    },
    fetchUsersRequest: state => {},
  },
});
