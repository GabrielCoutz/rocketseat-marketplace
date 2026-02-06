import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppModal } from '../../shared/hooks/useAppModal';
import { useRegisterMutation } from '../../shared/queries/auth/use-register.mutation';
import { useUserStore } from '../../shared/store/user-store';
import { IRegisterFormData, registerScheme } from './register.scheme';
import { useImage } from '../../shared/hooks/useImage';

export const useRegisterViewModel = () => {
  const userRegisterMutation = useRegisterMutation();
  const { setSession } = useUserStore();
  const { handleSelectImage } = useImage({});

  const handleSelectAvatar = async () => await handleSelectImage();

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
      confirmPassword: '',
      phone: '',
    },
  });

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData;

    const mutationResponse = await userRegisterMutation.mutateAsync(registerData);

    setSession({
      refreshToken: mutationResponse.refreshToken,
      token: mutationResponse.token,
      user: mutationResponse.user,
    });
  });

  return {
    control,
    errors,
    onSubmit,
    handleSelectAvatar,
  };
};
