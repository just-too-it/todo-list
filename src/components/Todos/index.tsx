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
          todos.map((todo) => (
            <li key={`${todo.id} ${todo.title}`} className={styles.item}>
              <Todo todo={todo} />
            </li>
          ))
          //key задан не просто id, тк id не уникальный (может повторятся в рамках одной сессии при добавлении/удалении элементов).
          // при добавлении элемента id задается прибавлением 1 к длине массива. нужно было для имитации удаления записи на сервере - там такая нумерация ведется.
        }
      </ul>
    </>
  );
};
