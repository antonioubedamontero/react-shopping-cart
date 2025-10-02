import { useReducer } from "react";

import { CustomHeader, NewCartItem, ProductList, TotalPrice } from "../shared";
import { ShoppingCartContext } from "../contexts/shopping-cart.context";
import {
  shoppingCartInitialState,
  shoppingCartReducer,
} from "../contexts/shopping-cart.reducer";

export const ShoppingCart = () => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    shoppingCartInitialState
  );

  return (
    <div className="h-screen bg-neutral-50">
      <CustomHeader name="Carrito de la compra" />
      <main className="px-4 flex flex-col gap-4">
        <ShoppingCartContext.Provider
          value={{ shoppingCartState, shoppingCartDispatch }}
        >
          <NewCartItem />
          <ProductList />
          <TotalPrice />
        </ShoppingCartContext.Provider>
      </main>
    </div>
  );
};
