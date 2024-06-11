import Logo from '@/assets/images/logo.svg';
import styles from './styles.module.css';

export const Header = () => (
  <header className={styles.header}>
    <img src={Logo} alt='Logo' className={styles.img} />

    <h2 className={styles.title}>Logo</h2>
  </header>
);
