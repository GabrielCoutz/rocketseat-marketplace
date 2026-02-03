import { useMutation } from '@tanstack/react-query';
import { register } from '../../services/auth.service';

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  return mutation;
};
