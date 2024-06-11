import { User } from '@/interfaces/user';
import { deleteUser, getUsers } from '@/services/user';
import styles from './styles.module.css';
import { Title } from '@/components/Title';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

import { Pencil, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const Home = () => {
  const navigate = useNavigate();

  const { users: initialUsers, total, limit, page } = getUsers();

  const [users, setUsers] = useState<User[]>(initialUsers);

  const updateUsers = () => {
    setUsers(getUsers().users);
  };

  return (
    <main className={styles.section}>
      <Header />

      <div className={styles.header}>
        <Title>Lista de pacientes</Title>

        <button
          className={styles.tbody_btn}
          style={{
            backgroundColor: '#15aa31',
          }}
          onClick={() => navigate(`/novo`)}
        >
          <UserPlus size={18} />
          Novo
        </button>
      </div>

      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.thead_tr}>
              <td className={styles.th}>Código</td>
              <td className={styles.th}>Paciente</td>
              <td className={styles.th}>Telefone</td>
              <td className={styles.th}>Criado</td>
              <td className={styles.th}> </td>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user: User) => {
                return (
                  <tr
                    key={user.id}
                    className={styles.tbody_tr}
                    onClick={() => navigate(`/detalhes/${user.id}`)}
                  >
                    <td className={styles.tb}>{user.id}</td>
                    <td className={styles.tb}>
                      <div className={styles.tb_info}>
                        <span className={styles.tb_name}>{user.name}</span>
                        <span>{user.email}</span>
                      </div>
                    </td>
                    <td className={styles.tb}>{user.phone}</td>
                    <td className={styles.tb}>{dayjs().to(user.createdAt)}</td>
                    <td className={styles.tb}>
                      <div className={styles.tbody_actions}>
                        <button
                          className={styles.tbody_btn}
                          style={{
                            backgroundColor: '#226fe1',
                          }}
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            navigate(`/editar/${user.id}`);
                          }}
                        >
                          <Pencil size={18} />
                          Editar
                        </button>

                        <ButtonDelete user={user} updateUsers={updateUsers} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className={styles.tb}
                  style={{
                    textAlign: 'center',
                    padding: '1rem',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  Nenhum paciente cadastrado.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className={styles.tfoot_tr}>
              <td colSpan={3} className={styles.tb}>
                Mostrando {users.length} de {total}
              </td>

              <td colSpan={3} className={styles.tb}>
                <div className={styles.tfoot_pagination}>
                  <span>
                    Página {page} de {Math.ceil(total / limit) || 1}
                  </span>

                  {/* <div>
                    <a href='/?page=1'>Primeira</a>
                    <a href={`/?page=${page - 1}`}>Anterior</a>
                    <a href={`/?page=${page + 1}`}>Próxima</a>
                    <a href={`/?page=${Math.ceil(total / limit)}`}>Última</a>
                  </div> */}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};

const ButtonDelete = ({ user, updateUsers }: { user: User; updateUsers: () => void }) => {
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
    <button
      className={styles.tbody_btn}
      style={{
        backgroundColor: '#e12245',
      }}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        handleDelete(user.id);
      }}
    >
      <Trash2 size={18} />
      {confirmDelete ? 'Confirmar' : 'Excluir'}
    </button>
  );
};
