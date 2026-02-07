import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from './components/Header';
import { SearchInput } from './components/SearchInput';

import { ProductCardView } from './components/ProductCard';
import { useHomeViewModel } from './useHome.viewModel';
import { FC } from 'react';

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleRefresh,
  isRefetching,
}) => {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCardView product={item} />}
        keyExtractor={({ id }) => `product-list-item-${id}`}
        numColumns={2}
        refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefetching} />}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />
            <SearchInput />
          </>
        )}
        contentContainerClassName="px-4 pb-[120px]"
      />
    </SafeAreaView>
  );
};
