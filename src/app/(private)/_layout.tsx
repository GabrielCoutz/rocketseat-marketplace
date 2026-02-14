import { Redirect, Stack } from 'expo-router';
import { useUserStore } from '../../shared/store/user-store';
import { AppBottomSheet } from '../../shared/components/AppBottomSheet';

export default function PrivateRoutesLayout() {
  const { token, user } = useUserStore();

  if (!token || !user) return <Redirect href="/(public)/login" />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
      </Stack>
      <AppBottomSheet />
    </>
  );
}
