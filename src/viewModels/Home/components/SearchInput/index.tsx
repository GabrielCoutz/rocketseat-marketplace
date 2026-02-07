import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { AppInput } from '../../../../shared/components/AppInput';
import { colors } from '../../../../styles/colors';
import { useBottomSheetStore } from '../../../../shared/store/bottomsheet-store';
import { Filter } from '../Filter';
import { FC } from 'react';

interface SearchInputParams {
  setSearchInputText: (text: string) => void;
  inputValue: string;
}

export const SearchInput: FC<SearchInputParams> = ({ setSearchInputText, inputValue }) => {
  const { open } = useBottomSheetStore();

  return (
    <View className="mb-3 mt-6">
      <Text className="mt-6 text-2xl font-bold">Explore Produtos</Text>
      <View className="flex-row">
        <View className="flex-1">
          <AppInput
            value={inputValue}
            onChangeText={setSearchInputText}
            leftIcon="search"
            returnKeyType="search"
            className="flex-1 text-lg"
            placeholder="Pesquisar"
          />
        </View>

        <TouchableOpacity
          onPress={() => open({ content: <Filter /> })}
          className="ml-5 mt-6 size-[48px] items-center justify-center rounded-lg border border-purple-base">
          <Ionicons name="filter-outline" size={24} color={colors['purple-base']} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
