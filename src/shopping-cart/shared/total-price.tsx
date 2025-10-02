import { useShoppingCartContext } from "../contexts/shopping-cart.context";

export const TotalPrice = () => {
  const { shoppingCartState } = useShoppingCartContext();

  return (
    <section className="bg-gray-300 px-4 py-2 rounded text-xl flex gap-2 justify-end">
      <strong className="font-medium">Total price: </strong>
      <span>{shoppingCartState.total}</span>
    </section>
  );
};
