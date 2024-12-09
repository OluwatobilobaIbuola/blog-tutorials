import { Todo } from "@/types";
import { createAction } from "@reduxjs/toolkit";

export const addTodoRequest = createAction<Todo>("ADD_TODO_REQUEST");
export const addTodoSuccess = createAction<Todo>("ADD_TODO_SUCCESS");
export const addTodoFailure = createAction<string>("ADD_TODO_FAILURE");

export const fetchTodosRequest = createAction("FETCH_TODOS_REQUEST");
export const fetchTodosSuccess = createAction<Todo[]>("FETCH_TODOS_SUCCESS");
export const fetchTodosFailure = createAction<string>("FETCH_TODOS_FAILURE");
