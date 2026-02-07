import { useInfiniteQuery } from '@tanstack/react-query';
import { getProducts } from '../../services/product.service';
import { buildImageUrl } from '../../helpers/buildImageUrl';
import { FilterState } from '../../store/use-filter-store';

interface ProductsInfinityQueryParams {
  filters?: FilterState;
}

export const useProductInfiniteQuery = ({ filters }: ProductsInfinityQueryParams) => {
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
          filters: {
            categoryIds: filters?.selectedCategories ?? [],
            maxValue: filters?.valueMax ?? undefined,
            minValue: filters?.valueMin ?? undefined,
            searchText: filters?.searchText ?? undefined,
          },
        });

        return response;
      } catch (error) {
        console.log(error);

        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    queryKey: ['products', filters],
  });

  const products = data?.pages
    .flatMap((page) => page.data)
    .map((product) => ({
      ...product,
      photo: buildImageUrl(product.photo),
    }));

  return {
    products,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  };
};
