// sagas.js
import { put, takeEvery, delay } from "redux-saga/effects";
import {
  decrement,
  decrementAsync,
  increment,
  incrementAsync,
} from "./counter-reducer";

function* incrementCounterAsync() {
  yield delay(1000);
  yield put(increment());
}

function* decrementCounterAsync() {
  yield delay(1000);
  yield put(decrement());
}

export function* watchIncrementAsync() {
  yield takeEvery(incrementAsync.type, incrementCounterAsync);
}

export function* watchDecrementAsync() {
  yield takeEvery(decrementAsync.type, decrementCounterAsync);
}
