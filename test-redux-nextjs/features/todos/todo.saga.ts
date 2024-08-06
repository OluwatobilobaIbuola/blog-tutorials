// sagas.ts
import { Todo } from "@/types";
import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  addTodoFailure,
  addTodoRequest,
  addTodoSuccess,
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
} from "./todo-actions";

const apiUrl = "/api/todos";

function* fetchTodos() {
  try {
    const response: Response = yield call(fetch, apiUrl);
    const todos: Todo[] = yield call([response, "json"]);
    yield put(fetchTodosSuccess(todos));
  } catch (error: any) {
    yield put(fetchTodosFailure(error?.message));
  }
}

function* addTodo(action: ReturnType<typeof addTodoRequest>) {
  try {
    const response: Response = yield call(fetch, apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });
    const todo: Todo = yield call([response, "json"]);
    yield put(addTodoSuccess(todo));
  } catch (error: any) {
    yield put(addTodoFailure(error.message));
  }
}

export function* watchFetchTodos() {
  yield takeEvery(fetchTodosRequest.type, fetchTodos);
}

export function* watchAddTodo() {
  yield takeEvery(addTodoRequest.type, addTodo);
}
