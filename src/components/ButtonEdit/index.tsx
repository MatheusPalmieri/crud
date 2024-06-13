import { Pencil } from 'lucide-react';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface Props {
  userId: string;
}

export const ButtonEdit = ({ userId }: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<Pencil size={18} />}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/editar/${userId}`);
      }}
    >
      Editar
    </Button>
  );
};
