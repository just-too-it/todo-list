import React, { FC } from 'react';

import { Todo } from 'components/Todo';
import { TodosProps } from './Todos.types';

import styles from './Todos.module.scss';

export const Todos: FC<TodosProps> = ({ todos }) => {
  
  return (
    <>
      <h2 className={styles.title}>Список задач</h2>
      <ul className={styles.list}>
        {
          todos?.map((todo) => (
            <li key={todo.id} className={styles.item}>
              <Todo todo={todo} />
            </li>
          ))
        }
      </ul>
    </>
  );
};
