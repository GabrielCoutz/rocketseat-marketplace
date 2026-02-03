import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IRegisterFormData, registerScheme } from './register.scheme';
import { useRegisterMutation } from '../../shared/queries/auth/use-register.mutation';
import { useUserStore } from '../../shared/store/user-store';

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation();
  const { setSession } = useUserStore();
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

    const user = await userRegisterMutation.mutateAsync(registerData);
    setSession(user);
  });

  return {
    control,
    onSubmit,
    errors,
  };
};
