import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TodoProps } from 'components/Todo/Todo.types';
import { STATUS } from 'core/constants/status';
import { TodosState } from './todos.types';
import { fetchTodos, addTodo, deleteTodo, editTodo, completeTodo } from './todos.asyncActions';

const initialState: TodosState = {
  todos: [],
  status: STATUS.LOADING,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    deleteTodoItem: (state, action: PayloadAction<number | string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    completeTodoItem: (state, action: PayloadAction<number | string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    addTodoItem: (state, action: PayloadAction<TodoProps>) => {
      state.todos = [...state.todos, action.payload];
    },
    editTodoItem: (state, action: PayloadAction<TodoProps>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      todo.title = action.payload.title;
      todo.description = action.payload.description;
      todo.completed = action.payload.completed;
      todo.attachment = action.payload.attachment;
      todo.files = action.payload.files
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action: PayloadAction<TodoProps[]>) => {
      state.todos = action.payload;
      state.status = STATUS.SUCCESS;
    });
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.todos = [];
      state.status = STATUS.ERROR;
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.status = STATUS.ERROR;
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.status = STATUS.ERROR;
    });
    builder.addCase(editTodo.rejected, (state) => {
      state.status = STATUS.ERROR;
    });
    builder.addCase(completeTodo.rejected, (state) => {
      state.status = STATUS.ERROR;
    });
  },
});

export const { deleteTodoItem, addTodoItem, completeTodoItem, editTodoItem } = todosSlice.actions;
export default todosSlice.reducer;
