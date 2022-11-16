import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './Home.module.scss';
import { Todo } from 'components/Todo';

export const Home = () => {


  return (
    <main className={clsx('container', styles.home)}>
      <h1 className={styles.title}>TODO List</h1>
      <Todo todo={{title: 'task 1', description: 'desc 1', complete: false}}/>
    </main>
  );
};
