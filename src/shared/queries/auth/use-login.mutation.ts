import { useMutation } from '@tanstack/react-query';
import { LoginHttpParams } from '../../interfaces/http/login';
import { login } from '../../services/auth.service';

export const useLoginMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userData: LoginHttpParams) => await login(userData),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
