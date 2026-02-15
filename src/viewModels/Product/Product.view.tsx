import { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommentItem } from './components/CommentItem';
import { EmptyList } from './components/EmptyList';
import { Header } from './components/Header';
import { ListFooter } from './components/ListFooter';
import { Loading } from './components/Loading';
import { useProductViewModel } from './useProduct.viewModel';
import { ProductError } from './components/Error';
import { AddToCardFooter } from './components/AddToCardFooter';

export const ProductView: FC<ReturnType<typeof useProductViewModel>> = ({
  isLoading,
  productDetails,
  error,
  comments,
  isLoadingComments,
  errorComments,
  handleLoadMore,
  handleRefetch,
  handleEndReached,
  isRefetching,
  isFetchingNextPage,
  handleAddToCart,
  handleOpenReviewBottomSheet,
}) => {
  console.log(comments);

  if (error) {
    return <ProductError />;
  }

  if (!productDetails) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      <FlatList
        data={comments}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={() => (
          <Header
            onOpenReviewBottomSheet={handleOpenReviewBottomSheet}
            productDetails={productDetails}
          />
        )}
        className="px-6"
        onEndReached={handleEndReached}
        onRefresh={handleRefetch}
        refreshing={isRefetching}
        ListFooterComponent={() => <ListFooter isLoadingMore={isFetchingNextPage} />}
        ListEmptyComponent={<EmptyList isLoadingComments={isLoadingComments} />}
        contentContainerClassName="pb-6"
      />

      <AddToCardFooter product={productDetails} onAddToCart={handleAddToCart} />
    </SafeAreaView>
  );
};
