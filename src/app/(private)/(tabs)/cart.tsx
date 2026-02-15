import { useCartViewModel } from '../../../viewModels/Cart/useCart.viewModel';
import { CartView } from '../../../viewModels/Cart/Cart.view';

export default function CartScreen() {
  const viewModel = useCartViewModel();

  return <CartView {...viewModel} />;
}
