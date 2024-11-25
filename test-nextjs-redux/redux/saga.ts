import {
  watchDecrementAsync,
  watchIncrementAsync,
} from "@/features/counter/counter-saga";
import { watchAddTodo, watchFetchTodos } from "@/features/todos/todo.saga";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([
    watchDecrementAsync(),
    watchIncrementAsync(),
    watchFetchTodos(),
    watchAddTodo(),
  ]);
}
