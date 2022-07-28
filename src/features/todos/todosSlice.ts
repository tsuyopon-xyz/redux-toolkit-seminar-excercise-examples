import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { TodoInput, Todo, TodoId, TodoUpdatePayload } from './types';
import { createTodo, removeTodo, updateTodo } from './crud';

export type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    create: (state, action: PayloadAction<TodoInput>) => {
      const { title, body } = action.payload;
      if (!title || !body)
        throw new Error('タイトルと本文の両方を入力してください');

      const todo = createTodo(action.payload);
      state.todos.push(todo);
    },
    remove: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) return;

      state.todos[index] = removeTodo(todo);
    },
    update: (state, action: PayloadAction<TodoUpdatePayload>) => {
      const { id, input } = action.payload;
      const index = state.todos.findIndex((todo) => todo.id === id);
      const todo = state.todos[index];
      if (!todo) return;

      state.todos[index] = updateTodo({
        ...todo,
        ...input,
      });
    },
  },
});

export const { create, remove, update } = todoSlice.actions;

export const selectTodos = (state: RootState) =>
  state.todos.todos.filter((todo) => todo.deletedAt === undefined);

export default todoSlice.reducer;
