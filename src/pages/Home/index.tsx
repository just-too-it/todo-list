import React, { useEffect } from 'react';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from 'store/store.hooks';
import { fetchTodos } from 'store/todos/todos.asyncActions';
import { Todos } from 'components/Todos';
import { Add } from 'components/Add';
import { selectTodos } from 'store/todos/todos.selectors';

import styles from './Home.module.scss';

export const Home = () => {
  const { todos } = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <main className={clsx('container', styles.home)}>
      <h1 className={styles.title}>TODO List</h1>
      <Add />
      <Todos todos={todos} />
    </main>
  );
};
