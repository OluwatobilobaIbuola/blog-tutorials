import { compose } from "@reduxjs/toolkit";

import { call, put } from "redux-saga/effects";

import { getCurrentUserRequest } from "./user-profile-api";
import { Unwrap } from "@/types";
import { setCurrentUserProfile } from "./user-profile-reducer";
import { finishAppLoading } from "../app-loading/app-loading-reducer";

function* handleFetchCurrentUsersProfile() {
  try {
    const { data: user }: Unwrap<typeof getCurrentUserRequest> = yield call(
      getCurrentUserRequest
    );

    if (user) {
      yield compose<ReturnType<typeof put>>(put, setCurrentUserProfile)(user);
    }
  } catch {
    yield put(finishAppLoading());
  }
}

export { handleFetchCurrentUsersProfile };
