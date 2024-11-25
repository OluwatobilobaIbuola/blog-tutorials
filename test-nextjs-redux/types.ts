// types.ts
export interface Todo {
  id: number;
  text: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
