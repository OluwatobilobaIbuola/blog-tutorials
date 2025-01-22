import { call, put, takeEvery } from "redux-saga/effects";
import {
  login,
  userIsSignedIn,
  stopAuthenticating,
} from "./user-authentication-reducer";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginRequest } from "./user-authentication-api";
import { Unwrap } from "@/types";
import {
  handleErrorToast,
  handleSuccessToast,
} from "../app-loading/app-loading-reducer";
import { handleFetchCurrentUsersProfile } from "../user-profile/user-profile-saga";

function* handleLogin({
  payload: { email, password },
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const data: Unwrap<typeof loginRequest> = yield call(loginRequest, {
      email,
      password,
    });
    yield put(userIsSignedIn({ token: data.data.token }));
    yield put(handleSuccessToast(data));
    yield call(handleFetchCurrentUsersProfile);
    
  } catch (error: any) {
    yield put(handleErrorToast(error));
    
  } finally {
    yield put(stopAuthenticating());
  }
}

export function* watchLogin() {
  yield takeEvery(login.type, handleLogin);
}
