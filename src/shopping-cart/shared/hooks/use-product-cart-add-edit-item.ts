import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  PROMOTIONAL_VALUES,
  type ShoppingCartItem,
} from "@/shopping-cart/interfaces";
import { useShoppingCartContext } from "@/shopping-cart/contexts/shopping-cart.context";
import { calSubTotal } from "@/shopping-cart/helpers";

const promotionValuesId = PROMOTIONAL_VALUES.map((promo) => promo.id);

const NAME_MIN_LENGTH = 2;

const FORM_INITIAL_VALUE: ShoppingCartItem = {
  name: "",
  selected: false,
  numOfItems: 0,
  price: 0,
  promo: "none",
  total: 0,
};

// Form schema validation
const cartItemFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, `Longitud mínima ${NAME_MIN_LENGTH} caracteres`),
  numOfItems: z.coerce
    .number("Debe ser un número")
    .min(1, "Debe ser mayor o igual a 1"),
  price: z.coerce.number("Debe ser un número").gt(0, "Debe ser mayor a cero"),
  promo: z.enum(promotionValuesId),
});

export const useProductCartAddEditItem = () => {
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
      selected: true,
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
