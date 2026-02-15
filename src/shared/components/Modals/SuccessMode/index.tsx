import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../../../styles/colors';
import { AppButton } from '../../AppButton';

export interface SuccessModalParams {
  title: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export const SuccessModal: FC<SuccessModalParams> = ({
  title,
  message,
  buttonText = 'Fechar',
  onButtonPress,
}) => {
  return (
    <View className="mx-auto w-[85%] max-w-sm rounded-2xl bg-white p-6">
      <View className="items-center">
        <View className="mb-4 size-16 items-center justify-center rounded-full bg-green-100">
          <Ionicons name="checkmark-circle" size={40} color={colors.success} />
        </View>

        <Text className="mb-3 text-center text-xl font-bold text-gray-900">{title}</Text>

        <Text className="mb-6 text-center text-base leading-6 text-gray-600">{message}</Text>

        <AppButton onPress={onButtonPress}>{buttonText}</AppButton>
      </View>
    </View>
  );
};
