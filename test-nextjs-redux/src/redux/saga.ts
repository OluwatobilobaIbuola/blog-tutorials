import {
  watchDecrementAsync,
  watchIncrementAsync,
} from "@/src/features/counter/counter-saga";
import { watchAddTodo, watchFetchTodos } from "@/src/features/todos/todo.saga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    watchDecrementAsync(),
    watchIncrementAsync(),
    watchFetchTodos(),
    watchAddTodo(),
  ]);
}
