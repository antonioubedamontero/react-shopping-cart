import { createContext, useContext, type Dispatch } from "react";

import type { ShoppingCartAction, ShoppingCartState } from "../interfaces";

export const ShoppingCartContext =
  createContext<ShoppingCartContextType | null>(null);

interface ShoppingCartContextType {
  shoppingCartState: ShoppingCartState;
  shoppingCartDispatch: Dispatch<ShoppingCartAction>;
}

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error("useShoppingCart should use inside shoppingCart provider");
  }

  return context;
};
