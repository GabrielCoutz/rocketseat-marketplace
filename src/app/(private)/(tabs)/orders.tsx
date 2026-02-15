import { useOrdersViewModel } from '../../../viewModels/Orders/useOrders.viewModel';
import { OrdersView } from '../../../viewModels/Orders/Orders.view';

export default function OrdersScreen() {
  const viewModel = useOrdersViewModel();
  return <OrdersView {...viewModel} />;
}
