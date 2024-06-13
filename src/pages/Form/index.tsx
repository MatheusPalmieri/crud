import { userProps, userSchema } from '@/schemas/user.schema';
import { getUser, newUser, updateUser } from '@/services/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { ChevronLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { formatPhone } from '@/utils/format';
import { Button } from '@/components/Button';
import { Navbar } from '@/components/Navbar';

export const PageForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isEditing] = useState<boolean>(!!params.id);
  const [phone, setPhone] = useState<string>('');

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
    setPhone(user.phone);
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
    setValue('phone', formattedPhone, { shouldValidate: true });
  };

  return (
    <main className={styles.section}>
      <Header />

      <Navbar
        title={isEditing ? `Editar paciente #${params.id}` : 'Novo paciente'}
        buttonIcon={<ChevronLeft size={18} />}
        buttonText='Voltar'
        buttonRoute='/'
      />

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
                type='tel'
                id='phone'
                placeholder='(99) 9 9999-9999'
                value={phone}
                onChange={handlePhoneChange}
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

        <Button
          type='submit'
          style={{
            marginTop: '1rem',
            marginLeft: 'auto',
          }}
        >
          {isEditing ? 'Salvar' : 'Criar'}
        </Button>
      </form>
    </main>
  );
};
