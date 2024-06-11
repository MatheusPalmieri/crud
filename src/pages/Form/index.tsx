import { userProps, userSchema } from '@/schemas/user.schema';
import { getUser, newUser, updateUser } from '@/services/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { Title } from '@/components/Title';
import { ChevronLeft } from 'lucide-react';
import { Header } from '@/components/Header';

export const PageForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const isEditing = !!params.id;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<userProps>({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    if (!params.id) return;
    const user = getUser(params.id);
    setValue('id', user.id);
    setValue('name', user.name);
    setValue('phone', user.phone);
    setValue('email', user.email);
    setValue('password', user.password);
    setValue('status', user.status);
    setValue('createdAt', user.createdAt);
    setValue('updatedAt', user.updatedAt);
  }, []);

  const onSubmit: SubmitHandler<userProps> = async (data: userProps) => {
    try {
      if (isEditing) {
        updateUser(data);
      } else {
        newUser(data);
      }

      navigate('/');
    } catch (error) {
      console.error('Error newUser', error);
    }
  };

  return (
    <main className={styles.section}>
      <Header />

      <div className={styles.header}>
        <Title>Lista de pacientes</Title>

        <button
          className={styles.btn}
          style={{
            backgroundColor: '#15aa31',
          }}
          onClick={() => navigate(`/`)}
        >
          <ChevronLeft size={18} />
          Voltar
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.form_inputs}>
          <div className={styles.input_group}>
            <div className={styles.input}>
              <label htmlFor='name'>Nome</label>
              <input
                type='text'
                id='name'
                placeholder='Ex: João'
                {...register('name')}
                style={{
                  border: errors.name && '2px red solid',
                }}
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className={styles.input}>
              <label htmlFor='phone'>Telefone</label>
              <input
                type='text'
                id='phone'
                placeholder='(00) 9 1234-5678'
                {...register('phone')}
                style={{
                  border: errors.phone && '2px red solid',
                }}
              />
              {errors.phone && <span>{errors.phone.message}</span>}
            </div>
          </div>

          <div className={styles.input_group}>
            <div className={styles.input}>
              <label htmlFor='email'>E-mail</label>
              <input
                type='email'
                id='email'
                placeholder='joao@exemplo.com.br'
                {...register('email')}
                style={{
                  border: errors.email && '2px red solid',
                }}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className={styles.input}>
              <label htmlFor='password'>Senha</label>
              <input
                type='password'
                id='password'
                placeholder='********'
                {...register('password')}
                style={{
                  border: errors.password && '2px red solid',
                }}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
          </div>
        </div>

        <button type='submit' className={styles.form_btn}>
          {isEditing ? 'Salvar' : 'Criar'}
        </button>
      </form>
    </main>
  );
};
