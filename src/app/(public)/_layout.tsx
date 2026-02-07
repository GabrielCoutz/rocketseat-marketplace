import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '../../shared/store/user-store';

export default function PublicLayout() {
  const { token, user } = useUserStore();

  if (token && user) return <Redirect href="/(private)/home" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
