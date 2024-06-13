import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { Title } from '../Title';

import styles from './styles.module.css';

interface Props {
  title: string;
  buttonIcon?: React.ReactNode;
  buttonText?: string;
  buttonRoute?: string;
}

export const Navbar = ({ title, buttonIcon, buttonText, buttonRoute }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Title>{title}</Title>

      {buttonRoute && (
        <Button onClick={() => navigate(buttonRoute)} leftIcon={buttonIcon}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};
