import { createReducer } from "@reduxjs/toolkit";

import {
  addTodoFailure,
  addTodoSuccess,
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
} from "./todo-actions";
import { TodoState } from "@/types";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const todosReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchTodosRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTodosSuccess, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    })
    .addCase(fetchTodosFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(addTodoSuccess, (state, action) => {
      state.todos.push(action.payload);
    })
    .addCase(addTodoFailure, (state, action) => {
      state.error = action.payload;
    });
});

export default todosReducer;
