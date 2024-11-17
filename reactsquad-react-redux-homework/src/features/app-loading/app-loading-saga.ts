import { createAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";

import { finishAppLoading, slice } from "./app-loading-reducer";
import { handleFetchCurrentUsersProfile } from "../user-profile/user-profile-saga";

const loadApp = createAction(`${slice}/loadApp`);

function* handleLoadApp() {
  yield call(handleFetchCurrentUsersProfile);
  yield put(finishAppLoading());
}

function* watchLoadApp() {
  yield takeEvery(loadApp.type, handleLoadApp);
}

export { handleLoadApp, loadApp, watchLoadApp };
