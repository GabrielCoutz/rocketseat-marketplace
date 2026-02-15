import { FC } from 'react';
import { FlatList } from 'react-native';
import { useCartViewModel } from './useCart.viewModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCartCard } from './components/ProductCartCard';
import { EmptyList } from './components/EmptyList';
import { CartHeader } from './components/CartHeader';
import { CartFooter } from './components/CartFooter';

export const CartView: FC<ReturnType<typeof useCartViewModel>> = ({
  products,
  creditCards,
  isLoadingCreditCards,
  openCartBottomSheet,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        contentContainerClassName="px-6"
        data={products}
        renderItem={({ item }) => <ProductCartCard product={item} />}
        keyExtractor={({ id }) => `product-cart-id-${id}`}
        ListEmptyComponent={<EmptyList />}
        ListHeaderComponent={<CartHeader />}
        ListFooterComponent={
          products.length > 0 ? (
            <CartFooter
              openCartBottomSheet={openCartBottomSheet}
              creditCards={creditCards}
              isLoadingCreditCards={isLoadingCreditCards}
            />
          ) : undefined
        }
      />
    </SafeAreaView>
  );
};
