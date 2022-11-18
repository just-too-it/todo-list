import React, { FC } from 'react';
import clsx from 'clsx';

import { ButtonProps } from './Button.types';

import styles from './Button.module.scss';

export const Button: FC<ButtonProps> = ({ type = 'button', className, children, disabled, onClick }) => {
  return (
    <button type={type} className={clsx(styles.button, className)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
