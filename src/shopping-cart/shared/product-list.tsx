import { Separator } from "@/components/ui/separator";
import { DataTable, useProductListColumns } from "./product-list-table";

import { useShoppingCartContext } from "../contexts/shopping-cart.context";

export const ProductList = () => {
  const { shoppingCartState } = useShoppingCartContext();
  const productListColumns = useProductListColumns();

  const cartItems = shoppingCartState.shoppingCartItems.map((item, index) => ({
    order: index + 1,
    ...item,
  }));

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
