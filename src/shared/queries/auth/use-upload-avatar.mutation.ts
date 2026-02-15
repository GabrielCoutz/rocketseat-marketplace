import { useMutation } from '@tanstack/react-query';
import { uploadAvatar } from '../../services/auth.service';
import { Toast } from 'toastify-react-native';
import { useUserStore } from '../../store/user-store';

export const useUploadAvatarMutation = () => {
  const { updateUser } = useUserStore();

  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => updateUser({ avatarUrl: data.url }),
    onError: (error) => {
      Toast.error('Erro ao enviar a imagem. Tente novamente.');
    },
  });

  return mutation;
};
