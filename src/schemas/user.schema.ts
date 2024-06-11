import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Preencha o campo de nome.'),
  phone: yup.string().required('Preencha o campo de telefone.'),
  email: yup.string().email('E-mail inválido.').required('Preencha o campo de e-mail.'),
  password: yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .required('Preencha o campo de senha.'),
  status: yup.string().optional(),
  createdAt: yup.string().optional(),
  updatedAt: yup.string().optional(),
});

export type userProps = yup.InferType<typeof userSchema>;
