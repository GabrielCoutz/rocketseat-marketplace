import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppInput } from '../../../../shared/components/AppInput';
import { colors } from '../../../../styles/colors';

export const SearchInput = () => {
  return (
    <View className="mb-3 mt-6">
      <Text className="mt-6 text-2xl font-bold">Explore Produtos</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput leftIcon="search" returnKeyType="search" className="flex-1 text-lg" />
        </View>

        <TouchableOpacity className="ml-5 mt-6 h-[48px] w-[48px] items-center justify-center rounded-lg border border-purple-base">
          <Ionicons name="filter-outline" size={24} color={colors['purple-base']} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
