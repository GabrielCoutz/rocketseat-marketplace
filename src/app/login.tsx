import { LoginView } from '../viewModels/Login/Login.view';
import { useLoginViewModel } from '../viewModels/Login/useLogin.viewModel';

export default function LoginScreen() {
  const props = useLoginViewModel();

  return <LoginView {...props} />;
}
