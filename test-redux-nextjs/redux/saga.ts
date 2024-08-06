import {
  watchDecrementAsync,
  watchIncrementAsync,
} from "@/features/counter/counter-saga";
import { watchFetchQuotesSaga } from "@/features/quotes/quotes-saga";
import { watchAddTodo, watchFetchTodos } from "@/features/todos/todo.saga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    watchFetchQuotesSaga(),
    watchDecrementAsync(),
    watchIncrementAsync(),
    watchFetchTodos(),
    watchAddTodo(),
  ]);
}
