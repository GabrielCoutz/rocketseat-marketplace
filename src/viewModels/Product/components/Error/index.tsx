import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { AppButton } from '../../../../shared/components/AppButton';
import { colors } from '../../../../styles/colors';

export const ProductError = () => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Ionicons name="alert-circle" color={colors.danger} size={40} />
      <Text className="mt-5 text-center text-xl text-danger">
        Ocorreu um erro ao buscar os detalhes do produto!
      </Text>
      <AppButton onPress={router.back} className="mt-4">
        Voltar
      </AppButton>
    </View>
  );
};
