import { FC } from 'react';

import { CartProduct } from '../../../../shared/store/cart-store';
import { useProductCartCardViewModel } from './useProductCartCard.viewModel';
import { ProductCartCardView } from './ProductCartCard.view';

interface ProductCartCardProps {
  product: CartProduct;
}

export const ProductCartCard: FC<ProductCartCardProps> = ({ product }) => {
  const viewModel = useProductCartCardViewModel();

  return <ProductCartCardView product={product} {...viewModel} />;
};
