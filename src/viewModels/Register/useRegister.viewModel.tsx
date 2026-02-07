import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAppModal } from '../../shared/hooks/useAppModal';
import { useRegisterMutation } from '../../shared/queries/auth/use-register.mutation';
import { useUserStore } from '../../shared/store/user-store';
import { IRegisterFormData, registerScheme } from './register.scheme';
import { useImage } from '../../shared/hooks/useImage';
import { useState } from 'react';
import { CameraType } from 'expo-image-picker';
import { useUploadAvatarMutation } from '../../shared/queries/auth/use-upload-avatar.mutation';

export const useRegisterViewModel = () => {
  const [avatarUri, setAvatarUri] = useState<string | undefined>(undefined);
  const uploadAvatarMutation = useUploadAvatarMutation();
  const { setSession, updateUser } = useUserStore();
  const { handleSelectImage } = useImage({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  });

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
  console.log(errors);

  const userRegisterMutation = useRegisterMutation({
    onSuccess: async () => {
      if (avatarUri) {
        const { url } = await uploadAvatarMutation.mutateAsync(avatarUri);

        updateUser({
          avatarUrl: url,
        });
      }
    },
  });

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData;

    await userRegisterMutation.mutateAsync(registerData as any);
  });

  return {
    control,
    errors,
    onSubmit,
    handleSelectAvatar,
    avatarUri,
  };
};
