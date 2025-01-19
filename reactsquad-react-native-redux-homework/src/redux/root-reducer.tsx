import { combineReducers } from '@reduxjs/toolkit';
import {
  slice as userSlice,
  reducer as userProfileReducer,
} from '../features/user-profile/user-profile-reducer';

export const rootReducer = combineReducers({
  [`${userSlice}`]: userProfileReducer,
});

export const rootState = rootReducer(undefined, { type: '' });
export type RootState = typeof rootState;
