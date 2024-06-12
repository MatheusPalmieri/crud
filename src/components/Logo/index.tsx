import { Activity } from 'lucide-react';
import styles from './styles.module.css';

export const Logo = () => (
  <div className={styles.logo}>
    <div className={styles.icon}>
      <Activity size={20} color='#fff' />
    </div>
    <h1 className={styles.title}>Saúde Mental</h1>
  </div>
);
