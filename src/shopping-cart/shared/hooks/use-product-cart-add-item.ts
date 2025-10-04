import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { type ShoppingCartItem } from "@/shopping-cart/interfaces";
import { useShoppingCartContext } from "@/shopping-cart/contexts/shopping-cart.context";
import { calSubTotal } from "@/shopping-cart/helpers";
import { cartItemFormSchema } from "./cart-item-zod-schema";

const FORM_INITIAL_VALUE: ShoppingCartItem = {
  name: "",
  isSelected: false,
  numOfItems: 0,
  price: 0,
  promo: "none",
  total: 0,
};

export const useProductCartAddItem = () => {
  const { shoppingCartDispatch } = useShoppingCartContext();

  // Form details
  const cartItemForm = useForm<z.infer<typeof cartItemFormSchema>>({
    resolver: zodResolver(cartItemFormSchema) as any,
    defaultValues: {
      ...FORM_INITIAL_VALUE,
    },
  });

  // Form handlers
  const addCartItemFormHandler = (item: z.infer<typeof cartItemFormSchema>) => {
    const newItem = {
      ...item,
      total: calSubTotal(item.numOfItems, item.price, item.promo),
    };

    shoppingCartDispatch({
      type: "add_item_to_cart",
      payload: {
        shoppingCartItem: newItem,
      },
    });
    cartItemForm.reset({ ...FORM_INITIAL_VALUE });
  };

  const resetCartItemFormHandler = () => {
    cartItemForm.reset({
      ...FORM_INITIAL_VALUE,
    });
  };

  return {
    cartItemForm,
    addCartItemFormHandler,
    resetCartItemFormHandler,
  };
};
