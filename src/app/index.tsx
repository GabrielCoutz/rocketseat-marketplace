import { Redirect } from 'expo-router';
import { useUserStore } from '../shared/store/user-store';

export default function App() {
  const { token, user } = useUserStore();

  if (token && user) return <Redirect href="/(private)/home" />;

  return <Redirect href="/(public)/login" />;
}
