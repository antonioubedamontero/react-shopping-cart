import { CustomHeader, NewCartItem, ProductList, TotalPrice } from "../shared";

export const ShoppingCart = () => {
  return (
    <div className="h-screen bg-neutral-50">
      <CustomHeader name="Carrito de la compra" />
      <div className="px-4 flex flex-col gap-4">
        <NewCartItem />
        <ProductList />
        <TotalPrice />
      </div>
    </div>
  );
};
