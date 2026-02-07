import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from './components/Header';
import { SearchInput } from './components/SearchInput';

import { ProductCardView } from './components/ProductCard';
import { useHomeViewModel } from './useHome.viewModel';
import { FC } from 'react';
import { Footer } from './components/Footer';
import { colors } from '../../styles/colors';
import { RenderHeader } from './components/RenderHeader';

export const HomeView: FC<ReturnType<typeof useHomeViewModel>> = ({
  products,
  handleRefresh,
  isRefetching,
  handleEndReached,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  setSearchInputText,
  searchInputText,
}) => {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCardView product={item} />}
        keyExtractor={({ id }) => `product-list-item-${id}`}
        numColumns={2}
        onEndReached={handleEndReached}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            colors={[colors['purple-base']]}
            tintColor={colors['purple-base']}
            onRefresh={handleRefresh}
          />
        }
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        ListHeaderComponent={
          <RenderHeader searchInputText={searchInputText} setSearchInputText={setSearchInputText} />
        }
        ListFooterComponent={() => (
          <Footer isLoading={hasNextPage && (isLoading || isFetchingNextPage)} />
        )}
        contentContainerClassName="px-4 pb-[120px]"
      />
    </SafeAreaView>
  );
};
