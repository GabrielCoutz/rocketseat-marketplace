import { useLocalSearchParams } from "expo-router";
import { useProductViewModel } from "../../../viewModels/Product/useProduct.viewModel";
import { ProductView } from "../../../viewModels/Product/Product.view";

export default function Product() {
  const { id, openFeedbackBottomsheet } = useLocalSearchParams<{
    id: string;
    openFeedbackBottomsheet?: string;
  }>();
  const viewModel = useProductViewModel(
    Number(id),
    Boolean(openFeedbackBottomsheet),
  );

  return <ProductView {...viewModel} />;
}
