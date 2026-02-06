import { useMutation } from '@tanstack/react-query';
import { register } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/http/auth-response';
import { useUserStore } from '../../store/user-store';

interface IUseRegisterMutationProps {
  onSuccess?: (data: AuthResponse) => void;
}

export const useRegisterMutation = (props?: IUseRegisterMutationProps) => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (mutationResponse) => {
      setSession({
        refreshToken: mutationResponse.refreshToken,
        token: mutationResponse.token,
        user: mutationResponse.user,
      });

      props?.onSuccess?.(mutationResponse);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  return mutation;
};
