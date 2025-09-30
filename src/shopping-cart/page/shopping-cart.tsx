import { CustomHeader, NewCartItem, ProductList, TotalPrice } from "../shared";

export const ShoppingCart = () => {
  return (
    <div>
      <CustomHeader name="Carrito de la compra" />
      <NewCartItem />
      <ProductList />
      <TotalPrice />
    </div>
  );
};
