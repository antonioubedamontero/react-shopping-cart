import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useShoppingCartContext } from "@/shopping-cart/contexts/shopping-cart.context";
import { calSubTotal } from "@/shopping-cart/helpers";
import { cartItemFormSchema } from "./cart-item-zod-schema";

export const useProductCartEditItem = (id: string) => {
  if (!id) throw new Error("Id is needed to edit cart product item");

  const { shoppingCartState, shoppingCartDispatch } = useShoppingCartContext();

  // Initial value retrieved from state by id
  const formInitialValue = shoppingCartState.shoppingCartItems.find(
    (item) => item.id === id
  );

  if (!formInitialValue)
    throw new Error("There is no element in cart with this id");

  // Form details
  const cartItemForm = useForm<z.infer<typeof cartItemFormSchema>>({
    resolver: zodResolver(cartItemFormSchema) as any,
    defaultValues: {
      ...formInitialValue,
    },
  });

  // Form handlers
  const editCartItemFormHandler = (
    item: z.infer<typeof cartItemFormSchema>
  ) => {
    const editedCartItem = {
      ...item,
      selected: item.selected ?? false,
      total: calSubTotal(item.numOfItems, item.price, item.promo),
    };

    shoppingCartDispatch({
      type: "edit_item_in_cart",
      payload: {
        shoppingCartItem: editedCartItem,
      },
    });
  };

  return {
    cartItemForm,
    editCartItemFormHandler,
  };
};
