import { useMutation } from '@tanstack/react-query';
import { uploadAvatar } from '../../services/auth.service';
import { Toast } from 'toastify-react-native';

export const useUploadAvatarMutation = () => {
  const mutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {},
    onError: (error) => {
      Toast.error('Erro ao enviar a imagem. Tente novamente.');
    },
  });

  return mutation;
};
