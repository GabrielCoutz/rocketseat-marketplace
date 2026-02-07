import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '../../shared/store/user-store';
import { AppBottomSheet } from '../../shared/components/AppBottomSheet';

export default function PrivateRoutesLayout() {
  const { token, user } = useUserStore();

  if (!token || !user) return <Redirect href="/(public)/login" />;

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <AppBottomSheet />
    </>
  );
}
