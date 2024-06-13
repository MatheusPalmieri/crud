import { User } from '@/interfaces/user';
import { getUsers } from '@/services/user';
import styles from './styles.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';

import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { ButtonDelete } from '@/components/ButtonDelete';
import { ButtonEdit } from '@/components/ButtonEdit';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const PageHome = () => {
  const navigate = useNavigate();

  const { users: initialUsers, total, limit, page } = getUsers();

  const [users, setUsers] = useState<User[]>(initialUsers);

  const updateUsers = () => {
    setUsers(getUsers().users);
  };

  return (
    <main className={styles.section}>
      <Header />

      <Navbar
        title='Lista de pacientes'
        buttonIcon={<UserPlus size={18} />}
        buttonText='Novo'
        buttonRoute='/novo'
      />

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
              users.map((user: User) => (
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
                      <ButtonEdit userId={user.id} />

                      <ButtonDelete userId={user.id} updateUsers={updateUsers} />
                    </div>
                  </td>
                </tr>
              ))
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
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
};
