import { call, put, takeEvery } from "redux-saga/effects";
import {
  login,
  loginSuccess,
  stopAuthenticating,
} from "./user-authentication-reducer";
import { handleFetchCurrentUsersProfile } from "../user-profile/user-profile-saga";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginRequest } from "./user-authentication-api";
import { Unwrap } from "@/types";

function* handleLogin({
  payload: { email, password },
}: PayloadAction<{ email: string; password: string }>) {
  try {
    const data: Unwrap<typeof loginRequest> = yield call(loginRequest, {
      email,
      password,
    });
    yield localStorage.setItem("token", data.data.token);
    yield put(loginSuccess({ token: data.data.token }));
    yield call(handleFetchCurrentUsersProfile);
    yield put(stopAuthenticating());
  } catch (error: any) {
    yield put(stopAuthenticating());
  }
}

export function* watchLogin() {
  yield takeEvery(login.type, handleLogin);
}
