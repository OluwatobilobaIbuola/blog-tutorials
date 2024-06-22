import { watchFetchQuotesSaga } from "@/features/quotes/quotesSaga";
import { all, fork } from "redux-saga/effects";

export function* rootSaga() {
  yield all([fork(watchFetchQuotesSaga)]);
}
