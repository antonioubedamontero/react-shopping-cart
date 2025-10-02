import { Separator } from "@/components/ui/separator";

import { useShoppingCartContext } from "../contexts/shopping-cart.context";
import { DataTable, useProductListColumns } from "./product-list-table";

export const ProductList = () => {
  const { shoppingCartState } = useShoppingCartContext();
  const cartItems = shoppingCartState.shoppingCartItems;
  const productListColumns = useProductListColumns();

  return (
    <section>
      <h2 className="text-2xl">Artículos del carrito</h2>

      <Separator />

      <div className="container mx-auto py-6">
        <DataTable columns={productListColumns} data={cartItems} />
      </div>
    </section>
  );
};
