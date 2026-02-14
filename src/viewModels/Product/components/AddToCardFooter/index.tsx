import { FC } from 'react';
import { View } from 'react-native';
import { AppButton } from '../../../../shared/components/AppButton';
import { AppPriceText } from '../../../../shared/components/AppPriceText';
import { ProductInterface } from '../../../../shared/interfaces/product';

interface AddToCardFooterParams {
  product: ProductInterface;
  onAddToCart: () => void;
}

export const AddToCardFooter: FC<AddToCardFooterParams> = ({ product, onAddToCart }) => {
  return (
    <View className="fixed bottom-0 left-0 right-0 h-[126px] flex-row items-center justify-between bg-white p-7">
      <AppPriceText value={Number(product.value)} />

      <AppButton leftIcon="cart-outline" className="h-[40px] w-[120px]" onPress={onAddToCart}>
        Adicionar
      </AppButton>
    </View>
  );
};
