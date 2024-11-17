import { watchLoadApp } from "@/features/app-loading/app-loading-saga";
import { watchLogin } from "@/features/user-authentication/user-authentication-saga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([watchLogin, watchLoadApp]);
}
