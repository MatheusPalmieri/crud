import { Header } from '@/components/Header';
import { getUser } from '@/services/user';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { User, UserStatus } from '@/interfaces/user';
import { Navbar } from '@/components/Navbar';
import { ButtonDelete } from '@/components/ButtonDelete';
import { ButtonEdit } from '@/components/ButtonEdit';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const PageDetails = () => {
  const navigate = useNavigate();
  const params = useParams() as { id: string };

  if (!params.id) navigate('/');

  const user = getUser(params.id) as User;
  if (!user) navigate('/');
  const { id, name, phone, email, status, createdAt, updatedAt } = user;

  const StatusLabel: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: 'Ativo',
    [UserStatus.INACTIVE]: 'Inativo',
  };

  return (
    <main className={styles.section}>
      <Header />

      <Navbar
        title={`Paciente #${id}`}
        buttonIcon={<ChevronLeft size={18} />}
        buttonText='Voltar'
        buttonRoute='/'
      />

      <div className={styles.details}>
        <p>
          <strong>Nome:</strong> {name}
        </p>
        <p>
          <strong>Telefone:</strong> {phone}
        </p>

        <div className={styles.divider} />

        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Status:</strong> {StatusLabel[status]}
        </p>

        <div className={styles.divider} />

        <p>
          <strong>Criado:</strong> {dayjs().to(createdAt)}
        </p>
        <p>
          <strong>Atualizado:</strong> {dayjs().to(updatedAt)}
        </p>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <ButtonEdit userId={id} />

          <ButtonDelete userId={id} updateUsers={() => navigate('/')} />
        </div>
      </div>
    </main>
  );
};
