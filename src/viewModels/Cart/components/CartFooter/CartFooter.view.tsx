import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AppButton } from '../../../../shared/components/AppButton';
import { AppPriceText } from '../../../../shared/components/AppPriceText';
import { colors } from '../../../../styles/colors';
import { CreditCardItem } from '../CreditCardItem';
import { useCartFooterViewModel } from './useCartFooter.viewModel';
import { CartFooterParams } from '.';

export const CartFooterView: FC<ReturnType<typeof useCartFooterViewModel> & CartFooterParams> = ({
  openCartBottomSheet,
  creditCards,
  isLoadingCreditCards,
  total,
  selectedCreditCard,
  setSelectedCreditCard,
  submitOrderMutation,
  isLoadingOrder,
}) => {
  return (
    <View className="mt-6 rounded-lg bg-white p-4">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-[10px] font-semibold uppercase text-gray-600">Valor total</Text>
        <AppPriceText
          value={total}
          classNameCurrency="text-base text-gray-900 font-bold"
          classNameValue="text-base text-gray-900 font-bold"
        />
      </View>

      <View className="mb-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-[10px] font-semibold uppercase text-gray-600">
            Cartões de crédito
          </Text>

          <TouchableOpacity onPress={openCartBottomSheet} className="flex-row items-center">
            <Ionicons name="card-outline" size={20} color={colors['purple-base']} />
            <Text className="ml-2 font-bold text-purple-base">Adicionar cartão</Text>
          </TouchableOpacity>
        </View>

        {isLoadingCreditCards ? (
          <View className="items-center py-4">
            <ActivityIndicator size="small" color={colors['purple-base']} />
            <Text className="mt-2 text-sm text-gray-500">Carregando cartões</Text>
          </View>
        ) : (
          <FlatList
            data={creditCards}
            renderItem={({ item: creditCard }) => (
              <CreditCardItem
                creditCard={creditCard}
                isSelected={creditCard.id === selectedCreditCard?.id}
                setSelectedCreditCard={setSelectedCreditCard}
              />
            )}
            keyExtractor={(item) => `credit-card-id-${item.id}`}
            className="gap-2"
          />
        )}

        <AppButton className="mt-4" onPress={submitOrderMutation} isLoading={isLoadingOrder}>
          Confirmar compra
        </AppButton>
      </View>
    </View>
  );
};
