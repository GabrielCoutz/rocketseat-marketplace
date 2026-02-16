import { useState } from "react";
import { useCartStore } from "../../../../shared/store/cart-store";
import { CreditCard } from "../../../../shared/interfaces/credit-card";
import { useSubmitOrderMutation } from "../../../../shared/queries/orders/use-submit-order.mutation";
import { router } from "expo-router";
import { useAppModal } from "../../../../shared/hooks/useAppModal";
import { localNotificationsService } from "../../../../shared/services/local-notifications.service";

export const useCartFooterViewModel = () => {
  const [selectedCreditCard, setSelectedCreditCard] =
    useState<null | CreditCard>(null);
  const { total, products, clearCart } = useCartStore();
  const { showSuccess } = useAppModal();

  const createOrderMutation = useSubmitOrderMutation();

  const submitOrderMutation = async () => {
    if (!selectedCreditCard) return;

    await createOrderMutation.mutateAsync({
      creditCardId: selectedCreditCard.id,
      items: products.map(({ id, quantity }) => ({ productId: id, quantity })),
    });
    clearCart();

    const firstProduct = products?.[0];

    if (firstProduct)
      localNotificationsService.scheduleFeedbackNotification({
        delayInMinutes: 60 * 24,
        productId: String(firstProduct.id),
        productName: firstProduct.name,
      });

    showSuccess({
      title: "Sucesso!",
      message: "Pedido feito com sucesso!",
      buttonText: "Ver pedidos",
      onButtonPress: () => {
        router.push("/orders");
      },
    });
  };

  return {
    total,
    selectedCreditCard,
    setSelectedCreditCard,
    submitOrderMutation,
    isOrderLoading: createOrderMutation.isPending,
  };
};
