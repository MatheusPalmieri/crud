import { Header } from '@/components/Header';
import { Title } from '@/components/Title';
import { deleteUser, getUser } from '@/services/user';
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { User, UserStatus } from '@/interfaces/user';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const PageDetails = () => {
  const navigate = useNavigate();
  const params = useParams() as { id: string };

  if (!params.id) navigate('/');

  const user = getUser(params.id) as User;

  if (!user) navigate('/');

  const StatusLabel: Record<UserStatus, string> = {
    [UserStatus.ACTIVE]: 'Ativo',
    [UserStatus.INACTIVE]: 'Inativo',
  };

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    if (confirmDelete) {
      deleteUser(id);
    } else {
      setConfirmDelete(true);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      const timeout = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [confirmDelete]);

  return (
    <main className={styles.section}>
      <Header />

      <div className={styles.header}>
        <Title>Paciente #{user.id}</Title>

        <Button leftIcon={<ChevronLeft size={18} />} onClick={() => navigate(`/`)}>
          Voltar
        </Button>
      </div>

      <div className={styles.details}>
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Telefone:</strong> {user.phone}
        </p>

        <div className={styles.divider} />

        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Status:</strong> {StatusLabel[user.status]}
        </p>

        <div className={styles.divider} />

        <p>
          <strong>Criado:</strong> {dayjs().to(user.createdAt)}
        </p>
        <p>
          <strong>Atualizado:</strong> {dayjs().to(user.updatedAt)}
        </p>

        <div className={styles.divider} />

        <div className={styles.actions}>
          <Button
            leftIcon={<Pencil size={18} />}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigate(`/editar/${user.id}`);
            }}
          >
            Editar
          </Button>

          <Button
            leftIcon={<Trash2 size={18} />}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDelete(user.id);
            }}
          >
            {confirmDelete ? 'Confirmar' : 'Excluir'}
          </Button>
        </div>
      </div>
    </main>
  );
};
