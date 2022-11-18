import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { TodoProps } from 'components/Todo/Todo.types';
import { addTodoItem, completeTodoItem, deleteTodoItem, editTodoItem } from './todos.slice';
import { TodosState } from './todos.types';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}?_limit=5`);
    return response.data as TodoProps[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number | string, { rejectWithValue, dispatch }) => {
    try {
      await axios.get(`${process.env.REACT_APP_API}/${id}`, {
        method: 'DELETE',
      });
      dispatch(deleteTodoItem(id));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: TodoProps, { rejectWithValue, dispatch }) => {
  try {
    await axios.post(`${process.env.REACT_APP_API}`, {
      method: 'POST',
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        attachment: todo.attachment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    dispatch(addTodoItem(todo));
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const editTodo = createAsyncThunk('todos/editTodo', async (todo: TodoProps, { rejectWithValue, dispatch }) => {
  try {
    await axios.put(`${process.env.REACT_APP_API}/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        attachment: todo.attachment,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    dispatch(editTodoItem(todo));
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const completeTodo = createAsyncThunk(
  'todos/completeTodo',
  async (id: number | string, { rejectWithValue, dispatch, getState }) => {
    const { todos } = getState() as { todos: TodosState };
    const todo = todos.todos.find((todo) => todo.id === id);

    try {
      await axios.put(`${process.env.REACT_APP_API}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          completed: !todo.completed,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(completeTodoItem(id));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
