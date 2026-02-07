import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/product.service';
import { buildImageUrl } from '../../helpers/buildImageUrl';

export const useProductInfiniteQuery = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam }) => {
      try {
        const response = await getProducts({
          pagination: {
            page: pageParam,
            perPage: 10,
          },
        });

        console.log({ response });

        return response;
      } catch (error) {
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    queryKey: ['products'],
  });
  console.log({ data });

  const products = data?.pages
    .flatMap((page) => page.data)
    .map((product) => ({
      ...product,
      imageUrl: buildImageUrl(product.photo),
    }));

  return {
    products,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  };
};
