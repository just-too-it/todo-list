import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './Home.module.scss';

export const Home = () => {


  return (
    <main className={clsx('container', styles.home)}>
      <h1 className={styles.title}>TODO List</h1>
      
    </main>
  );
};
