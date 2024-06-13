import { deleteUser } from '@/services/user';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../Button';

interface Props {
  userId: string;
  updateUsers: () => void;
}

export const ButtonDelete = ({ userId, updateUsers }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    if (confirmDelete) {
      deleteUser(id);
      updateUsers();
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
    <Button
      leftIcon={<Trash2 size={18} />}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        handleDelete(userId);
      }}
    >
      {confirmDelete ? 'Confirmar' : 'Excluir'}
    </Button>
  );
};
