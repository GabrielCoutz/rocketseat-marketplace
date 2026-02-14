import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useProductViewModel } from '../../../viewModels/Product/useProduct.viewModel';
import { ProductView } from '../../../viewModels/Product/Product.view';

export default function Product() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const viewModel = useProductViewModel(Number(id));
  return <ProductView {...viewModel} />;
}
