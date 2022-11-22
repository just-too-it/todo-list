import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import {} from 'firebase/firestore';
import { storage, db } from 'store/firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { TodoProps } from 'components/Todo/Todo.types';
import { addTodoItem, completeTodoItem, deleteTodoItem, editTodoItem } from './todos.slice';
import { TodosState } from './todos.types';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });
    return arr as TodoProps[];
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number | string, { rejectWithValue, dispatch }) => {
    try {
      await deleteDoc(doc(db, 'todos', `${id}`));
      dispatch(deleteTodoItem(id));
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addTodo = createAsyncThunk('todos/addTodo', async (todo: TodoProps, { rejectWithValue, dispatch }) => {
  try {
    if (todo.attachment.length > 0) {
      let newTodo: TodoProps;
      const storageRef = ref(storage, todo.attachment[0].name);
      const uploadTask = uploadBytesResumable(storageRef, todo.attachment[0]);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('Error upload: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              todo = { ...todo, attachmentName: uploadTask.snapshot.ref.name, attachmentLink: downloadURL };
              return (newTodo = { ...todo, attachment: [] });
            })
            .then((newTodo) => {
              setDoc(doc(db, 'todos', `${todo.id}`), newTodo);
              dispatch(addTodoItem(todo));
            });
        }
      );
    } else {
      await setDoc(doc(db, 'todos', `${todo.id}`), todo);
      dispatch(addTodoItem(todo));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    return rejectWithValue((error as Error).message);
  }
});

export const editTodo = createAsyncThunk('todos/editTodo', async (todo: TodoProps, { rejectWithValue, dispatch }) => {
  try {
    const todoRef = doc(db, 'todos', `${todo.id}`);
    if (todo.attachment.length > 0) {
      let newTodo: TodoProps;
      const storageRef = ref(storage, todo.attachment[0].name);
      const uploadTask = uploadBytesResumable(storageRef, todo.attachment[0]);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error('Error upload: ', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              todo = { ...todo, attachmentName: uploadTask.snapshot.ref.name, attachmentLink: downloadURL };
              return (newTodo = { ...todo, attachment: [] });
            })
            .then((newTodo) => {
              updateDoc(todoRef, newTodo);
              dispatch(editTodoItem(todo));
            });
        }
      );
    } else {
      updateDoc(todoRef, {
        title: todo.title,
        description: todo.description,
        date: todo.date,
      });
      dispatch(editTodoItem(todo));
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue((error as Error).message);
  }
});

export const completeTodo = createAsyncThunk(
  'todos/completeTodo',
  async (id: number | string, { rejectWithValue, dispatch, getState }) => {
    const { todos } = getState() as { todos: TodosState };
    const todo = todos.todos.find((todo) => todo.id === id);

    const todoRef = doc(db, 'todos', `${todo.id}`);
    try {
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
      dispatch(completeTodoItem(todo.id));
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
);
