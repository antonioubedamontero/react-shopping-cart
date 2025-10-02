import { Separator } from "@/components/ui/separator";

import { useShoppingCartContext } from "../contexts/shopping-cart.context";
import { DataTable, productListColumns } from "./product-list-table";

export const ProductList = () => {
  const { shoppingCartState } = useShoppingCartContext();
  const cartItems = shoppingCartState.shoppingCartItems;

  return (
    <section>
      <h2 className="text-2xl">Artículos del carrito</h2>

      <Separator />

      <div className="container mx-auto py-10">
        <DataTable columns={productListColumns} data={cartItems} />
      </div>
    </section>
  );
};
