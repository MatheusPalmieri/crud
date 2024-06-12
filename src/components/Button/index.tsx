import { ComponentProps } from 'react';
import styles from './styles.module.css';

interface Props extends ComponentProps<'button'> {
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({ children, leftIcon, rightIcon, ...props }: Props) => (
  <button className={styles.btn} {...props}>
    {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
    {children}
    {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
  </button>
);
