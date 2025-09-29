import { CustomHeader, NewCartItem, ProductList, TotalPrice } from "../shared";

export const ShoppingCart = () => {
  return (
    <div>
      <CustomHeader />
      <NewCartItem />
      <ProductList />
      <TotalPrice />
    </div>
  );
};
