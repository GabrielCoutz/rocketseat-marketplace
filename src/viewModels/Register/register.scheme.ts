import * as Yup from 'yup';

export const registerScheme = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(4, 'O nome deve ter pelo menos 4 caracteres'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder')
    .required('Confirmação de senha é obrigatória'),
  phone: Yup.string()
    .required('Telefone é obrigatório')
    .matches(/^\d{11}$/, 'Número de telefone inválido'),
  avatarUrl: Yup.string().url('URL inválida').required('URL do avatar é obrigatória'),
});

export type IRegisterFormData = Yup.InferType<typeof registerScheme>;
