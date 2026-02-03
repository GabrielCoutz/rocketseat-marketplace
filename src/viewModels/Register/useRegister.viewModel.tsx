import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegisterFormData, registerScheme } from './register.scheme';
import { useRegisterMutation } from '../../shared/queries/auth/use-register.mutation';

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      avatarUrl: '',
    },
  });

  const onSubmit = handleSubmit(async (payload) => {
    const { confirmPassword, ...registerData } = payload;

    await userRegisterMutation.mutateAsync(registerData);
  });

  return {
    control,
    onSubmit,
    errors,
  };
};
