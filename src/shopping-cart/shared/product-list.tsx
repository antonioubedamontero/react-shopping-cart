import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { DataTable, useProductListColumns } from "./product-list-table";

import {
  EditModalContext,
  type EditModalContextData,
} from "../contexts/edit-modal.context";
import { useShoppingCartContext } from "../contexts/shopping-cart.context";

export const ProductList = () => {
  const { shoppingCartState } = useShoppingCartContext();
  const [editModalData, setEditModalData] = useState<EditModalContextData>({
    id: null,
    isEditModalCartItemOpen: false,
  });
  const productListColumns = useProductListColumns();

  const cartItems = shoppingCartState.shoppingCartItems;

  return (
    <section>
      <h2 className="text-2xl">Artículos del carrito</h2>

      <Separator />

      <div className="container mx-auto py-6">
        <EditModalContext.Provider
          value={{
            editModalContextData: editModalData,
            setEditModalContextData: setEditModalData,
          }}
        >
          <DataTable columns={productListColumns} data={cartItems} />
        </EditModalContext.Provider>
      </div>
    </section>
  );
};
